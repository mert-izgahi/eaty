import Stripe from "stripe";
import config from "config";

export async function createPaymentIntent(amount: number) {
  const stripe = new Stripe(config.get<string>("stripeBackendKey"));
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "USD",
    payment_method_types: ["card"],
  });
  return paymentIntent;
}
