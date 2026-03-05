import { type IFeaturesSection } from '@/types/landing';
import { cn } from '@/lib/utils';

interface IFeaturesProps extends Pick<IFeaturesSection, 'title' | 'image' | 'content'> {
  className?: string;
}

function Features({ className, title, content, image: _ }: IFeaturesProps) {
  return (
    <section className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <header className="mx-auto flex max-w-5xl flex-col px-5 md:px-8">
        <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl lg:text-6xl lg:leading-[1.125]">
          {title}
        </h2>
      </header>

      <div className="relative mx-auto mt-6 h-52 w-full overflow-hidden bg-card md:mt-10 md:h-110 lg:mt-14 xl:h-162">
        {/* TODO: adjust graphics */}
        {/* {image && (
          <Image
            className="size-full object-cover"
            src={image.src ?? "/images/placeholder-16x9.svg"}
            alt={image.alt ?? ""}
            fill
            quality={95}
          />
        )} */}
      </div>

      {content && (
        <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center px-5 md:mt-10 md:px-8 lg:mt-14">
          <div
            className="inline columns-1 gap-3 text-sm leading-snug font-medium tracking-tight text-pretty [column-fill:balance] *:break-inside-avoid md:columns-2 md:gap-24 md:text-base md:leading-normal md:*:max-w-104 lg:text-xl [&>*:not(:last-child)]:mb-4 md:[&>*:not(:last-child)]:mb-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </section>
  );
}

export default Features;
