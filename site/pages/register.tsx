"use client";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import useSession from "@/lib/use-session";
import Router from "next/router";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

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
      className="max-w-xs my-2"
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
    <div className="mt-6 flex flex-col items-center justify-center">
      {emailInput}
      {passwordInput}
      <RegisterButton />
    </div>
  );
};

export default function RegisterPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center p-8">
        <h1 className={title()}>Register</h1>
        <Register />
      </section>
    </DefaultLayout>
  );
}
