'use client'

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC } from "react"

interface ButtonActionProps {
    id: string
}
const BlogActionBtn: FC<ButtonActionProps> = ({id}) => {
    const router = useRouter()
    const {mutate: deleteNote, isPending} = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/notes/${id}`)
        },
        onError: (error) => {
            console.error(error)
        },
        onSuccess: () => {
            router.push('/')
            router.refresh()
        }
    })

    return (
        <div>
            <Link href={`/edit/${id}`} className="btn mr-2">
                <Pencil />Edit
            </Link>
            <button className="btn btn-error" onClick={() => deleteNote()}>
                {isPending && <span className="loading loading-spinner loading-md"></span>}
                {isPending ? ('Loading...') : (
                    <><Trash2 />Delete</>
                )}
                
            </button>
        </div>
    )
}

export default BlogActionBtn