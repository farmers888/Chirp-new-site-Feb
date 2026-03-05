'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { ISectionSlider } from '@/types/landing';
import { cn } from '@/lib/utils';
import useSlider from '@/hooks/use-slider';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AutoplayProgress from '@/components/pages/autoplay-progress';

interface ISectionSliderProps extends ISectionSlider {
  className?: string;
}

function SectionSlider({
  className,
  label,
  title,
  description,
  actions,
  items,
  autoplay = true,
  duration = 5000,
}: ISectionSliderProps) {
  const totalItems = items.length;

  const [api, setApi] = useState<CarouselApi | null>(null);

  const {
    activeIndex,
    handleSlideChange,
    handleSlideSelect,
    isPaused,
    setIsPaused,
    setActiveIndex,
    carouselRef,
  } = useSlider({
    autoplay,
    api,
  });

  useEffect(() => {
    if (api) {
      setActiveIndex(api.selectedScrollSnap());
      api.on('select', () => setActiveIndex(api.selectedScrollSnap()));
    }
  }, [api, setActiveIndex]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className={cn('section-slider py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="flex max-w-xl flex-col md:max-w-3xl xl:mx-auto xl:max-w-5xl">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
            {description}
          </p>
          {actions}
        </header>

        <Carousel
          className="relative mx-auto mt-9 w-full md:mt-10 lg:mt-12"
          setApi={setApi}
          ref={carouselRef}
          opts={{ loop: true }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {items.map(({ key, image }) => (
              <CarouselItem key={key}>
                <Image
                  className="aspect-video w-full rounded-[.625rem] md:rounded-2xl"
                  src={image.src ?? '/images/placeholder-16x9.svg'}
                  alt={image.alt ?? ''}
                  width={image.width ?? 1216}
                  height={image.height ?? 684}
                  quality={95}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <AutoplayProgress
            className="mt-9 md:mx-auto md:mt-10 lg:mt-12"
            totalItems={totalItems}
            duration={duration}
            activeIndex={activeIndex}
            onComplete={handleSlideChange}
            onSlideSelect={handleSlideSelect}
            isPaused={isPaused}
          />
        </Carousel>
      </div>
    </section>
  );
}

export default SectionSlider;
