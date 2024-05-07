import { Button, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
  const [opened] = useDisclosure(true);

  const navigate = useNavigate();

  return (
    <Modal
      closeOnClickOutside="false"
      closeOnEscape="false"
      opened={opened}
      centered
      padding={"xl"}
      onClose={() => null}
    >
      <Title order={2} fw={300}>
        You are not logged in
      </Title>
      <Group position="right" spacing={"lg"} mt={"5rem"}>
        <Button uppercase color="red" onClick={() => navigate("/")}>
          Login
        </Button>
      </Group>
    </Modal>
  );
};

export default NotLoggedIn;
