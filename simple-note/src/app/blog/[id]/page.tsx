import BackButton from "@/components/BackButton"
import ButtonAction from "@/components/ButtonAction"
import { db } from "@/lib/db"
import { FC } from "react"

interface NoteDetailProps {
    params: {
        id: string
    }
}
const getNote = async(id: string) => {
    const response = await db.note.findFirst({
        where:{
            id: id
        },
        select: {
            id: true,
            title: true,
            content: true,
            tag: true
        }
    })
    return response
}
const NoteDetailPage: FC<NoteDetailProps> = async ({params}) => {
    const note = await getNote(params.id)
    return (
        <div>
            <BackButton/>
            <div className="mb-8">
                <h2 className="text-2xl font-bold my-4">{note?.title}</h2>
                <ButtonAction id={params.id} />
            </div>
            <div className="badge badge-primary">{note?.tag.name}</div>
            <p className="text-slate-700">{note?.content}</p>
        </div>
    )
}

export default NoteDetailPage