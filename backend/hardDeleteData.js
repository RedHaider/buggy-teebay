import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// needed this function to hard delete (almost-)everything as prisma client would not allow deletes of data with associated foreign keys.

const hardDeleteEverything = async () => {
  try {
    // Delete all records from the Transactions table
    await prisma.transactions.deleteMany();

    // Delete all records from product tables
    await prisma.product.deleteMany();

    await prisma.category.deleteMany();

    await prisma.user.deleteMany();

    // users can now simply be removed from database with prisma client

    console.log("All data have been deleted.");
  } catch (error) {
    console.error("Error deleting records:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
};

hardDeleteEverything();
