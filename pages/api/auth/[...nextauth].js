import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserData from "@/models/users";
import bcrypt from "bcrypt";
import connectToDatabase from "@/database/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await connectToDatabase();

        const { email, password } = credentials;
        const user = await UserData.findOne({ email });
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const passMatched = await bcrypt.compare(
          password.toString(),
          user.password
        );

        if (!passMatched) {
          throw new Error("Invalid Email or Password");
        }
        return user;
      },
    }),
    ],
    pages: {
      signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
});
