import { type ICtaSection } from '@/types/landing';
import { cn } from '@/lib/utils';

interface ICtaProps extends Pick<ICtaSection, 'title'> {
  className?: string;
  actions?: ICtaSection['actions'];
}

function Cta({ className, title, actions }: ICtaProps) {
  return (
    <section className={cn('cta pt-12 md:pt-14 lg:pt-16 xl:pt-24', className)}>
      <div className="grid grid-cols-1 grid-rows-1">
        <div className="col-span-full row-span-full overflow-hidden bg-card">
          {/* TODO: Adjust graphics for this section */}
        </div>
        <div className="col-span-full row-span-full mx-auto flex min-h-125 flex-col items-center px-5 pt-10 pb-12 md:min-h-150 md:px-8 md:py-14 lg:min-h-180 lg:pt-20 lg:pb-24 xl:min-h-212">
          <header className="flex w-full max-w-176 flex-col items-center text-center">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl md:leading-tight lg:text-5xl lg:leading-[1.125] xl:text-6xl xl:leading-[1.125]">
              {title}
            </h2>
            {actions}
          </header>
        </div>
      </div>
    </section>
  );
}

export default Cta;
