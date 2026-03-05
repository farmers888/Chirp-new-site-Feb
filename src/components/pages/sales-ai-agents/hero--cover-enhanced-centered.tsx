import { type IHeroSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { CopyCommand } from '@/components/ui/copy-command';
import Logos from '@/components/pages/logos';

export interface IHeroProps extends IHeroSection {
  className?: string;
  command?: string;
}

function Hero({ title, description, actions, logos, command, className }: IHeroProps) {
  return (
    <section className={cn('hero flex flex-col pb-12 md:pb-14 lg:pb-16 xl:pb-24', className)}>
      <div className="col-span-1 row-span-1 grid">
        <div className="col-span-full row-span-full bg-card">
          {/* TODO: Adjust graphics for this section */}
        </div>
        <div className="relative col-span-full row-span-full flex flex-col justify-between px-5 py-10 md:px-8 xl:px-11">
          <h1 className="mx-auto my-32 max-w-176 text-center text-3xl leading-tight font-semibold tracking-tight text-foreground md:my-80 md:text-5xl md:leading-[1.125] lg:my-60 lg:text-6xl lg:leading-[1.125] xl:my-80">
            {title}
          </h1>
          <div className="mx-auto mt-auto flex w-full max-w-480 flex-col gap-5 md:gap-8 xl:flex-row xl:items-center xl:justify-between">
            <p className="max-w-2xl leading-snug tracking-tight text-foreground md:text-xl md:leading-tight md:tracking-tight lg:text-2xl lg:tracking-tight">
              {description}
            </p>
            <div className="flex w-full flex-col gap-4 md:grow md:flex-row md:items-center xl:justify-end">
              {actions}
              {command && (
                <CopyCommand className="w-full grow md:max-w-104 xl:max-w-80" command={command} />
              )}
            </div>
          </div>
        </div>
      </div>
      {logos && (
        <Logos
          className="overflow-hidden bg-muted/50 py-5 md:py-6 lg:py-7 xl:py-11"
          gap="wide"
          logos={logos}
          variant="row"
          useMask={false}
        />
      )}
    </section>
  );
}

export default Hero;
