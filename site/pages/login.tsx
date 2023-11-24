import Link from "next/link";

import Head from "next/head";
import useSession from "@/lib/use-session";
import { defaultSession } from "@/lib/lib";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export function Form() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p className="text-lg">Loading...</p>;
  }

  if (session.isLoggedIn) {
    return (
      <>
        <p className="text-lg">
          Logged in user: <strong>{session.email}</strong>
        </p>
        <LogoutButton />
      </>
    );
  }

  return <LoginForm />;
}



function LoginForm() {
  const { login } = useSession();

  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const { email, password } = data;

    const response = await login({ email: email, password: password });

    if (response.access_token === undefined) {
      toast.error("Login credentials failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input variant="faded" type="email" label="Email" {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input variant="faded" type="password" label="Password" {...field} />
        )}
      />
      <Button
        type="submit"
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Login
      </Button>
    </form>
  );
}

function LogoutButton() {
  const { logout } = useSession();

  return (
    <p>
      <a
        onClick={(event) => {
          event.preventDefault();
          logout(null, {
            optimisticData: defaultSession,
          });
        }}
      >
        Logout
      </a>
    </p>
  );
}

export default function AppRouterSWR() {
  return (
    <main className="p-10 space-y-5">
      <Head>
        <title>
          🛠 iron-session examples: Pages Router, API routes, and SWR
        </title>
      </Head>

      <p className="italic max-w-xl">
        <u>How to test</u>: Login and refresh the page to see iron-session in
        action. Bonus: open multiple tabs to see the state being reflected by
        SWR automatically.
      </p>

      <div className="grid grid-cols-1 gap-4 p-10 border border-slate-500 rounded-md max-w-xl">
        <Form />
        <div className="space-y-2">
          <hr />
          <p>
            The following pages are protected and will redirect back here if
            you&apos;re not logged in:
          </p>
          {/* convert the following paragraphs into a ul li */}
          <ul className="list-disc list-inside">
            <li>
              <Link href="/pages-router-api-route-swr/protected-client">
                Protected page via client call →
              </Link>
            </li>
            <li>
              <Link href="/pages-router-api-route-swr/protected-server">
                Protected page via getServerSideProps →
              </Link>{" "}
            </li>
            <li>
              <Link href="/pages-router-api-route-swr/protected-middleware">
                Protected page via middleware →
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
