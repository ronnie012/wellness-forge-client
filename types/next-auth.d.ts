import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    id_token?: string; // Add id_token property to Session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    id_token?: string; // Add id_token property to JWT
  }
}
