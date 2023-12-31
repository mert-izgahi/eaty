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
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import classes from "./LoginPage.module.css";
import { useLoginMutation } from "../redux/auth/api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/store";
import { setToken } from "../redux/auth/slice";
const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const redirectTo = searchParams.get("redirect") || "account";
  
  
  
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = async (values: { email: string; password: string }) => {
    await login(values)
      .unwrap()
      .then(async (token) => {
        if (token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          
          dispatch(setToken(token));
          navigate(`/${redirectTo}`);
          toast.success("Login successful");
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <Container size="xl">
      <Title order={2} mb={"xl"} className={classes.title}>
        Login to your account
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Box className={classes.box}>
          <Text>If you have an account, please login.</Text>
          <form noValidate onSubmit={form.onSubmit(onSubmit)}>
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
              <Button loading={isLoading} type="submit" mt="lg">
                Login
              </Button>

              <Text component={Link} to="/forget-password" mt="lg">
                Forget Password?
              </Text>
            </Flex>
          </form>
        </Box>

        <Box className={classes.box}>
          <Text size="lg" fw="bold" mb="md">
            New Customer ?
          </Text>
          <Text mb="md">Creating an account has many benefits.</Text>
          <List mb="xl">
            <List.Item>Fast and easy checkout</List.Item>
            <List.Item>Save multiple shipping addresses</List.Item>
            <List.Item>View and track orders and more</List.Item>
          </List>

          <Button variant="outline" component={Link} to="/auth/register">
            Create an account
          </Button>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default LoginPage;
