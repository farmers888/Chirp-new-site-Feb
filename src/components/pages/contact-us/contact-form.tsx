'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required.',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required.',
  }),
  workEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().min(5, {
    message: 'Please enter a valid phone number.',
  }),
  companyName: z.string().min(1, {
    message: 'Company name is required.',
  }),
  submissionType: z.string().min(1, {
    message: 'Please select a submission type.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

interface IContactFormProps {
  className?: string;
}

function ContactForm({ className }: IContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      workEmail: '',
      phoneNumber: '',
      companyName: '',
      submissionType: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    setTimeout(() => {
      // TODO: Send form data to backend
      // eslint-disable-next-line no-console
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 3000);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'grid gap-x-5 gap-y-6 rounded-lg border bg-primary-foreground px-4 py-5 md:grid-cols-2 md:gap-y-8 md:px-8 md:py-10 lg:grid-cols-1 xl:grid-cols-2',
          className,
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Jane" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work email</FormLabel>
              <FormControl>
                <Input placeholder="acme@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="submissionType"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Type of submission</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a submission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>How can we help?</FormLabel>
              <FormControl>
                <Textarea placeholder="Your company needs..." className="min-h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full mt-2 flex flex-col justify-between gap-x-5 gap-y-6 sm:flex-row sm:items-center">
          <p className="text-sm leading-snug tracking-tight text-pretty text-muted-foreground">
            By submitting this, I confirm that I have read and understood the
            {` `}
            <Link href="/legal/privacy-policy">Privacy Policy</Link>.
          </p>

          <Button
            className="h-11 w-full min-w-44 text-base sm:w-fit lg:min-w-fit xl:min-w-44"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
        {/* TODO: Add success state */}
        {isSuccess && (
          <p className="font-regular col-span-full text-sm leading-snug tracking-tight text-muted-foreground">
            Thank you for your message! We will get back to you as soon as possible.
          </p>
        )}
      </form>
    </Form>
  );
}

export default ContactForm;
