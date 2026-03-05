'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, domAnimation, LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';

import { cn } from '@/lib/utils';

interface IAutoplayProgressLineProps {
  className?: string;
  totalItems: number;
  duration: number;
  activeIndex: number;
  onComplete: () => void;
  onSlideSelect: (index: number) => void;
  isPaused?: boolean;
}

const WIDTH_ANIMATION_DURATION = 0.5;

function AutoplayProgressLine({
  className,
  totalItems,
  duration,
  activeIndex,
  onComplete,
  onSlideSelect,
  isPaused = false,
}: IAutoplayProgressLineProps) {
  const [progress, setProgress] = useState(0);
  const [isReadyForProgressAnimation, setIsReadyForProgressAnimation] = useState(false);

  const elapsedTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    elapsedTimeRef.current = 0;
    setProgress(0);
    setIsReadyForProgressAnimation(false);
    hasCompletedRef.current = false;

    const desiredDelay = WIDTH_ANIMATION_DURATION * 1000 + 40;
    const timerId = setTimeout(() => {
      setIsReadyForProgressAnimation(true);
    }, desiredDelay);

    return () => {
      clearTimeout(timerId);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!isReadyForProgressAnimation || isPaused || hasCompletedRef.current) {
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

      const newProgress = duration > 0 ? Math.min(elapsedTimeRef.current / duration, 1) : 1;
      setProgress(newProgress);

      if (newProgress >= 1) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
        lastFrameTimeRef.current = null;
        animationRef.current = null;
        return;
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
    <nav className={cn('flex w-full items-center gap-4', className)}>
      <LazyMotion features={domAnimation}>
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            className={cn(
              'group relative flex-1 rounded-full outline-hidden',
              'before:absolute before:top-1/2 before:left-0 before:h-5 before:w-full before:-translate-y-1/2',
            )}
            type="button"
            onClick={() => onSlideSelect(i)}
            aria-label={`Open slide ${i + 1}`}
            aria-current={i === activeIndex ? 'true' : 'false'}
            key={i}
          >
            <m.div
              className="relative h-0.5 w-full overflow-hidden rounded-full bg-border"
              initial={{ opacity: i === activeIndex ? 1 : 0.6 }}
              animate={{ opacity: i === activeIndex ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {i === activeIndex && (
                  <m.div
                    className="size-full rounded-full bg-foreground"
                    key={`progress-line-${activeIndex}`}
                    initial={{ translateX: '-100%', opacity: 0 }}
                    animate={{
                      translateX: isReadyForProgressAnimation
                        ? `${(progress - 1) * 100}%`
                        : '-100%',
                      opacity: isReadyForProgressAnimation ? 1 : 0,
                    }}
                    exit={{ opacity: 0 }}
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

export default AutoplayProgressLine;
