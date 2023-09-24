import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2023-08-16",
        });

        const priceId = 'price_1NrdoELFLQHFhq17Bs9q4lb0';
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                },
            ],
            mode: 'subscription',
            success_url: `${headers().get('origin')}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${headers().get('origin')}/checkout`,
        })

        return NextResponse.json(session.url)
    } catch (error) {
        return NextResponse.json(error)
    }
}