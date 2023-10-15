import axios from "axios";
import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "@/lib/session";

const getUserInfo = async (access_token: string) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  const response = await axios.get("http://localhost:8000/api/users/me", {
    headers,
  });

  const { id } = response.data;

  return id;
};

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  try {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const response = await axios.post(
      "http://localhost:8000/api/auth/jwt/login",
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;

    const user_id = await getUserInfo(access_token);

    const user = {
      isLoggedIn: true,
      email: email,
      access_token: access_token,
      user_id: user_id,
    } as User;

    req.session.user = user;

    await req.session.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
