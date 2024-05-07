/* eslint-disable react/prop-types */
import { Button, Grid, Group, Modal, Paper, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    open();
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("currentUser");
    navigate(`/`);
  };

  return (
    <Paper shadow="sm" p="sm">
      <Grid grow px={20}>
        <Grid.Col span={1} sx={{ verticalAlign: "middle" }}>
          <Group position="center" mt={"1px"}>
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 60 }}
              sx={{
                userSelect: "none",
              }}
              ta="center"
              fz="xl"
              fw={400}
            >
              <Link to={`/my-products`}>teebay</Link>
            </Text>
          </Group>
        </Grid.Col>

        <Grid.Col span={6}>
          <Group position="right">
            <Link to={`/all-products`}>
              <Button variant="subtle" color="violet" uppercase>
                All Products
              </Button>
            </Link>
            <Link to={`/my-products`}>
              <Button variant="subtle" color="violet" uppercase>
                My Products
              </Button>
            </Link>
            <Link to={`/my-transactions`}>
              <Button variant="subtle" color="violet" uppercase>
                My Transactions
              </Button>
            </Link>
          </Group>
        </Grid.Col>
        <Grid.Col span={1}>
          <Group position="right" grow spacing={"sm"}>
            <Text color="black" fw={300} fz={"sm"}>
              Hello, {user.first_name}
            </Text>
            <Button color="red" uppercase onClick={handleLogoutClick}>
              Logout
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Modal opened={opened} onClose={close} centered padding={"xl"}>
        <Title order={2} fw={300}>
          Are you sure you want to log out?
        </Title>
        <Group position="right" spacing={"lg"} mt={"5rem"}>
          <Button uppercase onClick={close} color="red">
            No
          </Button>
          <Button uppercase color="violet" onClick={handleLogoutConfirm}>
            Yes
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
};

export default Header;
