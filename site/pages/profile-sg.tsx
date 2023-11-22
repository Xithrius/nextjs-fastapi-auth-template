import DefaultLayout from "@/layouts/default";
import useSession from "@/lib/use-session";

export default function SgProfile() {
  const { session } = useSession();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-start justify-center">
          <div className="mt-8 overflow-auto">
            <pre>{JSON.stringify(session.username, null, 2)}</pre>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
