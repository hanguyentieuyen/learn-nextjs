'use client'
import BackButton from "@/components/BackButton"
import BlogForm from "@/components/form/BlogForm"
import { FormNote } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { SubmitHandler } from "react-hook-form"

interface EditPageProps {
    params: {
        id: string
    }
}
const EditPage: FC<EditPageProps> = ({params}) => {
    const {id} = params
    const router = useRouter()

    const {data: dataNote, isLoading: isLoadingNote} = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const response = await axios.get(`/api/notes/${id}`)
            return response.data
        }
    })

    const {mutate: updateNote, isPending: isLoadingSubmit} = useMutation({
        mutationFn: (newNote: FormNote) =>{
            return axios.patch(`/api/notes/${id}`, newNote)
        },
        onError: (error) => {
            console.error(error)
        },
        onSuccess: () => {
            router.push('/')
            router.refresh()
        }
    })
    const handleEditNote: SubmitHandler<FormNote> = (data) => {
        updateNote(data)
    }
    
    if(isLoadingNote) {
        return (
            <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
    return (
        <div>
            <BackButton/>
            <h1 className="text-2xl my-4 font-bold text-center">Edit note</h1>
            <BlogForm isLoadingSubmit={isLoadingSubmit} onSubmit={handleEditNote} initialValue={dataNote} isEdit={true} />
        </div>
    )
}

export default EditPage