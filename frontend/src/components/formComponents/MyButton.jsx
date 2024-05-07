import { Button, Center } from "@mantine/core";

const MyButton = ({ text }) => {
  return (
    <Center>
      <Button size="sm" type="submit" uppercase color="violet" radius={"sm"}>
        {text}
      </Button>
    </Center>
  );
};

export default MyButton;
