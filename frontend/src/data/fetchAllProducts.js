

// fetchAllProducts.js
const fetchAllProducts = async (userId) => {
  try {
    const allProductsRes = await fetch( `http://localhost:3001/api/v1/products?userId=${userId}`);
    const userProductsRes = await fetch(`http://localhost:3001/api/v1/${userId}/products`);

    if (!allProductsRes.ok || !userProductsRes.ok) {
      throw new Error('Products fetch not ok');
    }

    const allProducts = await allProductsRes.json();
    const userProducts = await userProductsRes.json();

    // Merge allProducts and userProducts arrays
    const mergedProducts = [...allProducts, ...userProducts];

    return mergedProducts;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export default fetchAllProducts;
