import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { email, password } = request.body;

  const res = await axios.post(`http://localhost:8000/api/auth/register`, {
    email: email,
    password: password,
  });

  if (res.status !== 201) {
    response.status(res.status).json({ error: res.statusText });
  } else {
    response.status(201).json(res.data);
  }
}
