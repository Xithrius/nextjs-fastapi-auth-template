import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

export default function IndexPage() {
  const { mutateUser } = useUser({
    redirectTo: "/profile-sg",
    redirectIfFound: true,
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    mutateUser(
      await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    );
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg justify-center text-center">
          <h1 className={title()}>Login</h1>

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    variant="faded"
                    type="email"
                    label="Email"
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    className="my-4"
                    variant="faded"
                    type="password"
                    label="Password"
                    {...field}
                  />
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
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
