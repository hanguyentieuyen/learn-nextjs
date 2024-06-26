import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET, // require in product enviroment.
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "yen@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const existedUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existedUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existedUser.password
        );
        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existedUser.id}`,
          username: existedUser.username,
          email: existedUser.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({token, user}) {
      if(user) {
        return {
          ...token,
          username: user.username
        }
      }
      return token
    },
    session({session, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }
    }
  }
};
