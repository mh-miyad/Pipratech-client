export function friendlyError(message?: string, errors?: unknown, action?: string): string {
  if (typeof message === "string" && message.trim()) return message;
  if (Array.isArray(errors)) {
    const msgs = errors.map((e: any) => {
      if (typeof e === "string") return e;
      if (e?.message) return e.message;
      return "";
    }).filter(Boolean);
    if (msgs.length) return msgs.join(", ");
  }
  const act = action || "complete the operation";
  return `Failed to ${act}. Please try again.`;
}
