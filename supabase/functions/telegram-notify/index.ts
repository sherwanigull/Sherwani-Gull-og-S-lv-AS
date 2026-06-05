function html(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type InquiryRecord = {
  source_page?: string | null;
  metal_label?: string | null;
  type_label?: string | null;
  weight_grams?: number | null;
  unknown_weight?: boolean | null;
  estimated_price_nok?: number | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
  message?: string | null;
  created_at?: string | null;
};

function formatCurrency(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return "Ikke beregnet";
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildMessage(record: InquiryRecord) {
  const weight = record.unknown_weight
    ? "Ukjent"
    : typeof record.weight_grams === "number"
      ? `${record.weight_grams} g`
      : "Ikke oppgitt";

  return [
    "<b>Ny foresporsel fra nettsiden</b>",
    "",
    `<b>Metall:</b> ${html(record.metal_label || "Ikke oppgitt")}`,
    `<b>Type:</b> ${html(record.type_label || "Ikke oppgitt")}`,
    `<b>Vekt:</b> ${html(weight)}`,
    `<b>Estimat:</b> ${html(formatCurrency(record.estimated_price_nok))}`,
    "",
    `<b>Navn:</b> ${html(record.customer_name || "Ikke oppgitt")}`,
    `<b>Telefon:</b> ${html(record.customer_phone || "Ikke oppgitt")}`,
    `<b>E-post:</b> ${html(record.customer_email || "Ikke oppgitt")}`,
    `<b>Melding:</b> ${html(record.message || "Ingen melding")}`,
    "",
    `<b>Side:</b> ${html(record.source_page || "Ukjent")}`,
    `<b>Tid:</b> ${html(record.created_at || new Date().toISOString())}`,
  ].join("\n");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const webhookSecret = Deno.env.get("TELEGRAM_WEBHOOK_SECRET");
  const incomingSecret = req.headers.get("x-webhook-secret");

  if (webhookSecret && incomingSecret !== webhookSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (!botToken || !chatId) {
    return new Response("Missing Telegram secrets", { status: 500 });
  }

  let payload: { type?: string; record?: InquiryRecord; old_record?: InquiryRecord | null } | null = null;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!payload?.record) {
    return new Response("No record in payload", { status: 400 });
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(payload.record),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    const errorText = await telegramResponse.text();
    return new Response(`Telegram error: ${errorText}`, { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
