"use client";

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  GithubIcon,
} from "@/components/icons";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import { Head } from "@/layouts/head";
import { useState } from "react";
import useSession from "@/lib/use-session";
import Router from "next/router";
import axios from "axios";

const ThemeSwitcherAndGithub = () => (
  <div className="absolute right-8 top-8">
    <Link
      isExternal
      href={siteConfig.links.github}
      aria-label="Github"
      className="mr-2"
    >
      <GithubIcon className="text-default-500" />
    </Link>
    <ThemeSwitch />
  </div>
);

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen flex-col">
      <Head />
      <main className="container mx-auto flex-grow px-6">{children}</main>
    </div>
  );
};

const Register = () => {
  const { login } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const passwordInput = (
    <Input
      label="Password"
      variant="bordered"
      value={password}
      onValueChange={setPassword}
      isRequired
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isPasswordVisible ? (
            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      type={isPasswordVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );

  const emailInput = (
    <Input
      label="Email"
      variant="bordered"
      value={email}
      onValueChange={setEmail}
      isRequired
      className="max-w-xs"
    />
  );

  const createUser = async () => {
    const response = await axios.post("/api/register", {
      email: email,
      password: password,
    });

    if (response.status !== 201) {
      toast.error("Email is already taken");

      return;
    }

    const loginResponse = await login({ email: email, password: password });

    if (loginResponse.access_token) {
      Router.push("/");
      toast.success("Signed up!");
    } else {
      toast.error("Failed to register");
    }
  };

  const RegisterButton = () => (
    <Button
      radius="full"
      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      isDisabled={!email || !password}
      onClick={createUser}
    >
      Register
    </Button>
  );

  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-6">
      {emailInput}
      {passwordInput}
      <RegisterButton />
    </div>
  );
};

export default function RegisterPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center p-8 md:py-10">
        <Register />
        <ThemeSwitcherAndGithub />
      </section>
    </DefaultLayout>
  );
}
