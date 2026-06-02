export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] dark:bg-[#0f172a]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-3 animate-bounce rounded-full bg-[#dc2626]"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-white/40">Loading...</p>
      </div>
    </main>
  );
}
