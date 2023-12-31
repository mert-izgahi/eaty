import { Container } from "@mantine/core";
import ProductsList from "../components/ProductsList";

const HomePage = () => {
  
  return (
    <Container size="xl">
      <h1>Home</h1>
      <ProductsList />
    </Container>
  );
};

export default HomePage;
