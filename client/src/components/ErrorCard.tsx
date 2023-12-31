import { Container, Flex, Text } from "@mantine/core";

const ErrorCard = ({ error }: { error: { message: string } }) => {
  return (
    <Container size="xl">
      <Flex>{error && <Text>{error.message}</Text>}</Flex>
    </Container>
  );
};

export default ErrorCard;
