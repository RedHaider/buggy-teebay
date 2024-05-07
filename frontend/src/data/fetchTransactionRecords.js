const fetchTransactionRecords = async (userId, transactionType) => {
  const apiRes = await fetch(
    `http://localhost:3001/api/v1/${userId}/${transactionType}`
  );
  if (!apiRes.ok) {
    throw new Error("Products fetch not ok");
  }
  return apiRes.json();
};

export default fetchTransactionRecords;
