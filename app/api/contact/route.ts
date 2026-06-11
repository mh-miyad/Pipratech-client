import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://industry-portfolio.techelementbd.com";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "7e96ad0e-30eb-4eac-9d27-06e0cf57b80d";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tenant-id": TENANT_ID,
        "x-tenant-id": TENANT_ID,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        type: "CONTACT",
        subject: subject.trim(),
        message: message.trim(),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json({ error: err.message || "Failed to submit" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, message: "Message sent successfully. We will get back to you soon.", data: data.data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
