const fetchMyProducts = async (userId) => {
  if (!userId) return [];
  const apiRes = await fetch(`http://localhost:3001/api/v1/${userId}/products`);
  if (!apiRes.ok) {
    throw new Error("Products fetch not ok");
  }
  return apiRes.json();
};

export default fetchMyProducts;
