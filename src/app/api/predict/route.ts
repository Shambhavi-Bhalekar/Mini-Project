// src/app/api/predict/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Forward the same FormData to the FastAPI backend
  // Create a new FormData and append file
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8000/predict", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Backend error", details: text }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
