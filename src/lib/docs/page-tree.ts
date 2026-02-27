/**
 * Docs sidebar backend builder (fumadocs-like).
 *
 * Builds a typed tree from Markdown files and optional `meta.json` descriptors,
 * supports special directives (`...`, `z...a`, `!...`, and separators/links),
 * flattens the tree, produces breadcrumbs and previous/next links.
 *
 * All paths are normalized to POSIX style.
 */
import fs from 'fs';
import path from 'path';

import config from '@/configs/website-config';

import { IBreadcrumbItem } from '@/types/common';
import { IDocMetadata, IDocsTreeNode, IFlatSidebarItem, IPreviousAndNextLinks } from '@/types/docs';
import { readAndParseMarkdown } from '@/lib/markdown';

import { DOCS_DIR_PATH } from './posts';

/**
 * Normalize a filesystem path to POSIX style without a leading slash.
 *
 * @param p Raw path (can contain backslashes).
 * @returns Normalized POSIX path like `a/b/c`.
 */
function normalizePath(p: string): string {
  if (!p) return '';
  return path.posix.normalize(p.replace(/\\/g, '/')).replace(/^\/+/g, '');
}

type FileEntry =
  | { path: string; data: IDocMetadata; format: 'page' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { path: string; data: any; format: 'meta' };

interface ContentStorage {
  readDir: (dir: string) => string[] | undefined;
  read: (file: string) => FileEntry | undefined;
}

/**
 * Read all markdown pages and `meta.json` files into an in-memory storage.
 *
 * Keys in the storage map are POSIX paths relative to the `rootDir`.
 * Directories are not stored — `readDir` infers them from file keys.
 *
 * @param rootDir Absolute path to docs root directory.
 * @returns `ContentStorage` facade used by the builder.
 */
function loadFiles(rootDir: string): ContentStorage {
  const files = new Map<string, FileEntry>();

  function loadRecursive(dir: string) {
    const abs = path.join(rootDir, dir);
    const entries = fs.readdirSync(abs, { withFileTypes: true });
    for (const entry of entries) {
      const rel = path.posix.join(dir, entry.name);
      const full = path.join(rootDir, rel);
      if (entry.isDirectory()) {
        loadRecursive(rel);
      } else if (entry.name.endsWith('.md')) {
        const { data } = readAndParseMarkdown<IDocMetadata>(full);
        files.set(normalizePath(rel), {
          path: normalizePath(rel),
          data,
          format: 'page',
        });
      } else if (entry.name === 'meta.json') {
        const content = fs.readFileSync(full, 'utf-8');
        files.set(normalizePath(rel), {
          path: normalizePath(rel),
          data: JSON.parse(content),
          format: 'meta',
        });
      }
    }
  }

  loadRecursive('');

  return {
    readDir: (dir: string) => {
      const dirFiles: string[] = [];
      const subDirs = new Set<string>();

      const normalizedDir = normalizePath(dir);
      const prefix = normalizedDir ? `${normalizedDir}/` : '';

      let foundAny = false;

      for (const key of files.keys()) {
        if (!key.startsWith(prefix)) continue;
        const relative = key.slice(prefix.length);
        if (!relative) continue;

        foundAny = true;

        if (relative.includes('/')) {
          const subDir = relative.split('/')[0];
          subDirs.add(subDir);
        } else {
          dirFiles.push(relative);
        }
      }

      if (!foundAny) return undefined;

      return [...dirFiles, ...Array.from(subDirs).map((d) => `${d}/`)];
    },
    read: (file: string) => files.get(normalizePath(file)),
  };
}

const linkRegex = /^(?:\[([^\]]+)])?\[([^\]]+)]\(([^)]+)\)$/;
const separatorFullRegex = /^---(?:\[([^\]]+)])?(.+?)---$/;
const separatorSimpleRegex = /^---$/;

const rest = '...';
const restReversed = 'z...a';
const extractPrefix = '...';
const excludePrefix = '!';

/**
 * Build the whole docs tree starting from `rootDir`.
 *
 * @param rootDir Absolute path to docs directory.
 * @returns Root folder node.
 */
function buildDocsTree(rootDir: string): IDocsTreeNode {
  const storage = loadFiles(rootDir);
  return (
    buildFolderNode('', true, { storage }) ?? {
      type: 'folder',
      label: '',
      children: [],
    }
  );
}

/**
 * Build a folder node (recursively).
 *
 * Resolves optional `meta.json` with properties:
 * - `title`, `icon`, `description`
 * - `root` (affects visibility of `index.md` in children)
 * - `defaultOpen`
 * - `pages`: array of strings supporting directives:
 *    - `"..."` — insert remaining items in ascending order
 *    - `"z...a"` — insert remaining items in descending order
 *    - `"!..."` — exclude item from automatic inclusion
 *    - `"...foo"` — extract child folder items into current level
 *    - `"---[icon]Title---"` — separator node
 *    - `"[icon][Label](href)"` — external/custom link page
 *
 * @param folderPath Path relative to root (POSIX).
 * @param isGlobalRoot Whether this call is the global root.
 * @param ctx Storage context.
 */
function buildFolderNode(
  folderPath: string,
  isGlobalRoot: boolean,
  ctx: { storage: ContentStorage },
): IDocsTreeNode | undefined {
  const { storage } = ctx;
  const items = storage.readDir(folderPath);
  if (!items) return;

  const metaPath = path.posix.join(folderPath, 'meta.json');
  const metaRaw = storage.read(metaPath);
  const meta = metaRaw && metaRaw.format === 'meta' ? metaRaw : undefined;

  const isRoot = (meta?.data?.root as boolean | undefined) ?? isGlobalRoot;
  let children: IDocsTreeNode[];

  if (!meta?.data?.pages) {
    children = buildAll(items, folderPath, ctx, (name) => isRoot || !name.endsWith('index.md'));
  } else {
    const restItems = new Set<string>(items);

    const resolved = (meta.data.pages as string[]).flatMap((item, i) => {
      const result = resolveFolderItem(folderPath, item, ctx, i, restItems);
      return typeof result === 'string' ? [] : result;
    });

    const processed: (IDocsTreeNode | string)[] = resolved;
    for (let i = 0; i < processed.length; i++) {
      const item = processed[i];
      if (item === rest || item === restReversed) {
        const itemsLeft = buildAll(
          Array.from(restItems),
          folderPath,
          ctx,
          (name) => !name.endsWith('index.md') || isRoot,
          item === restReversed,
        );
        processed.splice(i, 1, ...itemsLeft);
        break;
      }
    }
    children = processed.filter((it): it is IDocsTreeNode => typeof it !== 'string');
  }

  const indexPath = path.posix.join(folderPath, 'index.md');
  const index = buildFileNode(indexPath, ctx);

  const label = meta?.data?.title ?? index?.label ?? pathToLabel(path.posix.basename(folderPath));

  const node: IDocsTreeNode = {
    type: 'folder',
    label,
    children,
    index,
    root: meta?.data?.root,
    defaultOpen: meta?.data?.defaultOpen,
    description: meta?.data?.description,
    icon: meta?.data?.icon,
  };

  return node;
}

/**
 * Build nodes for a list of local names inside a folder.
 *
 * @param names Local entries returned by `readDir`: `a.md`, `b/`, `meta.json`.
 * @param baseDir POSIX path of the parent folder.
 * @param ctx Storage context.
 * @param filter Optional filter by local name.
 * @param reversed Whether to reverse lexicographical order.
 */
function buildAll(
  names: string[], // локальные имена в папке: "a.md", "b/"
  baseDir: string,
  ctx: { storage: ContentStorage },
  filter?: (name: string) => boolean,
  reversed = false,
): IDocsTreeNode[] {
  const output: IDocsTreeNode[] = [];
  const list = filter ? names.filter(filter) : [...names];
  const sorted = list.sort((a, b) => a.localeCompare(b) * (reversed ? -1 : 1));

  for (const name of sorted) {
    if (name.endsWith('.md')) {
      const full = path.posix.join(baseDir, name);
      const node = buildFileNode(full, ctx);
      if (node) output.push(node);
    } else if (name.endsWith('/')) {
      const dirPath = path.posix.join(baseDir, name.slice(0, -1));
      const dirNode = buildFolderNode(dirPath, false, ctx);
      if (dirNode) output.push(dirNode);
    } else if (!name.endsWith('meta.json')) {
      const dirNode = buildFolderNode(path.posix.join(baseDir, name), false, ctx);
      if (dirNode) output.push(dirNode);
    }
  }

  return output;
}

/**
 * Resolve a single `meta.pages` entry. Supports separators, links,
 * extraction/exclusion and rest markers.
 *
 * @param folderPath Parent folder POSIX path.
 * @param item Raw entry string from `meta.pages`.
 * @param ctx Storage context.
 * @param _idx Index of the item (unused, reserved for diagnostics).
 * @param restNodeNames Mutable set of remaining local names; items are removed here.
 * @returns Array of nodes or a special marker (`"..."` or `"z...a"`).
 */
function resolveFolderItem(
  folderPath: string,
  item: string,
  ctx: { storage: ContentStorage },
  _idx: number,
  restNodeNames: Set<string>,
): IDocsTreeNode[] | typeof rest | typeof restReversed {
  if (item === rest || item === restReversed) return item;

  if (separatorSimpleRegex.test(item)) {
    return [
      {
        type: 'separator',
        label: '',
      },
    ];
  }

  const mSep = separatorFullRegex.exec(item);
  if (mSep) {
    const icon = mSep[1];
    const label = (mSep[2] || '').trim();
    return [
      {
        type: 'separator',
        label,
        icon,
      },
    ];
  }

  const mLink = linkRegex.exec(item);
  if (mLink) {
    const icon = mLink[1];
    const label = mLink[2];
    const href = mLink[3];
    return [
      {
        type: 'page',
        label,
        href,
        icon,
      },
    ];
  }

  const isExcept = item.startsWith(excludePrefix);
  const isExtract = !isExcept && item.startsWith(extractPrefix);
  const rawName = isExcept
    ? item.slice(excludePrefix.length)
    : isExtract
      ? item.slice(extractPrefix.length)
      : item;

  const localCandidates = new Set<string>([
    rawName,
    `${rawName}.md`,
    `${rawName}/`,
    rawName.replace(/\/$/, ''),
  ]);
  for (const cand of localCandidates) restNodeNames.delete(cand);

  if (isExcept) return [];

  const fullBase = path.posix.join(folderPath, rawName);

  const dirNode = buildFolderNode(fullBase, false, ctx);
  if (dirNode) {
    return isExtract ? dirNode.children || [] : [dirNode];
  }

  const filePath = rawName.endsWith('.md') ? fullBase : `${fullBase}.md`;
  const fileNode = buildFileNode(filePath, ctx);
  return fileNode ? [fileNode] : [];
}

/**
 * Build a `page` node from a markdown file path.
 *
 * Recognizes `index.md` and maps its URL to the folder path.
 *
 * @param p POSIX path to the markdown file relative to root.
 * @param ctx Storage context.
 */
function buildFileNode(p: string, ctx: { storage: ContentStorage }): IDocsTreeNode | undefined {
  const pageRaw = ctx.storage.read(p);
  if (!pageRaw || pageRaw.format !== 'page') return;

  const page = pageRaw as Extract<FileEntry, { format: 'page' }>;

  let urlPath = p.replace(/\.md$/i, '').replace(/^\/+/g, '');
  if (path.posix.basename(p) === 'index.md') {
    urlPath = path.posix.dirname(p).replace(/^\/+/g, '');
  }
  const href = urlPath ? `${config.docs.basePath}/${urlPath}` : config.docs.basePath;

  return {
    type: 'page',
    label: page.data.title || pathToLabel(path.posix.basename(p, '.md')),
    href,
    icon: page.data.icon,
  };
}

/**
 * Convert a file/folder name into a human-readable label.
 *
 * Replaces dashes/underscores with spaces, strips extensions, capitalizes first letter.
 */
function pathToLabel(name: string): string {
  return name
    .replace(/\.(md|mdx)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/^\s*([a-z])/i, (m) => m.toUpperCase());
}

/** In-memory cache of the computed sidebar (disabled in development). */
let _cachedSidebar: IDocsTreeNode[] | null = null;
/** In-memory cache of the raw tree (disabled in development). */
let _cachedTree: IDocsTreeNode | null = null;

/**
 * Get the root tree, using an in-memory cache in production.
 * Rebuilds on every call when `NODE_ENV=development`.
 */
function getTree(): IDocsTreeNode {
  if (process.env.NODE_ENV === 'development') {
    return buildDocsTree(DOCS_DIR_PATH);
  }
  if (_cachedTree) return _cachedTree;
  _cachedTree = buildDocsTree(DOCS_DIR_PATH);
  return _cachedTree;
}

function getSidebar(): IDocsTreeNode[] {
  if (process.env.NODE_ENV !== 'development' && _cachedSidebar) return _cachedSidebar;

  const tree = getTree();
  function mapNodeToSidebar(node: IDocsTreeNode): IDocsTreeNode {
    return {
      ...node,
      href: node.type === 'folder' ? node.index?.href : node.href,
      children: node.type === 'folder' ? node.children?.map(mapNodeToSidebar) || [] : undefined,
    };
  }
  const res = tree.children?.map(mapNodeToSidebar) || [];
  if (process.env.NODE_ENV !== 'development') _cachedSidebar = res;
  return res;
}

/**
 * Flatten a hierarchical tree into a linear array with positional `path`.
 *
 * @param nodes Source nodes.
 * @param currentPath Path prefix used during recursion.
 * @returns Flat list preserving traversal order.
 */
function flattenTree(nodes: IDocsTreeNode[], currentPath: number[] = []): IFlatSidebarItem[] {
  let result: IFlatSidebarItem[] = [];

  nodes.forEach((node, index) => {
    const nodePath = [...currentPath, index];
    const flatNode: IFlatSidebarItem = {
      ...node,
      path: nodePath,
    };
    result.push(flatNode);

    if (node.children) {
      result = result.concat(flattenTree(node.children, nodePath));
    }
  });

  return result;
}

/**
 * Convenience wrapper to flatten a sidebar tree.
 */
function getFlatSidebar(sidebar: IDocsTreeNode[]): IFlatSidebarItem[] {
  return flattenTree(sidebar);
}

/**
 * Normalize a slug by removing a trailing slash.
 */
function normalizeSlug(s: string): string {
  return s.replace(/\/$/, '');
}

/**
 * Gets the previous and next links for a document based on the current slug
 */
/**
 * Find previous/next navigational items around the current page.
 *
 * @param slug Current page slug (e.g. `/docs/guide/intro`).
 * @param flatSidebar Flat list produced by `getFlatSidebar`.
 * @returns Neighbor links or `undefined` at edges.
 */
function getDocPreviousAndNextLinks(
  slug: string,
  flatSidebar: IFlatSidebarItem[],
): IPreviousAndNextLinks {
  const norm = (s?: string) => (s ? normalizeSlug(String(s)) : undefined);
  const items = flatSidebar.filter((item) => !!item.href);
  const currentItemIndex = items.findIndex((item) => norm(item.href?.toString()) === norm(slug));

  if (currentItemIndex === -1) {
    return { previousLink: undefined, nextLink: undefined };
  }

  const previousLink = items[currentItemIndex - 1];
  const nextLink = items[currentItemIndex + 1];

  return { previousLink, nextLink };
}

/**
 * Generates breadcrumbs based on the current slug
 */
/**
 * Generate breadcrumbs by following the positional `path` in the tree.
 *
 * @param currentSlug Current page slug.
 * @param flatSidebar Flat sidebar list.
 * @returns Breadcrumb items with `href` omitted for the last crumb.
 */
function getBreadcrumbs(currentSlug: string, flatSidebar: IFlatSidebarItem[]): IBreadcrumbItem[] {
  const slug = normalizeSlug(currentSlug);
  const pathMatch = flatSidebar.find((item) => normalizeSlug(String(item.href)) === slug)?.path;

  const sidebar = getSidebar();
  if (!pathMatch) return [];

  const breadcrumbs: IBreadcrumbItem[] = [];

  pathMatch.reduce((prev: IDocsTreeNode[] | IDocsTreeNode, cur: number) => {
    const current = Array.isArray(prev) ? prev[cur] : prev?.children?.[cur];
    if (!current) return prev;

    const currentUrl = current.href ? normalizeSlug(current.href) : undefined;
    breadcrumbs.push({
      label: current.label,
      href: currentUrl === slug ? undefined : currentUrl,
    });
    return current;
  }, sidebar as IDocsTreeNode[]);

  return breadcrumbs;
}

/**
 * Get the root of the docs tree
 */
export function getDocsRoot(nodes: IDocsTreeNode[]): string | undefined {
  for (const n of nodes) {
    if (n.type !== 'separator' && n.href) return String(n.href);
    if (n.children?.length) {
      const h = getDocsRoot(n.children);
      if (h) return h;
    }
  }
}

export { getSidebar, getFlatSidebar, getDocPreviousAndNextLinks, getBreadcrumbs };
