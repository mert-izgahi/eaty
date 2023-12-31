import { ActionIcon, Flex, Indicator, Menu, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IoBagCheckOutline, IoCartOutline, IoTrash } from "react-icons/io5";
import classes from "./CartMenu.module.css";
import { clearCart } from "../redux/cartSlice";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
const CartMenu = () => {
  const dispatch = useAppDispatch();
  const { itemsQty, items, total } = useAppSelector((state) => state.cart);

  const onClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <Indicator label={itemsQty} size={20}>
      <Menu width={400} position="bottom-end">
        <Menu.Target>
          <ActionIcon size="lg" variant="outline">
            <IoCartOutline />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className={classes.cartDropdown}>
          {items.length === 0 && (
            <Menu.Item p="md">
              <Text ta="center">Your cart is empty</Text>
            </Menu.Item>
          )}
          {items &&
            items.map((item, index) => (
              <Menu.Item key={index} className={classes.cartItem}>
                <CartItem item={item} />
              </Menu.Item>
            ))}

          {items.length > 0 && (
            <Menu.Item p="md">
              <Flex gap={"md"}>
                <Text>Total: ${total}</Text>
                <ActionIcon component={Link} to="/cart" ml="auto">
                  <IoBagCheckOutline />
                </ActionIcon>
                <ActionIcon color="red" onClick={onClearCart}>
                  <IoTrash />
                </ActionIcon>
              </Flex>
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </Indicator>
  );
};

export default CartMenu;
