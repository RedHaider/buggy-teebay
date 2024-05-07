import { Button, Group, Tabs, Text } from "@mantine/core";
import BoughtProducts from "../components/transactionRecords/BoughtProducts";
import SoldProducts from "../components/transactionRecords/SoldProducts";
import BorrowedProducts from "../components/transactionRecords/BorrowedProducts";
import LentProducts from "../components/transactionRecords/LentProducts";
import { Link } from "react-router-dom";
import NotLoggedIn from "../components/NotLoggedIn";
import { useEffect, useState } from "react";

const MyTransactions = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  let userId = user?.id;

  if (!userId) {
    return <NotLoggedIn />;
  }

  return (
    <div>
      <Tabs py={5} color="violet" defaultValue="bought">
        <Tabs.List position="center" grow sx={{ border: "0px" }} color="violet">
          <Tabs.Tab value="bought">
            <Text>Bought</Text>
          </Tabs.Tab>
          <Tabs.Tab value="sold">
            <Text>Sold</Text>
          </Tabs.Tab>
          <Tabs.Tab value="borrowed">Borrowed</Tabs.Tab>
          <Tabs.Tab value="lent">Lent</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="bought" pt="xs">
          <BoughtProducts userId={userId} />
        </Tabs.Panel>

        <Tabs.Panel value="sold" pt="xs">
          <SoldProducts userId={userId} />
        </Tabs.Panel>

        <Tabs.Panel value="borrowed" pt="xs">
          <BorrowedProducts userId={userId} />
        </Tabs.Panel>

        <Tabs.Panel value="lent" pt="xs">
          <LentProducts userId={userId} />
        </Tabs.Panel>
      </Tabs>
      <Group position="center" spacing={"xl"} mb={100}>
        <Link to={`/my-products`}>
          <Button variant="subtle" color="violet" uppercase>
            Go back{" "}
          </Button>
        </Link>
      </Group>
    </div>
  );
};

export default MyTransactions;
