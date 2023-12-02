import Card from "@/components/Card";
import User from "@/components/User";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

async function getNotes() {
  const response = await db.note.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response;
}
export default async function Home() {
  const session = await getServerSession(authOptions)
  const notes = await getNotes();
  return (
    <>
    {/* get session from server component faster then client component */}
      <section>
        <User />
        <p>Get session from server component: {JSON.stringify(session)}</p>
      </section>
      <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {notes.map((note) => (
          <Card key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
