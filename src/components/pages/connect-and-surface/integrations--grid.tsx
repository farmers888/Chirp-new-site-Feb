import Image from 'next/image';

import { type ILogo } from '@/types/common';
import { type IIntegrationsSectionBase } from '@/types/landing';
import { cn } from '@/lib/utils';

interface IIntegrationsProps extends IIntegrationsSectionBase {
  className?: string;
  logos: ILogo[];
}

function Integrations({
  className,
  title,
  description,
  logos,
  content,
  actions,
}: IIntegrationsProps) {
  if (!logos || logos.length === 0) return null;

  return (
    <section className={cn('integrations py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 md:px-8">
        <header className="flex max-w-2xl flex-col gap-3 self-start md:self-center md:text-center lg:max-w-176 lg:gap-4">
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl md:leading-tight lg:text-5xl lg:leading-[1.125]">
            {title}
          </h2>
          <p className="text-base leading-snug tracking-tight text-balance text-muted-foreground lg:text-lg lg:leading-normal">
            {description}
          </p>
        </header>

        <ul className="mt-10 grid w-full auto-rows-fr grid-cols-1 border-t border-l border-border md:grid-cols-3 lg:mt-16">
          {logos.map(({ src, alt, width, height }, index) => (
            <li
              className="flex h-32 items-center justify-center border-r border-b border-border"
              key={index}
            >
              <Image
                className="h-6 w-auto object-contain"
                src={src}
                alt={alt}
                width={width}
                height={height ?? 24}
              />
            </li>
          ))}
        </ul>

        {(content || (actions && actions.length > 0)) && (
          <div className="mt-6 flex max-w-176 flex-col items-center md:mt-8 lg:mt-10">
            {content && (
              <p
                className="text-center text-base leading-snug tracking-tight text-muted-foreground md:text-lg md:leading-normal [&_a]:font-medium [&_a]:text-primary [&_a]:hover:text-primary/85"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {actions}
          </div>
        )}
      </div>
    </section>
  );
}

export default Integrations;
