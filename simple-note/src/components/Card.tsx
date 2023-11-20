import { Tag } from "@prisma/client"
import Link from "next/link"
import { FC } from "react"

interface NoteProps {
    note: {
        id: string,
        title: string,
        content: string,
        tag: Tag,
    }
}
const Card: FC<NoteProps> = ({note}) => {
    const {id, title, content, tag} = note
    return (
        <div className="card w-full bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content.slice(0, 20)}</p>
                <div className="badge badge-primary">{tag.name}</div>
                <div className="card-actions justify-end">
                    <Link href={`/blog/${id}`} className="hover:underline">Read more...</Link>
                </div>
            </div>
        </div>
    )
}

export default Card