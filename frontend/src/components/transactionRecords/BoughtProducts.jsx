/* eslint-disable react/prop-types */
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import Loading from "../Loading";
import NoProductsToDisplay from "../NoProductsToDisplay";
import fetchTransactionRecords from "../../data/fetchTransactionRecords";

const BoughtProducts = ({ userId }) => {
  const queryResults = useQuery(
    [`${userId}_BoughtProducts`],
    () => fetchTransactionRecords(userId, "bought"),
    { staleTime: Infinity }
  );

  const products = queryResults.data;

  if (queryResults.isLoading) {
    return <Loading />;
  }

  return (
    <Container my={"xl"} py={"xl"} size={"lg"}>
      {!products || products.length == 0 ? (
        <NoProductsToDisplay text={"No bought products"} />
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </Container>
  );
};

export default BoughtProducts;
