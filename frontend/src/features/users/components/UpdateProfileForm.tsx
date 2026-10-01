import { Button } from "@/shared/components/shadcn/button";
import { Input } from "@/shared/components/shadcn/input";
import { Label } from "@/shared/components/shadcn/label";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/shared/components/shadcn/card";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateUserFormData } from "@/features/auth/types/auth.types";
import { useState } from "react";
import { updateUserSchema } from "@/features/users/shemas/users.shemas";
import { Loader2, Mail, User as UserIcon } from "lucide-react";
import { User } from "../types/users.types";

type Props = React.ComponentProps<"div"> & {
  user: User;
  updateUser: (data: UpdateUserFormData) => Promise<void>;
};

const UpdateProfileForm = ({ className, user, updateUser }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = async (data: UpdateUserFormData) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await updateUser(data);
      form.reset(data);

      setSuccess("Your profile has been updated");
    } catch (err) {
      form.reset();

      setError(err instanceof Error ? err.message : "An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>My profile</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border-green-500/20 text-green-400 text-sm">
              {success}
            </div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              {/* ===================== NAME ===================== */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  <Input
                    {...form.register("name")}
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="pl-10 bg-white"
                  />
                </div>
                {form.formState.errors.name && (
                  <p className="text-red-400 text-sm">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* ===================== EMAIL ===================== */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  <Input
                    {...form.register("email")}
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="pl-10 bg-white"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-red-400 text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* ===================== SUBMIT ===================== */}
            <div className="flex-col gap-2 mt-6">
              <Button type="submit" disabled={loading || !isDirty}>
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
    </>
  );
};

export default UpdateProfileForm;
