import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  // Example sandbox PayPal credentials
  const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID!;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
  const base = "https://api-m.sandbox.paypal.com";

  const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString("base64");

  const response = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: amount.toString() } }],
      application_context: {
        return_url: "http://localhost:3000/payment-success",
        cancel_url: "http://localhost:3000/payment-cancel",
      },
    }),
  });

  const data = await response.json();
  return NextResponse.json({ approvalUrl: data.links[1].href });
}
