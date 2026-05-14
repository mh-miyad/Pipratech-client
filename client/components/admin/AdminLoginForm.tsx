"use client";

import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { setAdminAuthenticated } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginValues = {
  username: string;
  password: string;
};

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    if (values.username === "admin" && values.password === "123456") {
      setAdminAuthenticated(true);
      router.replace("/admin/homepage");
      return;
    }

    setError("Use username admin and password 123456.");
  };

  return (
    <div className="min-h-svh bg-brand-primary-darker px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl shadow-black/30 lg:grid-cols-[0.9fr_1fr]">
          <div className="hidden bg-brand-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex size-11 items-center justify-center rounded-md bg-btn-cream text-brand-dark">
                <ShieldCheck className="size-5" />
              </div>
              <h1 className="mt-8 max-w-sm text-4xl font-normal leading-tight">
                SNL content control panel
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
                Manage homepage sections, products, gallery, sister concern,
                and about page content from one admin workspace.
              </p>
            </div>
            <p className="text-xs text-white/50">Temporary dummy login</p>
          </div>

          <Card className="rounded-none border-0 shadow-none">
            <CardHeader className="p-8 pb-4">
              <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-brand-primary text-white lg:hidden">
                <LockKeyhole className="size-5" />
              </div>
              <CardTitle className="text-2xl font-semibold text-brand-primary">
                Admin Login
              </CardTitle>
              <CardDescription>
                Login with dummy credentials to open the panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-3">
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="username">Admin ID</Label>
                  <Input
                    id="username"
                    autoComplete="username"
                    placeholder="admin"
                    {...register("username", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="123456"
                    {...register("password", { required: true })}
                  />
                </div>
                {error && (
                  <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="h-10 w-full rounded-md"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
