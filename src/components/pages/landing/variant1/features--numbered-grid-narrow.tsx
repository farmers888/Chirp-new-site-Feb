import { type IFeatureItemCard, type IFeaturesSection } from '@/types/landing';
import { cn, formatLeadingZeroNumber } from '@/lib/utils';

type IFeatureTileItem = Pick<IFeatureItemCard, 'title'>;

interface IFeaturesProps extends Pick<IFeaturesSection, 'title' | 'description'> {
  className?: string;
  items: IFeatureTileItem[];
}

function Features({ className, title, description, items }: IFeaturesProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-304 flex-col items-center px-5 md:px-8">
        <header className="flex flex-col items-start gap-3 md:max-w-2xl md:items-center md:text-center lg:gap-4">
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl lg:leading-[1.125]">
            {title}
          </h2>
          <p className="text-base leading-snug font-medium tracking-tight text-balance text-muted-foreground md:text-lg lg:text-xl lg:leading-normal">
            {description}
          </p>
        </header>

        <ol className="mt-8 grid w-full grid-cols-1 border-t border-l border-border md:mt-10 md:grid-cols-4 lg:mt-12 xl:mt-16">
          {items.map(({ title }, index) => (
            <li
              className="flex min-h-30 flex-col justify-between gap-6 border-r border-b border-border p-5 md:min-h-40"
              key={index}
            >
              <span className="text-sm leading-none font-medium tracking-tight text-muted-foreground">
                [{formatLeadingZeroNumber(index + 1)}]
              </span>
              <p className="text-base leading-tight font-medium tracking-tight lg:text-lg lg:leading-snug">
                {title}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Features;
