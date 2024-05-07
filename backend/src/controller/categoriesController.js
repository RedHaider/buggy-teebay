import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
  try {
    console.log("backend check 1");
    const categories = await prisma.category.findMany();
    console.log("backend check 2");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export { getAllCategories };
