import Link from "next/link";

import Head from "next/head";
import { Form } from "@/components/form";

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
