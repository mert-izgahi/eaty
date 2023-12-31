import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import Order, { IOrderSchema } from "../models/order.model";
import { BadRequestError } from "../errors/BadRequest.error";
import Stripe from "stripe";
import config from "../configs";
import User from "../models/users.model";

const stripeKey: string | undefined = config?.stripeBackendKey;
const frontendUrl: string | undefined = config?.frontendUrl;
export async function getOrdersController(req: Request, res: Response) {
  const orders = await Order.getOrders({});
  return sendResponse(res, 200, "Orders fetched successfully", orders);
}

export async function getOneOrderController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const order = await Order.getOneOrder({ _id: id });
  return sendResponse(res, 200, "Order fetched successfully", order);
}

export async function createOrderController(
  req: Request<{}, {}, IOrderSchema>,
  res: Response
) {
  const user = res.locals.user.id;
  const customer = await User.getOneUserById(user);
  const args = { ...req.body, user } as IOrderSchema;
  const order = await Order.createOneOrder(args);
  if (!stripeKey) {
    throw new BadRequestError("Stripe key not found");
  }
  const stripe = new Stripe(stripeKey);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${frontendUrl}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${frontendUrl}/cancel?canceled=true`,
    customer_email: customer.email,
    // custom_fields: [
    //   {
    //     key: "name",
    //     label: {
    //       type: "custom",
    //       custom: "Personalized engraving",
    //     },
    //     type: "text",
    //   },
    // ],
    client_reference_id: order._id,
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Order",
            description: `Customer ${customer.email}, Order ${order._id}, Amount ${order.itemsPrice}`,
            images: order.orderItems.map((item) => item.image),
          },
          unit_amount: order.itemsPrice * 100,
        },
        quantity: order.orderItems.length,
      },
    ],
    // metadata: {
    //   name: customer.name,
    //   email: customer.email,
    // },
    allow_promotion_codes: true,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 days,
    // shipping_address_collection: { allowed_countries: ["US", "CA"] },
    // shipping_options: [{ shipping_rate: "shr_1IYjy3E9JmLjVp8nN0DnLpD0" }],
    // payment_intent_data: {
    //   metadata: {
    //     name: customer.name,
    //     email: customer.email,
    //   },
  });
  if (!session) {
    await Order.deleteOneOrder({ _id: order._id });

    throw new BadRequestError("Session could not be created");
  }
  if (!session.id) {
    await Order.deleteOneOrder({ _id: order._id });
    throw new BadRequestError("Session id not found");
  }
  const response = {
    url: session.url,
  }
  return sendResponse(res, 201, "Order created successfully", response);
}

export async function deleteOneOrderController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const order = await Order.deleteOneOrder({ _id: id });
  return sendResponse(res, 200, "Order deleted successfully", order);
}

export async function updateOneOrderController(
  req: Request<{ id?: string }, {}, IOrderSchema>,
  res: Response
) {
  const { id } = req.params;
  const order = await Order.updateOneOrder({ _id: id }, req.body, {
    new: true,
  });
  return sendResponse(res, 200, "Order updated successfully", order);
}

export async function createStripeCheckoutSessionController(
  req: Request<{ id?: string }>,
  res: Response
) {
  return sendResponse(res, 200, "Payment intent created successfully", {
    clientSecret: "client_secret",
  });
}
