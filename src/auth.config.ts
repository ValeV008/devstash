import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export default {
  providers: [
    GitHub,
    Credentials({
      authorize: () => null,
    }),
  ],
} satisfies NextAuthConfig;
