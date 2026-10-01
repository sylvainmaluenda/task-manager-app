import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Input } from '../../../shared/components/shadcn/input';
import { Button } from '../../../shared/components/shadcn/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '../../../shared/components/shadcn/field';
import { ActionError } from '../../../shared/components/messages/ActionError';
import {
  CategoryFormValues,
  categorySchema,
} from '@/features/categories/shemas/category.shema';
import { useNavigate } from 'react-router-dom';

type Props = {
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  submitLabel?: string;
};

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  submitLabel = 'Save',
}: Props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      setError(null);
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
            {/* NAME */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldDescription>Enter a name.</FieldDescription>

              <Input
                {...form.register('name')}
                id="name"
                className="bg-white"
                placeholder="Name"
                aria-invalid={!!form.formState.errors.name}
              />

              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            {/* SUBMIT */}
            <Field orientation="horizontal">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard/categories')}
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
