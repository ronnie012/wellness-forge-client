import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.id_token) {
        session.id_token = token.id_token; // Pass the ID token to the session
      }
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      console.log("JWT Callback - token:", token);
      console.log("JWT Callback - user:", user);
      console.log("JWT Callback - account:", account);
      if (account) {
        token.id_token = account.id_token; // Store the ID token from the provider
        token.accessToken = account.access_token; // Store access token if needed
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };