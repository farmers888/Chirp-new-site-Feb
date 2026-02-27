import fs from 'fs';
import path from 'path';

import config from '@/configs/website-config';
import { globSync } from 'glob';

import { IDocMetadata, IDocPost } from '@/types/docs';
import { compileMdx, readAndParseMarkdown, removeMarkdownSymbols } from '@/lib/markdown';
import { getExcerpt } from '@/lib/utils';

export const DOCS_DIR_PATH = path.join(process.cwd(), config.docs.contentDir);

/** Convert to POSIX-like path (forward slashes) for URLs and GitHub links. */
function toPosix(p: string) {
  return p.replace(/\\/g, '/');
}

/** Remove leading `/docs` and leading/trailing slashes. */
function normalizeSlug(raw: string): string {
  return raw.replace(/^\/?docs\/?/, '').replace(/^\/+|\/+$/g, '');
}

/** If slug ends with `/index`, drop it. */
function canonicalizeSlug(slugNoExt: string): string {
  return slugNoExt.endsWith('/index') ? slugNoExt.slice(0, -'/index'.length) : slugNoExt;
}

/**
 * Resolve the physical markdown file for a logical slug.
 * Tries both `<slug>.md` and `<slug>/index.md`.
 */
function resolveDocFile(
  slugInput: string,
): { abs: string; rel: string; canonicalSlug: string } | null {
  const clean = normalizeSlug(slugInput);

  // Candidate A: <slug>.md
  const relA = `${clean}.md`;
  const absA = path.join(DOCS_DIR_PATH, relA);
  if (fs.existsSync(absA)) {
    const noExt = toPosix(relA.replace(/\.md$/i, ''));
    return {
      abs: absA,
      rel: toPosix(relA),
      canonicalSlug: canonicalizeSlug(noExt),
    };
  }

  // Candidate B: <slug>/index.md
  const relB = path.join(clean, 'index.md');
  const absB = path.join(DOCS_DIR_PATH, relB);
  if (fs.existsSync(absB)) {
    const noExt = toPosix(relB.replace(/\.md$/i, '')); // e.g. a/b/index
    return {
      abs: absB,
      rel: toPosix(relB),
      canonicalSlug: canonicalizeSlug(noExt),
    }; // -> a/b
  }

  return null;
}

/**
 * Gets post slugs based on the provided glob pattern
 * @param globPattern - The glob pattern to match files
 * @param ignore - Array of patterns to ignore
 *
 * @returns Array of post slugs relative to docs directory (without extension)
 */
function getDocPostSlugsByPath(globPattern: string, ignore: string[] = []): string[] {
  const files = globSync(globPattern, {
    ignore: ['**/CONTRIBUTING.md', ...ignore],
  });

  return files.map((filePath: string) => {
    const relativePath = path.relative(DOCS_DIR_PATH, filePath);
    const withoutExt = toPosix(relativePath.replace(/\.md$/i, ''));
    return canonicalizeSlug(withoutExt);
  });
}

/**
 * Retrieves post data by its slug
 * @param slug - The post slug (can be `a/b`, `a/b/`, `docs/a/b`, or `a/b/index`)
 *
 * @returns Object containing post data and content, or null if not found
 */
async function getDocPostBySlug(slug: string): Promise<IDocPost | null> {
  try {
    const resolved = resolveDocFile(slug);
    if (!resolved) {
      console.error(`Post not found: ${slug}`);
      return null;
    }

    const { abs: filePath, rel: relPath, canonicalSlug } = resolved;
    const { data, content } = readAndParseMarkdown<IDocMetadata>(filePath);

    if (!data) {
      console.error(`Post not found (no frontmatter): ${slug}`);
      return null;
    }

    const plainContent = removeMarkdownSymbols(content);
    const { title, excerpt, isDraft = false, updatedAt, seo } = data;
    const { content: compiledMdx, toc: tableOfContents } = await compileMdx(content);

    return {
      slug: canonicalSlug,
      title,
      excerpt,
      isDraft,
      updatedAt,
      content: compiledMdx,
      tableOfContents,
      sourceUrl: new URL(
        `https://github.com/${config.githubOrg}/${config.githubRepo}/edit/main/${toPosix(
          config.docs.contentDir,
        )}/${relPath}`,
      ),
      seo: {
        title: seo?.title ?? title,
        description:
          seo?.description ?? excerpt ?? getExcerpt({ content: plainContent, length: 160 }),
        socialImage:
          seo?.socialImage ??
          `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}/api/og?template=docs&title=${encodeURIComponent(
            title ?? canonicalSlug,
          )}`,
        noIndex: seo?.noIndex ?? isDraft,
      },
    };
  } catch (error) {
    console.error(`Error fetching the post by slug: ${slug}`, error);
    return null;
  }
}

/**
 * Retrieves all posts excluding release notes and drafts in production
 *
 * @returns Array of PostData objects
 */
async function getAllDocPosts(): Promise<IDocPost[]> {
  const slugs = getDocPostSlugsByPath(path.join(DOCS_DIR_PATH, '**/*.md'));

  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  const posts = await Promise.all(slugs.map((slug) => getDocPostBySlug(slug)));

  return posts
    .filter((postData): postData is IDocPost => !!postData && (!isProduction || !postData.isDraft))
    .map((postData) => {
      const normalizedSlug = postData.slug.startsWith('/') ? postData.slug.slice(1) : postData.slug;
      return { ...postData, slug: normalizedSlug };
    });
}

export { getAllDocPosts, getDocPostBySlug, getDocPostSlugsByPath };
