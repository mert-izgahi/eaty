import Stripe from "stripe";
import config from "../../configs";

export async function createPaymentIntent(amount: number) {
  const stripeKey: string | undefined = config?.stripeFrontendKey;
  if (!stripeKey) {
    throw new Error("Stripe key not found");
  }
  const stripe = new Stripe(stripeKey);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "USD",
    payment_method_types: ["card"],
  });
  return paymentIntent;
}
