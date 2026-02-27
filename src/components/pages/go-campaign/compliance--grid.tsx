import { type TSectionAction } from '@/types/landing';
import { cn } from '@/lib/utils';

interface IComplianceFeatureItem {
  title: string;
  description: string;
}

interface IComplianceProps {
  className?: string;
  title: string;
  items: IComplianceFeatureItem[];
  actions: TSectionAction[];
}

function Compliance({ className, title, items, actions }: IComplianceProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('compliance py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex w-full max-w-full flex-col items-center gap-6 px-5 md:gap-6 md:px-8 lg:gap-10 xl:max-w-336 xl:gap-10">
        <header className="w-full md:w-auto">
          <h2 className="max-w-3xl text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-center md:text-3xl md:leading-snug lg:text-3xl lg:leading-snug xl:text-3xl xl:leading-snug">
            {title}
          </h2>
        </header>

        <div className="flex w-full flex-col items-center gap-6 md:gap-8 lg:gap-10">
          <ul className="grid w-full auto-rows-fr grid-cols-1 gap-2 md:grid-cols-3">
            {items.map((item, index) => (
              <li key={index} className="rounded-md bg-card p-4 pb-8.5">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base leading-snug font-medium tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-snug tracking-tight text-pretty text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {actions}
        </div>
      </div>
    </section>
  );
}

export default Compliance;
