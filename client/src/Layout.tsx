import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Button,
  Container,
  Flex,
  Image,
  Menu,
  NavLink,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IoPerson,
  IoSettings,
  IoLogOut,
  IoArrowForward,
  IoBarChartOutline,
  IoLayersOutline,
  IoPeopleOutline,
  IoStorefrontOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoCartOutline,
} from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import CartMenu from "./components/CartMenu";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useGetCurrentUserQuery } from "./redux/auth/api";
import { useEffect, useMemo } from "react";
import { setIsAdmin, setIsAuthenticated, setUser } from "./redux/auth/slice";
const Layout = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();
  const navigate = useNavigate();
  const withSidebar = useMemo(
    () =>
      location.pathname.includes("/dashboard") ||
      location.pathname.includes("/account"),
    [location.pathname]
  );
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    error: currentUserError,
  } = useGetCurrentUserQuery(token!);
  const headerLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Shop",
      link: "/shop",
    },
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Contact",
      link: "/contact",
    },
  ];
  const onLogout = () => {
    dispatch(setUser(null));
    dispatch(setIsAdmin(false));
    dispatch(setIsAuthenticated(false));
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    navigate("/");
  };
  const sidebarLinks = {
    customerLinks: [
      {
        label: "Overview",
        icon: <IoBarChartOutline />,
        link: "/account/overview",
      },
      {
        label: "Account",
        icon: <IoPerson />,
        link: "/account/profile",
      },
      {
        label: "Cart",
        icon: <IoCartOutline />,
        link: "/account/cart",
      },
      {
        label: "Orders",
        icon: <IoLayersOutline />,
        link: "/account/orders",
      },
    ],
    adminLinks: [
      {
        label: "Overview",
        icon: <IoBarChartOutline />,
        link: "/dashboard/overview",
      },
      {
        label: "Customers",
        icon: <IoPeopleOutline />,
        link: "/dashboard/customers",
      },
      {
        label: "Products",
        icon: <IoStorefrontOutline />,
        link: "/dashboard/products",
      },
      {
        label: "Orders",
        icon: <IoLayersOutline />,
        link: "/dashboard/orders",
      },
    ],
  };

  useEffect(() => {
    if (currentUser) {
      const role = currentUser?.role;
      const isAdmin = role === "admin";
      dispatch(setUser(currentUser));
      dispatch(setIsAdmin(isAdmin));
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setUser(null));
      dispatch(setIsAdmin(false));
      dispatch(setIsAuthenticated(false));
    }
  }, [currentUser]);

  useEffect(() => {
    if (
      location.pathname.includes("/dashboard") ||
      location.pathname.includes("/account")
    ) {
      if (!isAuthenticated) {
        navigate("/auth/login");
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (currentUserError) {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [currentUserError]);

  if (currentUserLoading) {
    return <>Loading...</>;
  }

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={
        withSidebar
          ? {
              width: 250,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }
          : undefined
      }
    >
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Flex h="100%" align="center" gap="md">
            <Link to="/">
              <Image src="../assets/logo.svg" width={40} height={40} />
            </Link>
            {headerLinks.map((link, index) => (
              <Text fw="bold" key={index} component={Link} to={`${link.link}`}>
                {link.label}
              </Text>
            ))}

            <Flex align="center" ml="auto" gap="md">
              <ActionIcon
                onClick={() => toggleColorScheme()}
                size={"lg"}
                variant="outline"
              >
                {colorScheme === "dark" ? (
                  <IoSunnyOutline />
                ) : (
                  <IoMoonOutline />
                )}
              </ActionIcon>
              <CartMenu />

              {isAuthenticated ? (
                <Menu width={200} position="bottom-end">
                  <Menu.Target>
                    <Avatar
                      size="md"
                      radius="sm"
                      src={`https://avatars.githubusercontent.com/u/${Math.ceil(
                        Math.random() * 10000
                      )}?v=4`}
                    />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      component={Link}
                      to="/account/profile"
                      leftSection={<IoPerson />}
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      to="/settings"
                      leftSection={<IoSettings />}
                    >
                      Settings
                    </Menu.Item>
                    <Menu.Item onClick={onLogout} leftSection={<IoLogOut />}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button component={Link} to="/auth/login">
                  Login
                </Button>
              )}
              <Burger hiddenFrom="md" opened={opened} onClick={toggle} />
            </Flex>
          </Flex>
        </Container>
      </AppShell.Header>

      {withSidebar && (
        <AppShell.Navbar>
          <Stack h={"100%"} py={"md"} px={"md"}>
            {sidebarLinks[isAdmin ? "adminLinks" : "customerLinks"].map(
              (link, index) => (
                <NavLink
                  label={link.label}
                  leftSection={link.icon}
                  key={index}
                  component={Link}
                  to={link.link}
                  active={location.pathname === link.link}
                  rightSection={<IoArrowForward />}
                />
              )
            )}

            <Button
              onClick={onLogout}
              mt={"auto"}
              leftSection={<IoLogOut />}
              variant="outline"
            >
              Logout
            </Button>
          </Stack>
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Container size="xl" h="100%">
          <Flex h="100%" align="center" justify="center">
            <Text fw="bold">Copyright &copy; 2024</Text>
          </Flex>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
