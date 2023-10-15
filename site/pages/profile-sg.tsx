import DefaultLayout from "@/layouts/default";
import useUser from "@/lib/useUser";

export default function SgProfile() {
  const { user } = useUser({
    redirectTo: "/login",
  });

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-start justify-center">
          <div className="mt-8 overflow-auto">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
