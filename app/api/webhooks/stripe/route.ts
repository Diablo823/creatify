/* import { NextResponse } from "next/server";
import crypto from 'crypto';
import { createTransaction } from "@/lib/actions/transaction.actions";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature") as string;
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const { order_id, id: payment_id, notes } = event.payload.payment.entity;

      const transaction = {
        razorpayOrderId: order_id,
        razorpayPaymentId: payment_id,
        razorpaySignature: signature,
        amount: event.payload.payment.entity.amount / 100, // Convert from paise to rupees
        plan: notes?.plan || "",
        credits: Number(notes?.credits) || 0,
        buyerId: notes?.buyerId || "",
        createdAt: new Date(),
      };

      const newTransaction = await createTransaction(transaction);
      return NextResponse.json({ message: "OK", transaction: newTransaction });
    }

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: "Webhook error", error: error },
      { status: 400 }
    );
  }
} */



/* eslint-disable camelcase */

import { createTransaction } from "@/lib/actions/transaction.actions";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const transaction = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || "",
      credits: Number(metadata?.credits) || 0,
      buyerId: metadata?.buyerId || "",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);
    
    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}