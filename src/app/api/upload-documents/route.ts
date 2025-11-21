//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// CLOUDINARY INIT
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// FIREBASE ADMIN INIT
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.GCP_PROJECT_ID,
      clientEmail: process.env.GCP_CLIENT_EMAIL,
      privateKey: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const firestore = admin.firestore();

// Helper: upload file to Cloudinary
async function uploadToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUri,
      { folder },
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const userId = body.get("userId") as string;
    const type = body.get("type") as "prescription" | "report";
    const files = body.getAll("files").filter((f): f is File => f instanceof File);

    if (!userId || !type) {
      return NextResponse.json({ error: "Missing userId or type" }, { status: 400 });
    }

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploaded = [];

    for (const file of files) {
      const result: any = await uploadToCloudinary(
        file,
        `patients/${userId}/${type}`
      );

      uploaded.push({
        name: file.name,
        url: result.secure_url,
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      });
    }

    const docRef = firestore.collection("patients").doc(userId);
    const snap = await docRef.get();
    const existing = snap.exists ? snap.data()?.[`${type}s`] || [] : [];

    await docRef.set(
      { [`${type}s`]: [...existing, ...uploaded] },
      { merge: true }
    );

    return NextResponse.json({ success: true, uploaded });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
