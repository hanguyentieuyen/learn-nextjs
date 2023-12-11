import Card from "@/components/Card";
import { db } from "@/lib/db";

async function getNotes() {
  //await new Promise((resolve) => setTimeout(resolve, 3000)) delay fetch data
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
export default async function ListBlog() {
  const notes = await getNotes();
  return (
    <>
      <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {notes.map((note) => (
          <Card key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
