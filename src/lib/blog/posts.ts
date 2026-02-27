import path from 'path';

import { Route } from 'next';
import config from '@/configs/website-config';
import { authors as authorsList } from '@/content/blog/taxonomy/authors';
import { categories } from '@/content/blog/taxonomy/categories';
import { globSync } from 'glob';

import { ICategory, IPost, IPostData, IPostMeta } from '@/types/blog';
import { compileMdx, readAndParseMarkdown, removeMarkdownSymbols } from '@/lib/markdown';
import { getExcerpt, getTimeToRead } from '@/lib/utils';

const POSTS_PER_PAGE = config.blog.postsPerPage;
const BLOG_DIR_PATH = path.join(process.cwd(), config.blog.contentDir);

/**
 * Retrieves post slugs from markdown files using a glob pattern.
 *
 * @param {string} globPattern - Glob pattern to match markdown files.
 * @param {string[]} [ignore=[]] - Array of patterns to ignore during file search.
 *
 * @returns {string[]} Array of post slugs (filenames without .md extension).
 */

function getPostSlugsByPath(globPattern: string, ignore: string[] = []): string[] {
  const files = globSync(globPattern, {
    cwd: BLOG_DIR_PATH,
    ignore: ['**/CONTRIBUTING.md', ...ignore],
    absolute: true,
  });

  return files.map((filePath: string) => {
    const relativePath = path.relative(BLOG_DIR_PATH, filePath);
    return relativePath.replace(/\.md$/, '');
  });
}

/**
 * Transforms a frontmatter category reference into a full category object with URL.
 *
 * @param {IPostMeta["category"]} frontmatterCategory - Category slug from post frontmatter.
 *
 * @returns {ICategory} Complete category object with URL.
 * @throws {Error} When the category is not found in the categories list.
 */
function transformCategory(frontmatterCategory: IPostMeta['category']): ICategory {
  const matchedCategory = categories.find((c) => c.slug.current === frontmatterCategory);

  if (!matchedCategory) {
    throw new Error(`Unknown category "${frontmatterCategory}".`);
  }

  return {
    ...matchedCategory,
    url: `/blog/category/${matchedCategory.slug.current}` as Route<string>,
  };
}

/**
 * Retrieves a single blog post meta from the local markdown directory by its slug.
 *
 * @param {string} slug               The post slug (markdown filename without the `.md` extension).
 * @returns {IPostData | null} Meta data of the post or `null` if the file does not exist.
 */
function getPostDataBySlug(slug: string): IPostData | null {
  try {
    const filePath = path.join(BLOG_DIR_PATH, `${slug}.md`);
    const { data, content } = readAndParseMarkdown<IPostMeta>(filePath);
    const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

    if (!data) {
      console.error(`Post not found: ${slug}`);
      return null;
    }

    if (isProduction && data.isDraft) {
      return null;
    }

    const {
      title,
      seo,
      isDraft,
      publishedAt,
      caption,
      cover,
      authors: authorRefs,
      isFeatured,
    } = data;

    const category = transformCategory(data.category);
    const plainContent = removeMarkdownSymbols(content);

    const resolvedAuthors = (authorRefs ?? []).map((author) => {
      const id = typeof author === 'string' ? author : author.id;
      const matchedAuthor = authorsList.find((a) => a.id === id);

      if (!matchedAuthor) {
        throw new Error(`Unknown author "${id}".`);
      }

      return matchedAuthor;
    });

    const readingTime = getTimeToRead(plainContent);

    const post = {
      slug: { current: slug },
      pathname: `/blog/${slug}`,
      title,
      authors: resolvedAuthors,
      cover: cover || '',
      isFeatured: Boolean(isFeatured),
      isDraft: Boolean(isDraft),
      publishedAt,
      caption: caption ?? '',
      content,
      category,
      readingTime,
      seo: {
        title: seo?.title ?? title,
        description:
          seo?.description ?? caption ?? getExcerpt({ content: plainContent, length: 160 }),
        socialImage:
          seo?.socialImage ??
          `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}/api/og?template=blog&title=${title}`,
        noIndex: seo?.noIndex ?? Boolean(isDraft),
      },
    };

    return post;
  } catch (error) {
    console.error(`Error fetching the post by slug: ${slug}`, error);
    return null;
  }
}

/**
 * Retrieves a single blog post from the local markdown directory by its slug.
 * The markdown file is parsed together with its front-matter and converted
 * to the internal `IPost` representation that the rest of
 * the application expects.
 *
 * @param {string} slug               The post slug (markdown filename without the `.md` extension).
 * @returns {Promise<IPost | null>} The parsed post or `null` if the file does not exist.
 */
async function getPostBySlug(slug: string): Promise<IPost | null> {
  try {
    const postData = getPostDataBySlug(slug);

    if (!postData) {
      return null;
    }

    const relatedPosts = getAllPosts();

    const { content: compiledMdx, toc: tableOfContents } = await compileMdx(postData.content, {
      relatedPosts,
    });

    const post = {
      ...postData,
      content: compiledMdx,
      tableOfContents,
    };

    return post;
  } catch (error) {
    console.error(`Error fetching the post by slug: ${slug}`, error);
    return null;
  }
}

/**
 * Returns **all** blog posts that are present in the markdown directory.
 * Draft posts (`isDraft: true`) are excluded when the build runs in production.
 * The result is ordered from newest to oldest by the `publishedAt` date.
 *
 * @returns {IPostData[]} Sorted array of all posts.
 */
function getAllPosts(): IPostData[] {
  const slugs = getPostSlugsByPath('**/*.md');
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  const posts = slugs.map((s) => getPostDataBySlug(s));

  const filtered = posts
    .filter((p): p is IPostData => Boolean(p))
    .filter((p) => !(isProduction && p.isDraft));

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return filtered;
}

/**
 * Collects a unique list of categories that are referenced by the available posts.
 *
 * @returns {ICategory[]} Array of category objects with url.
 */
function getCategories(): ICategory[] {
  const posts = getAllPosts();

  const usedCategorySlugs = new Set(posts.map((post) => post.category.slug.current));

  return categories
    .filter((cat) => usedCategorySlugs.has(cat.slug.current))
    .map((cat) => ({
      ...cat,
      url: `/blog/category/${cat.slug.current}` as Route<string>,
    }));
}

/**
 * Returns a single category by slug.
 * If no such category is found, the function returns `null`.
 *
 * @param {string} slug               The category slug to search for.
 * @returns {ICategory | null} Category object or `null` if not found.
 */
function getCategoryBySlug(slug: string): ICategory | null {
  const cats = getCategories();
  return cats.find((cat) => cat.slug.current === slug) || null;
}

/**
 * Returns all posts that belong to the specified category.
 *
 * @param {string} slug               The category slug.
 * @returns {IPostData[]} Array of posts that belong to the specified category.
 */
function getPostsByCategory(slug: string): IPostData[] {
  return getAllPosts().filter((post) => post.category.slug.current === slug);
}

/**
 * Retrieves all featured blog posts.
 *
 * @returns {IPostData[] | null} Array of featured posts or `null` if no featured posts exist.
 */
function getFeaturedPost(): IPostData[] | null {
  const posts = getAllPosts().filter((post) => post.isFeatured);
  return posts.length > 0 ? posts : null;
}

/**
 * Returns counts of total and non-featured posts.
 *
 * @returns {{total: number, nonFeatured: number}} Object containing total and non-featured post counts.
 */
function getPostCounts(): {
  total: number;
  nonFeatured: number;
} {
  const allPosts = getAllPosts();
  return {
    total: allPosts.length,
    nonFeatured: allPosts.filter((post) => !post.isFeatured).length,
  };
}

/**
 * Returns counts of total and non-featured posts for a specific category.
 *
 * @param {string} slug              The category slug.
 * @returns {{total: number, nonFeatured: number}} Object containing total and non-featured post counts for the category.
 */
function getPostCountsByCategory(slug: string): {
  total: number;
  nonFeatured: number;
} {
  const posts = getPostsByCategory(slug);
  return {
    total: posts.length,
    nonFeatured: posts.filter((post) => !post.isFeatured).length,
  };
}

/**
 * Calculates the total number of pages needed for blog pagination.
 *
 * @returns {number} Total number of pages required for pagination.
 */
function getTotalPages(): number {
  const { nonFeatured } = getPostCounts();
  if (nonFeatured <= 1) return nonFeatured;
  return Math.ceil(nonFeatured / POSTS_PER_PAGE);
}

/**
 * Calculates the total number of pages needed for category pagination.
 *
 * @param {string} slug              The category slug.
 * @returns {number} Total number of pages required for category pagination.
 */
function getTotalPagesByCategory(slug: string): number {
  const { nonFeatured } = getPostCountsByCategory(slug);
  if (nonFeatured <= 1) return nonFeatured;
  return Math.ceil(nonFeatured / POSTS_PER_PAGE);
}

/**
 * Retrieves a paginated slice of blog posts.
 *
 * @param {number} [page=1]                        The page number (1-indexed).
 * @param {object} [options]                       Additional options for filtering.
 * @param {boolean} [options.nonFeaturedOnly]      If true, excludes featured posts from results.
 * @returns {IPostData[]} Array of posts for the specified page.
 */
function getPaginatedPosts(page = 1, options?: { nonFeaturedOnly?: boolean }): IPostData[] {
  const posts = options?.nonFeaturedOnly
    ? getAllPosts().filter((p) => !p.isFeatured)
    : getAllPosts();

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return posts.slice(start, end);
}

/**
 * Retrieves a paginated slice of blog posts from a specific category.
 *
 * @param {string} slug                            The category slug.
 * @param {number} [page=1]                        The page number (1-indexed).
 * @param {object} [options]                       Additional options for filtering.
 * @param {boolean} [options.nonFeaturedOnly]      If true, excludes featured posts from results.
 * @returns {IPostData[]} Array of posts from the category for the specified page.
 */
function getPaginatedPostsByCategory(
  slug: string,
  page = 1,
  options?: { nonFeaturedOnly?: boolean },
): IPostData[] {
  const postsInCategory = getPostsByCategory(slug);
  const filtered = options?.nonFeaturedOnly
    ? postsInCategory.filter((p) => !p.isFeatured)
    : postsInCategory;

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return filtered.slice(start, end);
}

export {
  getPostDataBySlug,
  getPostBySlug,
  getAllPosts,
  getCategories,
  getCategoryBySlug,
  getFeaturedPost,
  getPostsByCategory,
  getPostCounts,
  getPostCountsByCategory,
  getTotalPages,
  getTotalPagesByCategory,
  getPaginatedPosts,
  getPaginatedPostsByCategory,
};
