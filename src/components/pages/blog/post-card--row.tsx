import { IPostData } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import Authors from '@/components/pages/authors';
import Category from '@/components/pages/blog/category';
import Date from '@/components/pages/date';

interface IPostCardProps {
  className?: string;
  post: IPostData;
  authorsPosition?: 'left' | 'bottom';
}

// TODO: add hover effect
function PostCard({ className, post, authorsPosition = 'bottom' }: IPostCardProps) {
  const { authors, isFeatured, publishedAt, title, pathname, caption, category } = post;

  return (
    <article
      className={cn(
        'post-card--row flex flex-col justify-between gap-x-8 gap-y-3 md:flex-row',
        className,
      )}
    >
      <div className="flex w-full flex-row-reverse items-center justify-end gap-x-2 gap-y-4 md:w-40 md:shrink-0 md:flex-col md:items-start md:justify-start md:pt-2 lg:w-56">
        <Date publishedAt={publishedAt} />
        <div className="size-1 shrink-0 rounded-full bg-muted-foreground md:hidden" aria-hidden />
        <Category
          className={cn(authorsPosition !== 'bottom' && !isFeatured && 'flex md:hidden')}
          isFeatured={isFeatured}
          category={category}
        />
        {authorsPosition === 'left' && (
          <Authors
            className="hidden shrink-0 md:flex"
            authors={authors}
            size="xs"
            hideNamesOn={['md']}
          />
        )}
      </div>
      <div className="flex grow flex-col">
        <h1>
          <Link
            className="line-clamp-2 text-xl leading-snug text-pretty md:text-2xl md:leading-tight lg:text-3xl lg:leading-tight"
            href={pathname}
            variant="foreground"
          >
            {title}
          </Link>
        </h1>
        <p className="mt-2 line-clamp-3 text-base tracking-tight text-pretty text-muted-foreground md:mt-3 lg:text-lg lg:leading-snug">
          {caption}
        </p>
        <Authors
          className={cn('mt-3 shrink-0 lg:mt-4', authorsPosition === 'left' && 'md:hidden')}
          authors={authors}
          size="xs"
        />
      </div>
    </article>
  );
}

export default PostCard;
