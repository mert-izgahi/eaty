import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/productsApi";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import classes from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import ErrorCard from "../components/ErrorCard";
import { useAppDispatch } from "../redux/store";
import { addItem } from "../redux/cartSlice";
import { ICartItem } from "../types";
const ProductPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetProductQuery(id!);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

  const onAddToCart = () => {
    dispatch(
      addItem({
        item: {
          product: data?._id,
          name: data?.name,
          price: data?.price,
          qty: quantity,
          image: data?.images[0],
        } as ICartItem,
        quantity,
      })
    );
  };

  useEffect(() => {
    if (data) {
      setCurrentImage(data.images[0]);
    }
  }, [data]);
  if (error) {
    return <ErrorCard error={error as { message: string }} />;
  }
  return (
    <Container size="xl">
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {isLoading &&
          new Array(2)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className={classes.skeleton} />
            ))}

        {data && (
          <>
            <Box className={classes.imageContainer}>
              <Image
                src={currentImage}
                alt={data.name}
                className={classes.image}
              />

              <Flex className={classes.smallImages}>
                {data.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={data.name}
                    className={classes.smallImage}
                    onClick={() => setCurrentImage(image)}
                  />
                ))}
              </Flex>
            </Box>
            <Box className={classes.content}>
              <Text className={classes.name}>{data.name}</Text>
              <Text className={classes.price}>${data.price}</Text>
              <Text className={classes.description}>{data.description}</Text>
              <Text className={classes.category}>
                Category: {data.category}
              </Text>
              <Flex className={classes.addToCartFlex}>
                <Select
                  className={classes.select}
                  data={["1", "2", "3", "4", "5"]}
                  allowDeselect={false}
                  label="Quantity"
                  value={quantity.toString()}
                  onChange={(value) => setQuantity(Number(value))}
                />

                <Button className={classes.button} onClick={onAddToCart}>
                  Add to cart
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default ProductPage;
