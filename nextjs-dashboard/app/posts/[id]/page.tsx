'use client' 

import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
    title: string,
    tags: string[],
    body: string
}
interface Params {
    id: string
}
export default function SinglePost({ params }: { params: Params }) {
    const [post, setPost] = useState<Post | null>(null)
    const fetchPost = async(id: string) => {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`);
        const {post} = await res.json();
    
        post && setPost(post);
    }

    useEffect(() => {
        fetchPost(params.id)
    }, [params.id])
    return (
        <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
            <Link href='/posts'>Back to home</Link>
            <div style={{ paddingTop: '50px' }}>
                <article>
                    <h1 style={{ paddingBottom: '10px' }}>{post?.title}</h1>
                    {post?.tags.map((tag, index) => <span style={{ fontWeight: 'lighter' }} key={index}>{tag} | </span>)}
                    <br />
                    <p style={{ paddingTop: '10px' }}>{post?.body}</p>
                </article>
            </div>
        </div>
    )
}