import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workshopId, title, amount, name, email, phone } = body;

    if (!workshopId || !amount || !name || !email) {
      return NextResponse.json(
        { error: "Missing required booking details" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const orderPayload = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `mq_reg_${Date.now()}`,
        notes: {
          workshopId,
          workshopTitle: title,
          attendeeName: name,
          attendeeEmail: email,
          attendeePhone: phone || "N/A",
        },
      };

      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(
          { error: "Failed to generate Razorpay order", details: errorData },
          { status: 500 }
        );
      }

      const orderData = await response.json();
      return NextResponse.json({
        success: true,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId,
        isLive: true,
      });
    }

    // Sandbox Simulation Mode
    const simulatedOrderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return NextResponse.json({
      success: true,
      orderId: simulatedOrderId,
      amount: Math.round(amount * 100),
      currency: "INR",
      keyId: "rzp_test_simulation",
      isLive: false,
      message: "Simulated order created for development testing",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error while initiating payment" },
      { status: 500 }
    );
  }
}
