"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Lock } from "lucide-react";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function PasswordInput({
  className = "",
  label = "Password",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="password-toggle">{label}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
        <Input
          className={`pl-10 bg-background ${className}`}
          id="password-toggle"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          required
          {...props}
        />
        <Button
          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
