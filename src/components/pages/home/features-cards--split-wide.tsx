import type { IFeatureCard } from '@/types/landing';
import { cn } from '@/lib/utils';

interface IFeaturesCardsProps {
  className?: string;
  items: IFeatureCard[];
}

function FeaturesCards({ className, items }: IFeaturesCardsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className={cn('features-cards overflow-hidden py-12 md:py-14 lg:py-16 xl:py-24', className)}
    >
      <div className="mx-auto max-w-screen-2xl px-5 md:px-8 2xl:px-16">
        <ul className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-10">
          {items.map(({ title, description, actions }, index) => (
            <li className="grid grid-cols-1 grid-rows-1" key={index}>
              {/* TODO: adjust graphics  */}
              <div className="col-span-full row-span-full min-h-125 rounded-lg bg-card md:min-h-115 md:rounded-2xl lg:min-h-126 xl:min-h-184">
                {/* {image && (
                <Image
                  className="size-full object-cover"
                  src={image.src}
                  alt={image.alt ?? ""}
                  width={image.width ?? 400}
                  height={image.height ?? 400}
                />
              )} */}
              </div>
              <div className="col-span-full row-span-full flex flex-col justify-end p-4 md:items-center md:px-12 md:py-8 md:text-center lg:p-5 xl:p-8 2xl:p-12">
                <h3 className="text-xl leading-tight font-medium tracking-tight text-pretty text-foreground md:text-2xl xl:text-4xl">
                  {title}
                </h3>
                {description && (
                  <p className="mt-2 max-w-lg text-sm leading-snug tracking-tight text-pretty text-muted-foreground md:mt-3 md:text-base xl:mt-4 xl:text-lg">
                    {description}
                  </p>
                )}
                {actions}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeaturesCards;
