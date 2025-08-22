import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }

  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    error?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}