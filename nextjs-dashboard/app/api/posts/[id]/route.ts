import { NextResponse } from "next/server";

export async function GET({params}) {
    const {id} = params
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {next:{revalidate: 60}})
    const post = await res.json()

    return NextResponse.json({post})
}