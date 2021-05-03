import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  CONSUMATIO_NAMESPACE_HEADER,
  CONSUMATIO_SECRET_HEADER,
} from "../../../constants/authn";

const proxy = createProxyMiddleware({
  target: process.env.BACKEND_API_URL,
  changeOrigin: true,
  pathRewrite: { [`^${process.env.PROXIED_API_URL}`]: "" },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Authorize
  const session = await getSession({ req });

  // If authorized, add headers & proxy the request
  if (session) {
    req.headers[CONSUMATIO_NAMESPACE_HEADER] = session.user?.email;
    req.headers[CONSUMATIO_SECRET_HEADER] = process.env.BACKEND_SECRET;

    return (proxy as Function)(req, res);
  }

  // If unauthorized, return 401
  return res.status(401).end();
};

export const config = { api: { externalResolver: true, bodyParser: false } };
