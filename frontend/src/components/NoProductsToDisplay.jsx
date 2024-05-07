import { Card, Center, Title } from "@mantine/core";

// eslint-disable-next-line react/prop-types
const NoProductsToDisplay = ({ text }) => {
  return (
    <Center mb={"xl"}>
      <Card padding="xl" mb={"xl"} size={"xl"}>
        <Title order={3} tt={"uppercase"} fw={500} c={"dimmed"}>
          {text}
        </Title>
      </Card>
    </Center>
  );
};

export default NoProductsToDisplay;
