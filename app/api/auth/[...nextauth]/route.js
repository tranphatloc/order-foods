import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise, { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrpyt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";
import { use } from "react";
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await mongoose.connect(process.env.MONGO_URL);
          // await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrpyt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
          // return { ...user._doc, id: user._id };
        } catch (error) {
          console.log("Error:", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("jwt callback:", { token, user, session });
      if (trigger === "update" && session?.name && session?.image) {
        token.name = session.name;
        token.picture = session.image;
      }
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log("session callback:", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          image: token.picture,
        },
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  page: {
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
