const deleteAllUserProducts = async (userId) => {
    try {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/products`,
        { method: 'DELETE' }
      );
  
      if (!apiRes.ok) {
        throw new Error(`Error deleting product: ${apiRes.status} - ${apiRes.statusText}`);
      }
  
      return apiRes.json();
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message} ${userId}`);
    }
  };
  
  export default deleteAllUserProducts;
  