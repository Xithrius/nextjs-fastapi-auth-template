import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";
import { sessionOptions } from "@/lib/session";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();

  res.json({ isLoggedIn: false, email: "", access_token: "", user_id: "" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
