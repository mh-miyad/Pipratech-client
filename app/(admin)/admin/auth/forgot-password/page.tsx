import ForgotPasswordForm from "@/components/admin/ForgotPasswordForm";
import Image from "next/image";

export const metadata = { title: "Forgot Password | PIPRA Trading" };

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f8f9fb] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-28">
            <Image src="/logo.png" alt="PIPRA Trading" fill className="object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#1a3a52]">Forgot Password</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your email to receive a reset link</p>
        </div>
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
