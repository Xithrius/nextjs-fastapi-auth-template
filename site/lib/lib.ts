import { SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn: boolean;
  email: string;
  access_token: string;
  user_id: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  email: "",
  access_token: "",
  user_id: "",
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "iron-examples-pages-router-api-route-swr",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};
