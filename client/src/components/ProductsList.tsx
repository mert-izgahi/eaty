import { Flex, SimpleGrid, Skeleton, Text } from "@mantine/core";
import { useGetProductsQuery } from "../redux/productsApi";
import { IProduct } from "../types";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (error) {
    return (
      <Flex>
        <Text>{"An error occurred."}</Text>
      </Flex>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, md: 3, xl: 5 }}>
      {isLoading &&
        new Array(10).fill(0).map((_, index) => <Skeleton key={index} />)}
      {data &&
        data.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </SimpleGrid>
  );
};

export default ProductsList;
