import { AppShell, Paper } from "@mantine/core";
import Header from "./Header";
import { useEffect, useState } from "react";
import NotLoggedIn from "../NotLoggedIn";

// eslint-disable-next-line react/prop-types
const NavbarLayout = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <AppShell user={user} header={<Header user={user} height={50} p="xs" />}>
      {children}
    </AppShell>
  );
};

export default NavbarLayout;
