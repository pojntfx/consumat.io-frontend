import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { SESSION_TOKEN_COOKIE_NAME } from "../../../constants/authn";

export default NextAuth({
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  cookies: {
    sessionToken: {
      name: SESSION_TOKEN_COOKIE_NAME,
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
});
