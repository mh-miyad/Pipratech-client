import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] dark:bg-[#0f172a] px-5">
      <div className="text-center">
        <p className="text-8xl font-light tracking-tight text-[#dc2626]">404</p>
        <h1 className="mt-6 text-3xl font-normal text-[#1a3a52] dark:text-white">Page not found</h1>
        <p className="mt-3 max-w-md text-base leading-7 text-gray-600 dark:text-white/50">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white transition-colors hover:bg-[#b91c1c]"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
