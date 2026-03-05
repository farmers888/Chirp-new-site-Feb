'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, domAnimation, LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';

import { cn } from '@/lib/utils';

interface IAutoplayProgressProps {
  className?: string;
  totalItems: number;
  duration: number;
  activeIndex: number;
  onComplete: () => void;
  onSlideSelect: (index: number) => void;
  isPaused?: boolean;
}

const WIDTH_ANIMATION_DURATION = 0.7;

function AutoplayProgress({
  className,
  totalItems,
  duration,
  activeIndex,
  onComplete,
  onSlideSelect,
  isPaused = false,
}: IAutoplayProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isReadyForProgressAnimation, setIsReadyForProgressAnimation] = useState(false);

  const elapsedTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    elapsedTimeRef.current = 0;
    setProgress(0);
    setIsReadyForProgressAnimation(false);

    const desiredDelay = WIDTH_ANIMATION_DURATION * 1000 + 50;
    const timerId = setTimeout(() => {
      setIsReadyForProgressAnimation(true);
    }, desiredDelay);

    return () => {
      clearTimeout(timerId);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!isReadyForProgressAnimation || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      lastFrameTimeRef.current = null;
      return;
    }

    const animate = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = timestamp - lastFrameTimeRef.current;
      elapsedTimeRef.current += deltaTime;

      let newProgress = 0;
      if (duration > 0) {
        newProgress = Math.min(elapsedTimeRef.current / duration, 1);
      } else {
        newProgress = 1;
      }
      setProgress(newProgress);

      if (newProgress >= 1) {
        onComplete();
      }

      lastFrameTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    lastFrameTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, onComplete, isPaused, isReadyForProgressAnimation, activeIndex]);

  return (
    <nav className={cn('flex h-7 w-fit rounded-full bg-muted px-1 lg:h-8', className)}>
      <LazyMotion features={domAnimation}>
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            className="group relative w-fit rounded px-2 outline-hidden before:absolute before:top-1/2 before:left-0 before:h-8 before:w-full before:-translate-y-1/2"
            type="button"
            onClick={() => {
              onSlideSelect(i);
            }}
            aria-label={`Open slide ${i + 1}`}
            aria-current={i === activeIndex ? 'true' : 'false'}
            key={i}
          >
            <m.div
              className="relative h-2 cursor-pointer overflow-hidden rounded-full bg-muted-foreground/20 transition-colors duration-100 group-hover:bg-muted-foreground/30 group-hover:duration-200"
              initial={{ width: activeIndex === i ? '40px' : '8px' }}
              animate={{ width: activeIndex === i ? '40px' : '8px' }}
              transition={{
                duration: WIDTH_ANIMATION_DURATION,
                ease: [0.4, 0, 0.17, 1],
              }}
            >
              <AnimatePresence mode="wait">
                {i === activeIndex && (
                  <m.div
                    className="size-full rounded-full bg-foreground"
                    key={`progress-bar-${activeIndex}`}
                    initial={{ translateX: '-100%', opacity: 0 }}
                    animate={{
                      translateX: isReadyForProgressAnimation
                        ? `${(progress - 1) * 100}%`
                        : '-100%',
                      opacity: isReadyForProgressAnimation ? 1 : 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      translateX: { ease: 'linear', duration: 0 },
                      opacity: {
                        duration: WIDTH_ANIMATION_DURATION,
                        ease: [0.4, 0, 0.17, 1],
                      },
                    }}
                  />
                )}
              </AnimatePresence>
            </m.div>
          </button>
        ))}
      </LazyMotion>
    </nav>
  );
}

export default AutoplayProgress;
