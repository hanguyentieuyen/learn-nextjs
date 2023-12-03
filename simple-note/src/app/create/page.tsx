'use client'
import BackButton from "@/components/BackButton"
import BlogForm from "@/components/form/BlogForm"
import { FormNote } from "@/types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SubmitHandler } from "react-hook-form"


const CreatePage = () => {
    const handleCreateNote: SubmitHandler<FormNote> = (data) => {
        createNote(data)
    }
    
    const router = useRouter()
    const {mutate: createNote, isPending: isLoadingSubmit} = useMutation({
        mutationFn: (newNote: FormNote) =>{
            return axios.post('/api/notes/create', newNote)
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
            <BackButton/>
            <h1 className="text-2xl my-4 font-bold text-center">Add new note</h1>
            <BlogForm isLoadingSubmit={isLoadingSubmit} onSubmit={handleCreateNote} isEdit={false} />
        </div>
    )
}

export default CreatePage