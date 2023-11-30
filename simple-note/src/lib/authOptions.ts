import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          
          credentials: {
            username: { label: "Email", type: "email", placeholder: "yen@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const user = { id: "1", name: "Yen Ha", email: "yen@gmail.com" }
      
            if (user) {
              return user
            } else {
              return null
      
            }
          }
        })
      ]
}