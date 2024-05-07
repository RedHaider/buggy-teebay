import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import AllProducts from "./pages/AllProducts";
import MyTransactions from "./pages/MyTransactions";
import NavbarLayout from "./components/nav/NavbarLayout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Pages without Navbar */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/my-transactions" element={<MyTransactions />} />

            {/* Pages with Navbar */}
            <Route
              path="/my-products"
              element={
                <NavbarLayout>
                  <MyProducts />
                </NavbarLayout>
              }
            />
            <Route
              path="/all-products"
              element={
                <NavbarLayout>
                  <AllProducts />
                </NavbarLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}
