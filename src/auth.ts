import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      first_name: string;
      email: string;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session({ token }: { token: any }) {
      // Include user data in the session object
      return {
        ...token?.user.data,
      };
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async redirect({ url }) {
      return url;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch("http://fioralux-api.test/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && data) {
          return data;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in", // Specify your custom sign-in page here
  },
});
