import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import { Label } from '@/shared/components/shadcn/label';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/shared/components/shadcn/card';
import { zodResolver } from '@hookform/resolvers/zod';
import type {
  LoginFormData,
  RegisterFormData,
} from '@/features/auth/types/auth.types';
import { useState } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import {
  loginSchema,
  registerSchema,
} from '@/features/auth/shemas/auth.shemas';
import { useNavigate } from 'react-router-dom';
import { Loader2, Mail, User } from 'lucide-react';
import PasswordInput from '@/shared/components/shadcn/input-password-with-toggle';
import { mapError } from '@/api/mapError';
import { ActionError } from '@/shared/components/messages/ActionError';
import { useSearchParams } from 'react-router-dom';

type Props = {
  mode: 'login' | 'register';
};

type FormData = LoginFormData & Partial<RegisterFormData>;

const AuthForm = ({ mode }: Props) => {
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const expired = searchParams.has('expired');

  const form = useForm<FormData>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await login(data as LoginFormData);
      } else {
        await register(data as RegisterFormData);
      }
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(mapError(err));
    }
  };

  const handleGuestMode = async () => {
    setLoadingGuest(true);

    await continueAsGuest();
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-sm bg-gray-50">
      <CardHeader>
        {expired && <ActionError error="Your session has expired" />}
        <CardTitle>{mode === 'login' ? 'Sign In' : 'Create account'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your login details to load your datas or open a session as a guest.'
            : 'Create an account to persist your datas.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-6">
            {mode === 'register' && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  <Input
                    {...form.register('name' as keyof FormData)}
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="pl-10 bg-white"
                  />
                </div>
                {form.formState.errors.name?.message && (
                  <p className="text-red-400 text-sm">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input
                  {...form.register('email')}
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="pl-10 bg-white"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm">
                  {form.formState.errors.email?.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <PasswordInput
                {...form.register('password')}
                id="password"
                placeholder="Password"
              />
              {form.formState.errors.password && (
                <p className="text-red-400 text-sm">
                  {form.formState.errors.password?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-col gap-2 mt-6">
            <Button
              type="submit"
              disabled={loading || loadingGuest}
              className="cursor-pointer w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  {mode === 'login' ? 'Logging in' : 'Registering'}
                </>
              ) : (
                <>{mode === 'login' ? 'Login' : 'Register'}</>
              )}
            </Button>
          </div>
        </form>

        {mode === 'login' && (
          <Button
            disabled={loading || loadingGuest}
            className="cursor-pointer w-full mt-2 bg-[#22A7E6] hover:bg-[#22A7E6]/60"
            onClick={handleGuestMode}
          >
            {loadingGuest && <Loader2 className="animate-spin" />}
            Continue as a Guest
          </Button>
        )}

        <div className="mt-6 pt-4 border-t border-slate-300/50 text-center">
          <p>
            {mode === 'login'
              ? `Don't have an account?`
              : `Already have an account?`}
            <button
              type="button"
              onClick={
                mode === 'login'
                  ? () => navigate('/register')
                  : () => navigate('/login')
              }
              className="text-blue-800 underline ml-1 cursor-pointer"
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
