const fetchCategories = async () => {
  console.log("frontend check 1");

  const apiRes = await fetch(`http://localhost:3001/api/v1/categories`);
  if (!apiRes.ok) {
    throw new Error("Categories fetch not ok");
  }

  console.log(apiRes);
  return apiRes.json();
};

export default fetchCategories;
