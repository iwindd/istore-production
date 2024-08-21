import CredentialsProvider from "next-auth/providers/credentials";
import AuthConfig from "./config/AuthConfig";
import db from "./libs/db";

export const authOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    jwt: true,
    ...AuthConfig.session,
  },
  callbacks: {
    async jwt({ trigger, token, user, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return {
        ...{
          id: token.id,
          store: token.id,
          name: token.name,
          email: token.email,
        },
        ...user,
      };
    },
    async session({ session, token }: any) {
      session.user = token as any;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) throw new Error("no_credentails");
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,
              password: credentials.password,
            },
            include: {
              stores: true,
            },
          });

          const store = user?.stores[0];

          if (!user || !store) throw new Error("no_store");

          return {
            id: String(user.id),
            store: store.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};
