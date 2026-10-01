import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Input } from '../../../shared/components/shadcn/input';
import { Button } from '../../../shared/components/shadcn/button';
import { Textarea } from '../../../shared/components/shadcn/textarea';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '../../../shared/components/shadcn/field';

import { ActionError } from '../../../shared/components/messages/ActionError';
import { TaskFormValues, taskSchema } from '@/features/tasks/shemas/task.shema';
import { Category } from '@/features/categories/types/category.type';
import { SelectCategory } from './SelectCategory';
import { useNavigate } from 'react-router-dom';

type Props = {
  defaultValues?: Partial<TaskFormValues>;
  categories: Category[];
  onSubmit: (data: TaskFormValues) => Promise<void>;
  submitLabel?: string;
};

export const TaskForm = ({
  defaultValues,
  categories,
  onSubmit,
  submitLabel = 'Save',
}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      categoryId: null,
      title: '',
      description: '',
      done: false,
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: TaskFormValues) => {
    setLoading(true);
    setError(null);

    try {
      await onSubmit(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActionError error={error || form.formState.errors.root?.message} />

      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <FieldSet>
          <FieldGroup>
            {/* CATEGORY */}
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <FieldDescription>Select a category.</FieldDescription>

              <SelectCategory
                defaultOption={{ label: 'None', value: 'none' }}
                categories={categories}
                categoryId={form.watch('categoryId')}
                onChange={(value) => form.setValue('categoryId', value)}
              />
            </Field>

            {/* TITLE */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <FieldDescription>Enter a title.</FieldDescription>

              <Input
                {...form.register('title')}
                id="title"
                className="bg-white"
                placeholder="Title"
                aria-invalid={!!form.formState.errors.title}
              />

              {form.formState.errors.title && (
                <FieldError>{form.formState.errors.title.message}</FieldError>
              )}
            </Field>

            {/* DESCRIPTION */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <FieldDescription>Optional task description.</FieldDescription>

              <Textarea
                {...form.register('description')}
                id="description"
                className="bg-white"
                placeholder="Description"
                aria-invalid={!!form.formState.errors.description}
              />

              {form.formState.errors.description && (
                <FieldError>
                  {form.formState.errors.description.message}
                </FieldError>
              )}
            </Field>

            {/* SUBMIT */}
            <Field orientation="horizontal">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard/tasks')}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
};
