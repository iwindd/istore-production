import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      store: number,
      name: string,
      email: string
    }
  }
}