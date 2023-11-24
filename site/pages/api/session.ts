import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "@/lib/lib";
import axios from "axios";

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

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );

  if (request.method === "POST") {
    const { email, password } = request.body;

    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/jwt/login",
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = res.data;

      const user_id = await getUserInfo(access_token);

      session.isLoggedIn = true;
      session.email = email;
      session.user_id = user_id;
      session.access_token = access_token;

      await session.save();

      return response.json(session);
    } catch (error) {
      return response.status(400).json({ message: "Bad credentials" });
    }
  } else if (request.method === "GET") {
    if (session.isLoggedIn !== true) {
      return response.json(defaultSession);
    }

    return response.json(session);
  } else if (request.method === "DELETE") {
    session.destroy();

    return response.json(defaultSession);
  }

  return response.status(405).end(`Method ${request.method} Not Allowed`);
}
