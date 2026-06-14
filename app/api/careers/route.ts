import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "El envio de CV no esta configurado todavia." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const name = field(formData, "name");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const role = field(formData, "role");
  const message = field(formData, "message");
  const cv = formData.get("cv");

  if (!name || !email || !(cv instanceof File)) {
    return NextResponse.json(
      { error: "Completá tu nombre, email y adjuntá tu CV." },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.has(cv.type)) {
    return NextResponse.json(
      { error: "El CV debe ser PDF, DOC o DOCX." },
      { status: 400 }
    );
  }

  if (cv.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "El archivo no puede superar los 8 MB." },
      { status: 400 }
    );
  }

  const content = Buffer.from(await cv.arrayBuffer()).toString("base64");
  const to = process.env.CAREERS_TO_EMAIL || "comando@vigia.security";
  const from = process.env.RESEND_FROM || "Vig.IA <postulaciones@vigia.security>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Nueva postulacion Vig.IA - ${name}`,
      text: [
        "Nueva postulacion desde el sitio web de Vig.IA.",
        "",
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Telefono: ${phone || "No informado"}`,
        `Area de interes: ${role || "No informada"}`,
        "",
        "Mensaje:",
        message || "Sin mensaje adicional.",
      ].join("\n"),
      attachments: [
        {
          filename: cv.name || `CV-${name}.pdf`,
          content,
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "No pudimos enviar el CV. Intentá nuevamente." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
