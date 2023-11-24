import useSession from "@/lib/use-session";
import { defaultSession } from "@/lib/lib";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

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

  return (
    <div className="mt-6">
      <LoginForm />
    </div>
  );
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="flex flex-col"
    >
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
          <Input
            variant="faded"
            type="password"
            label="Password"
            className="my-2"
            {...field}
          />
        )}
      />
      <Button
        type="submit"
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg justify-center items-center mx-16"
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
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center p-8">
        <h1 className={title()}>Login</h1>
        <Form />
      </section>
    </DefaultLayout>
  );
}
