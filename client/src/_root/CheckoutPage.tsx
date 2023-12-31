import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "../redux/store";
import CartItem from "../components/CartItem";
import { IoCartOutline } from "react-icons/io5";
import { useCreateOrderMutation } from "../redux/ordersApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearCart } from "../redux/cartSlice";

const CheckoutPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items, total } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);
  const form = useForm({
    initialValues: {
      user: user?._id,
      fullName: user?.name || "",
      address: "",
      city: "",
      postalCode: "",
      country: "Turkiye",
      paymentMethod: "Cart",
      taxPrice: 0.015 * total,
      shippingPrice: 0.01 * total,
      totalPrice: total + 0.015 * total + 0.01 * total,
      isDelivered: false,
    },

    validate: {
      fullName: (value) =>
        value.length < 3 ? "Name must have at least 3 characters" : null,
      address: (value) =>
        value.length < 3 ? "Address must have at least 3 characters" : null,
      city: (value) =>
        value.length < 3 ? "City must have at least 3 characters" : null,
      postalCode: (value) =>
        value.length < 3 ? "Postal code must have at least 3 characters" : null,
      country: (value) =>
        value.length < 3 ? "Country must have at least 3 characters" : null,
      paymentMethod: (value) =>
        value.length < 3
          ? "Payment method must have at least 3 characters"
          : null,
    },
  });
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    const args = {
      orderItems: items,
      shippingAddress: {
        fullName: values.fullName,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
      },
      paymentMethod: values.paymentMethod,
      itemsPrice: total,
      taxPrice: 0.015 * values.totalPrice,
      shippingPrice: 0.01 * values.totalPrice,
      totalPrice:
        values.totalPrice +
        0.015 * values.totalPrice +
        0.01 * values.totalPrice,
    };

    await createOrder({ data: args, token: token })
      .unwrap()
      .then(async (res) => {
        if (res) {
          const { url } = res;
          if (url) {
            window.location.href = url;
          }
        }
      });
  };

  useEffect(() => {
    if (success) {
      toast.success("Order created successfully");
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [success]);

  return (
    <Container size="xl">
      <Title order={2} mb="xl">
        Checkout
      </Title>
      <Grid columns={12}>
        <Grid.Col span={{ base: 12, md: 6, xl: 8 }}>
          <form noValidate onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              mb="md"
              label="Full Name"
              {...form.getInputProps("fullName")}
            />
            <TextInput
              mb="md"
              label="Address"
              {...form.getInputProps("address")}
            />
            <TextInput mb="md" label="City" {...form.getInputProps("city")} />
            <TextInput
              label="Postal code"
              mb="md"
              {...form.getInputProps("postalCode")}
            />
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              leftSection={<IoCartOutline />}
            >
              Produce to Payment
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
          <Card>
            <Card.Section p="md" withBorder>
              <Text>Summary</Text>
            </Card.Section>
            <Card.Section>
              {items.map((item) => (
                <CartItem key={item.product} item={item} />
              ))}
            </Card.Section>
            <Card.Section p="md">
              <Flex justify="space-between">
                <Text>Subtotal :</Text>
                <Text>${total}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Shipping :</Text>
                <Text>${Math.round(total * 0.01)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Tax :</Text>
                <Text>${Math.round(total * 0.015)}</Text>
              </Flex>
            </Card.Section>
            <Card.Section p="md">
              <Flex justify="space-between">
                <Text>Total :</Text>
                <Text>
                  $
                  {total + Math.round(total * 0.01) + Math.round(total * 0.015)}
                </Text>
              </Flex>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
