import { PrismaClient } from "@prisma/client";
import ProductData from './data/products.json';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "store@gmail.com" },
    update: {},
    create: {
      email: "store@gmail.com",
      name: "iStore",
      password: "password",
    },
  });

  const store = await prisma.store.create({
    data: {
      user_id: user.id,
      name: "Main Store"
    }
  })

  const category = await prisma.category.create({
    data: {
      label: "ทั้งหมด",
      store_id: store.id
    },
  })

  const products = await prisma.product.createMany({
    data: ProductData.map((product) => ({
      ...product,
      category_id: category.id,
      store_id: store.id
    }))
  })

  console.log({ user, store, category, products });
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
