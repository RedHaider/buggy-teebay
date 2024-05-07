import { Center, Flex, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"}>
      <Center>
        <Loader size="lg" variant="oval" />
      </Center>
    </Flex>
  );
};

export default Loading;
