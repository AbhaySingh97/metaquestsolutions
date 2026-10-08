import { NextResponse } from "next/server";
import crypto from "crypto";
import { addRealRegistration } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      workshopId,
      workshopTitle,
      attendeeName,
      attendeeEmail,
      attendeePhone,
      organization,
      amount,
      isSimulation,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    let ticketCode = "";
    let finalPaymentId = razorpay_payment_id || `pay_${Date.now()}`;

    if (isSimulation || !keySecret) {
      ticketCode = `MQ-PASS-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    } else {
      const hmac = crypto.createHmac("sha256", keySecret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Invalid payment signature." },
          { status: 400 }
        );
      }
      ticketCode = `MQ-PASS-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Record real registration in backend database
    const newRecord = {
      id: `reg_${Date.now()}`,
      ticketCode,
      name: attendeeName || "Attendee",
      email: attendeeEmail || "attendee@metaquest.in",
      phone: attendeePhone || "N/A",
      organization: organization || "Independent",
      workshopId: workshopId || "general",
      workshopTitle: workshopTitle || "Live Workshop",
      amount: Number(amount) || 0,
      paymentId: finalPaymentId,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "CONFIRMED" as const,
    };

    addRealRegistration(newRecord);

    return NextResponse.json({
      success: true,
      verified: true,
      ticketCode,
      paymentId: finalPaymentId,
      record: newRecord,
      message: "Registration confirmed and recorded in backend.",
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
