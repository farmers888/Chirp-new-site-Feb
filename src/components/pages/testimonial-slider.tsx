'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import useSlider from '@/hooks/use-slider';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import AutoplayProgress from '@/components/pages/autoplay-progress';

interface TestimonialSliderProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  duration?: number;
  centered?: boolean;
}

function TestimonialSlider({
  children,
  autoplay = false,
  duration = 5000,
  centered = false,
}: TestimonialSliderProps) {
  const totalItems = children.length;

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
    <div className="relative">
      <Carousel
        className="relative w-full"
        ref={carouselRef}
        setApi={setApi}
        opts={{ loop: true }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!autoplay && (
          <div className="mb-2.5 flex justify-end gap-x-1 md:mb-3 md:gap-x-3">
            <CarouselPrevious className="relative top-0 left-0 size-8 translate-y-0 rounded-md md:size-11 md:rounded-xl [&_svg]:size-3.5 md:[&_svg]:size-5" />
            <CarouselNext className="relative top-0 right-0 size-8 translate-y-0 rounded-md md:size-11 md:rounded-xl [&_svg]:size-3.5 md:[&_svg]:size-5" />
          </div>
        )}

        <CarouselContent>
          {children.map((child, index) => (
            <CarouselItem key={index}>{child}</CarouselItem>
          ))}
        </CarouselContent>

        {autoplay && (
          <AutoplayProgress
            className={cn('mt-8 md:mt-9', centered ? 'md:mx-auto' : 'md:ml-auto')}
            totalItems={totalItems}
            duration={duration}
            activeIndex={activeIndex}
            onComplete={handleSlideChange}
            onSlideSelect={handleSlideSelect}
            isPaused={isPaused}
          />
        )}
      </Carousel>
    </div>
  );
}

export default TestimonialSlider;
