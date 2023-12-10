import { getServerSession } from "next-auth";
import ListBlog from "./blog/ListBlog/page";
import { authOptions } from "@/lib/authOptions";
import User from "@/components/User";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {/* get session from server component faster then client component */}
      <section>
        <User />
        <p>Get session from server component: {JSON.stringify(session)}</p>
      </section>
      <Suspense fallback="Loading...">
        <ListBlog />
      </Suspense>
    </>
  );
}
