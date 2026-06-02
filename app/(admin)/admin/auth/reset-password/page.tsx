import ResetPasswordForm from "@/components/admin/ResetPasswordForm";
import Image from "next/image";

export const metadata = { title: "Reset Password | PIPRA Trading" };

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f8f9fb] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-28">
            <Image src="/logo.png" alt="PIPRA Trading" fill className="object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#1a3a52]">Reset Password</h1>
          <p className="mt-1 text-sm text-gray-500">Create your new password</p>
        </div>
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
