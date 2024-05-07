const fetchAllProducts = async (userId) => {
  const apiRes = await fetch(
    `http://localhost:3001/api/v1/products?userId=${userId}`
  );
  if (!apiRes.ok) {
    throw new Error("Products fetch not ok");
  }
  return apiRes.json();
};

export default fetchAllProducts;
