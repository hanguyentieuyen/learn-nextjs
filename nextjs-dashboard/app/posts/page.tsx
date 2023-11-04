import Link from "next/link";

export default async function PostsPage() {
    const res = await fetch(`${process.env.localhost}/api/posts`);
    const { posts } = await res.json();
  
    return (
      <div>
        <h1>All Blog Posts</h1>
        <hr style={{ width: '220px' }} />
        <div style={{ paddingTop: '40px' }}>
          {posts.map((post: any) => (
            <article key={post.id}>
              <Link href={`posts/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p style={{ paddingBottom: '30px'}}>{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }