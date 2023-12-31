import { Card, Image, Text } from "@mantine/core";
import classes from "./Product.module.css";
import { IProduct } from "../types";
import { Link } from "react-router-dom";
const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className={classes.card}>
      <Card.Section className={classes.image}>
        <Image src={product.images[0]} alt={product.name} />
      </Card.Section>
      <Card.Section className={classes.content}>
        <Text
          component={Link}
          to={`/products/${product._id}`}
          className={classes.name}
        >
          {product.name}
        </Text>
        <Text className={classes.price}>${product.price}</Text>
      </Card.Section>
    </Card>
  );
};

export default ProductCard;
