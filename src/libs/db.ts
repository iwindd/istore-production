import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  // DELETE METHOD
  prisma.$use(async (params, next) => {
    if (params.model == 'Product') {
      if (params.action == 'delete') {
        params.action = 'update'
        params.args['data'] = { deleted: new Date() }
      }
      if (params.action == 'deleteMany') {
        params.action = 'updateMany'
        if (params.args.data != undefined) {
          params.args.data['deleted'] = new Date()
        } else {
          params.args['data'] = { deleted: new Date() }
        }
      }
    }
    return next(params)
  })

  return prisma;
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
