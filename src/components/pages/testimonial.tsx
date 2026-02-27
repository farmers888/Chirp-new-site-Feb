import { IBlockquote } from '@/types/common';
import { cn } from '@/lib/utils';
import Blockquote, { type IBlockquoteProps } from '@/components/content/blockquote';
import TestimonialSlider from '@/components/pages/testimonial-slider';

interface ITestimonialProps extends Pick<IBlockquoteProps, 'theme' | 'centered'> {
  quotes: IBlockquote | IBlockquote[];
  className?: string;
  as?: 'div' | 'section';
  container?: 'wide' | 'xl' | 'lg' | 'md';
  autoplay?: boolean;
  duration?: number;
}

function Testimonial({
  className,
  quotes,
  as = 'section',
  container = 'md',
  theme = 'quote',
  centered = false,
  autoplay = false,
  duration = 5000,
}: ITestimonialProps) {
  const Component = as;
  const quotesArray: IBlockquote[] = Array.isArray(quotes) ? quotes : [quotes];
  const isMultiple = quotesArray.length > 1;
  const isCentered = Boolean(centered && theme === 'quote');

  const content = isMultiple ? (
    <TestimonialSlider
      autoplay={autoplay}
      duration={duration}
      centered={Boolean(isCentered && autoplay)}
    >
      {quotesArray.map((q, i) => (
        <Blockquote
          key={i}
          quote={q.quote}
          authors={q.authors}
          role={q.role}
          theme={theme}
          centered={Boolean(isCentered && autoplay)}
        />
      ))}
    </TestimonialSlider>
  ) : (
    <Blockquote
      className={cn(as !== 'section' && className)}
      {...quotesArray[0]}
      theme={theme}
      centered={isCentered}
    />
  );

  if (as === 'section') {
    return (
      <Component className={cn('testimonial py-12 md:py-16 lg:py-24', className)}>
        <div
          className={cn(
            'mx-auto max-w-xl px-5 md:px-8',
            container === 'wide' && 'md:max-w-7xl',
            container === 'xl' && 'md:max-w-7xl',
            container === 'lg' && 'md:max-w-5xl',
            container === 'md' && 'md:max-w-3xl',
          )}
        >
          {content}
        </div>
      </Component>
    );
  }

  return <>{content}</>;
}

export default Testimonial;
