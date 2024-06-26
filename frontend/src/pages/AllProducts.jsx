import { Container, Grid, Title } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BuyOrRent from "../components/productActions/BuyOrRent";
import NoProductsToDisplay from "../components/NoProductsToDisplay";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import fetchAllProducts from "../data/fetchAllProducts";

const AllProducts = () => {
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const queryClient = useQueryClient();
  let userId = user?.id;

  const queryResults = useQuery(
    [`allProducts${userId}`],
    () => fetchAllProducts(userId),
    {
      staleTime: Infinity,
    }
  );

  const products = queryResults.data || [];

  const handleCloseBuyRent = async () => {
    setIsProductClicked(false);
    setCurrentProduct({});
    await queryClient.invalidateQueries(`allProducts${userId}`);
  };

  if (queryResults.isLoading) {
    return <Loading />;
  }

  const handleProductCardClick = (product) => {
    setIsProductClicked(true);
    setCurrentProduct(product);
  };

  if (isProductClicked) {
    return (
      <BuyOrRent
        product={currentProduct}
        onClose={handleCloseBuyRent}
        userId={userId}
      />
    );
  }

  return (
    <Container my="xl" py={"lg"}>
      <Grid>
        <Grid.Col>
          <Title ta="center" order={1} fw={400} mb={"60px"}>
            ALL PRODUCTS{" "}
          </Title>
        </Grid.Col>
        {!products || products.length === 0 ? (
          <Grid.Col>
            <NoProductsToDisplay text={"No products to display"} />
          </Grid.Col>
        ) : (
          products.map((product) => {
            const isOwner = product.ownerId === userId;
            return (
              <Grid.Col key={product.id}>
                <Container
                  size={"xl"}
                  onClick={() => handleProductCardClick(product)}
                >
                  <ProductCard product={product} isOwner={isOwner} />
                </Container>
              </Grid.Col>
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default AllProducts;
