import {
  Box,
  Button,
  Container,
  Flex,
  List,
  PasswordInput,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import classes from "./RegisterPage.module.css";

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
    },
  });

  const onSubmit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log(values);
  };
  return (
    <Container size="xl">
      <Title order={2} mb={"xl"}>
        Create new account
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Box className={classes.box}>
          <Text>Create new account, it's free and only takes a minute.</Text>
          <form noValidate onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              label="Full Name"
              placeholder="Full Name"
              withAsterisk
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Email"
              placeholder="Email"
              withAsterisk
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              withAsterisk
              {...form.getInputProps("password")}
            />

            <Flex justify="space-between" align="center">
              <Button type="submit" mt="lg">
                Create Account
              </Button>
            </Flex>
          </form>
        </Box>

        <Box className={classes.box}>
          <Text size="lg" fw="bold" mb="md">
            You already have an account ?
          </Text>
          <Text mb="md">Creating an account has many benefits.</Text>
          <List mb="xl">
            <List.Item>Fast and easy checkout</List.Item>
            <List.Item>Save multiple shipping addresses</List.Item>
            <List.Item>View and track orders and more</List.Item>
          </List>

          <Button variant="outline" component={Link} to="/auth/login">
            Login to your account
          </Button>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default RegisterPage;
