import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "ELECTRONICS" },
    { name: "FURNITURE" },
    { name: "HOME APPLIANCES" },
    { name: "SPORTING GOODS" },
    { name: "OUTDOOR" },
    { name: "TOYS" },
  ];

  for (const category of categories) {
    // Check if the category already exists in the database
    const existingCategory = await prisma.category.findUnique({
      where: { name: category.name },
    });

    if (!existingCategory) {
      // Create the category if it does not exist
      await prisma.category.create({
        data: category,
      });
    } else {
      console.log(`Category '${category.name}' already exists, skipping...`);
    }
  }

  console.log("Categories seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
