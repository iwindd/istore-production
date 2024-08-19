import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: "store@gmail.com" },
    update: {},
    create: {
      email: "store@gmail.com",
      name: "iStore",
      password: "password",
      stores: {
        create: [{ name: "Main Store" }],
      },
    },
  });
  console.log({ user });
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
