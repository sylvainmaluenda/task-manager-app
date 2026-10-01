import { Button } from '@/shared/components/shadcn/button';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/shared/components/shadcn/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { updatePasswordSchema } from '@/features/users/shemas/users.shemas';
import { Loader2 } from 'lucide-react';
import { usersService } from '@/features/users/services/users.service';
import type {
  UpdatePassword,
  UpdatePasswordPayload,
} from '../types/users.types';
import PasswordInput from '@/shared/components/shadcn/input-password-with-toggle';
import { mapError } from '@/api/mapError';
import { ActionError } from '@/shared/components/messages/ActionError';
import { ActionSuccess } from '@/shared/components/messages/ActionSuccess';

const UpdatePasswordForm = ({ className }: React.ComponentProps<'div'>) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<UpdatePassword>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: UpdatePassword) => {
    setloading(true);
    setError(null);
    setSuccess(null);

    const passwordPayload: UpdatePasswordPayload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    try {
      await usersService.updatePassword(passwordPayload);
      setSuccess('Your password has been updated');
      setloading(false);

      form.reset();
    } catch (e) {
      //setError((e as Error).message);
      setError(mapError(e));
      setloading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>My password</CardTitle>
      </CardHeader>
      <CardContent>
        <ActionError error={error || form.formState.errors.root?.message} />
        <ActionSuccess message={success} />

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-6">
            {/* =================== CURRENT PASSWORD =================== */}
            <div className="grid gap-2">
              <PasswordInput
                {...form.register('currentPassword')}
                id="current-password"
                placeholder="Current password"
                label="Current password"
              />
              {form.formState.errors.currentPassword && (
                <p className="text-red-400 text-sm">
                  {form.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* ===================== NEW PASSWORD ===================== */}
            <div className="grid gap-2">
              <PasswordInput
                {...form.register('newPassword')}
                id="new-password"
                placeholder="New password"
                label="New password"
              />
              {form.formState.errors.newPassword && (
                <p className="text-red-400 text-sm">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>
            {/* =================== CONFIRM PASSWORD =================== */}
            <div className="grid gap-2">
              <PasswordInput
                {...form.register('confirmPassword')}
                id="confirm-password"
                placeholder="Confirm password"
                label="Confirm new password"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-red-400 text-sm">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* ===================== SUBMIT ===================== */}
          <div className="flex-col gap-2 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving modifications...
                </>
              ) : (
                <>Save modifications</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
