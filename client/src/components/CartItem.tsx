import { ActionIcon, Flex, Image, Stack, Text } from "@mantine/core";
import { ICartItem } from "../types";
import classes from "./CartItem.module.css";
import { Link } from "react-router-dom";
import { IoAdd, IoRemove, IoTrash } from "react-icons/io5";
import { useAppDispatch } from "../redux/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/cartSlice";

const CartItem = ({ item }: { item: ICartItem }) => {
  const dispatch = useAppDispatch();
  const onRemoveItem = (id: string) => {
    if (id) {
      dispatch(removeItem(id));
    }
  };

  const onIncrementQuantity = (id: string) => {
    if (id) {
      dispatch(incrementQuantity(id));
    }
  };

  const onDecrementQuantity = (id: string) => {
    if (id) {
      dispatch(decrementQuantity(id));
    }
  };
  return (
    <Flex className={classes.cartFlex}>
      <Image
        src={item.image}
        width={40}
        height={40}
        className={classes.cartImage}
      />

      <Stack className={classes.cartStack}>
        <Text
          truncate="end"
          component={Link}
          className={classes.cartText}
          to={`/products/${item.product}`}
        >
          {item.name.slice(0, 20)}
        </Text>
        <Text>Qty: {item.qty}</Text>
        <Text>Total: ${item.qty * item.price}</Text>
      </Stack>

      <Stack className={classes.cartBtnStack}>
        <ActionIcon
          variant="subtle"
          onClick={() => onIncrementQuantity(item.product)}
        >
          <IoAdd />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          onClick={() => onDecrementQuantity(item.product)}
        >
          <IoRemove />
        </ActionIcon>

        <ActionIcon variant="subtle" onClick={() => onRemoveItem(item.product)}>
          <IoTrash />
        </ActionIcon>
      </Stack>
    </Flex>
  );
};

export default CartItem;
