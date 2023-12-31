import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAppSelector } from "../redux/store";
import CartItem from "../components/CartItem";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <Container size="xl">
      <Title order={2} mb="xl">
        Shopping Cart
      </Title>
      <Grid columns={12}>
        <Grid.Col span={{ base: 12, md: 6, xl: 8 }}>
          {items.map((item) => (
            <CartItem key={item.product} item={item} />
          ))}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
          <Card>
            <Card.Section p="md" withBorder>
              <Text>Summary</Text>
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
            <Card.Section p="md">
              <Stack gap="xs">
                {!isAuthenticated && (
                  <Button component={Link} to="/auth/login?redirect=cart">
                    Login to Checkout
                  </Button>
                )}
                <Button
                  disabled={!isAuthenticated}
                  fullWidth
                  leftSection={<IoCartOutline />}
                  component={Link}
                  to="/checkout"
                >
                  Produce to Checkout
                </Button>
                {/* <Button
                  disabled={!isAuthenticated}
                  fullWidth
                  leftSection={<IoLogoPaypal />}
                >
                  Checkout with Paypal
                </Button> */}
              </Stack>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ShoppingCart;
