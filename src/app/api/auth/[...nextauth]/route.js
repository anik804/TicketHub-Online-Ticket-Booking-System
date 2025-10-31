import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { dbConnect } from "../../../../libs/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const Users = dbConnect("Users");

        const user = await Users.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
          image: user.photo || "/images/placeholder-image.svg",
          provider: user.provider || "credentials",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          image: profile.picture,
          role: "user",
          provider: "google",
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          phone: profile.phone,
          image: profile.avatar_url,
          role: "user",
          provider: "github",
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      const Users = dbConnect("Users");

      if (!user?.email) {
        throw new Error("Email is required");
      }

      const existingUser = await Users.findOne({ email: user.email });

      if (existingUser) {
        const userProvider = existingUser.provider || "credentials"; // fallback
        if (account && account.provider !== userProvider) {
          throw new Error(
            `Email already registered using ${userProvider}. Please login with ${userProvider}.`
          );
        }
        return true;
      }

      // Insert new user only for social login
      if (account) {
        await Users.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          phone: user.phone,
          role: user.role || "user",
          provider: account.provider,
          createdAt: new Date(),
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.image = user.image;
        token.provider = user.provider || "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.provider = token.provider;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
