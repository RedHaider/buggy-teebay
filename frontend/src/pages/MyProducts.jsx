/* eslint-disable react/prop-types */
import { Button, Container, Grid, Group, Modal, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddProduct from "../components/productActions/AddProduct";
import EditProduct from "../components/productActions/EditProduct";
import Loading from "../components/Loading";
import ProductDelete from "../components/DeleteIcon";
import NoProductsToDisplay from "../components/NoProductsToDisplay";
import ProductCard from "../components/ProductCard";
import { useDisclosure } from "@mantine/hooks";
import fetchMyProducts from "../data/fetchMyProducts";
import fetchCategories from "../data/fetchCategories";

const MyProducts = () => {
  const [isAddProductClicked, setIsAddProductClicked] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [opened, { open, close }] = useDisclosure(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  let userId = user.id;

  const categoriesQueryResults = useQuery(
    ["categories"],
    () => fetchCategories(),
    {
      staleTime: Infinity,
    }
  );

  const productsQueryResults = useQuery(
    [`user${userId}Products`],
    () => fetchMyProducts(userId),
    { staleTime: Infinity }
  );

  if (productsQueryResults.isLoading || categoriesQueryResults.isLoading) {
    return <Loading />;
  }
  const products = productsQueryResults.data;
  const categoriesFromApi = categoriesQueryResults.data;

  // reshape categories into {value: , label: } format as expected by form

  const categories =
    categoriesFromApi &&
    categoriesFromApi.map((category) => ({
      label: category.name,
      value: category.name,
    }));

  const handleAddProductClick = () => {
    setIsAddProductClicked(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductClicked(false);
    productsQueryResults.refetch();
  };

  const handleProductCardClick = (product) => {
    setOpenEditProduct(true);
    setProductToEdit(product);
  };

  const handleEditProductClose = () => {
    setOpenEditProduct(false);
    setProductToEdit({});
    productsQueryResults.refetch();
  };

  if (isAddProductClicked) {
    return (
      <AddProduct
        onClose={handleAddProductClose}
        userId={user.id}
        categories={categories}
      />
    );
  }

  if (openEditProduct) {
    return (
      <EditProduct
        onClose={handleEditProductClose}
        product={productToEdit}
        categories={categories}
      />
    );
  }

  const handleDelete = async (productId) => {
    try {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/${productId}/2`,
        {
          method: "DELETE",
        }
      );

      if (!apiRes.ok) {
        console.error("Error deleting product");
        return;
      }
      close();
      // refetch products
      productsQueryResults.refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container my="xl" py={"lg"}>
      <Grid>
        <Grid.Col>
          <Title ta="center" order={1} fw={400} mb={"60px"}>
            MY PRODUCTS{" "}
          </Title>
        </Grid.Col>
        {!products || !categoriesFromApi || products.length === 0 ? (
          <Grid.Col>
            <NoProductsToDisplay text={"You have no products"} />
          </Grid.Col>
        ) : (
          products.map((product) => {
            return (
              <Grid.Col key={product.id}>
                <Container
                  size={"xl"}
                  onClick={() => handleProductCardClick(product)}
                >
                  <ProductCard
                    product={product}
                    deleteIcon={
                      <ProductDelete onDelete={() => open()} id={product.id} />
                    }
                  />
                </Container>
                <Modal opened={opened} onClose={close} centered padding={"xl"}>
                  <Title order={2} fw={300}>
                    Are you sure you want to delete this Product?
                  </Title>
                  <Group position="right" spacing={"lg"} mt={"5rem"}>
                    <Button uppercase onClick={close} color="red">
                      No
                    </Button>
                    <Button
                      uppercase
                      color="violet"
                      onClick={() => handleDelete(product.id)}
                    >
                      Yes
                    </Button>
                  </Group>
                </Modal>
              </Grid.Col>
            );
          })
        )}
      </Grid>
      <Group position="right" mt={20}>
        <Button
          color="violet"
          onClick={handleAddProductClick}
          mx={"xl"}
          size="md"
        >
          Add Product
        </Button>
      </Group>
    </Container>
  );
};

export default MyProducts;
