import React from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import Link from "next/link";

export default function SgProfile() {
  const { user } = useUser({
    redirectTo: "/login",
  });

  return (
    <Layout>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{" "}
        <Link href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
          Static Generation (SG)
        </Link>{" "}
        and the <Link href="/api/user">/api/user</Link> route (using{" "}
        <Link href="https://github.com/vercel/swr">vercel/SWR</Link>)
      </h2>
      {user && (
        <>
          <p style={{ fontStyle: "italic" }}>
            Public data, from , reduced to `login` and `avatar_url`.
          </p>

          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
}
