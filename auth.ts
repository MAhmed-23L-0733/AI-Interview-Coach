import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise, { getDatabase } from "@/lib/db";
import { loginSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        try {
          const db = await getDatabase();
          const user = await db.collection("users").findOne({
            email: email.toLowerCase(),
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password as string
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: typeof user.name === "string" ? user.name : null,
            email: typeof user.email === "string" ? user.email : "",
            image: typeof user.image === "string" ? user.image : null,
          };
        } catch (error) {
          console.error("[AUTH_CREDENTIALS_ERROR]", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});
