'use client'
import { FormNote } from "@/types"
import { Tag } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface FormNoteProps {
    onSubmit: SubmitHandler<FormNote>
    isEdit: boolean
    initialValue?: FormNote
    isLoadingSubmit: boolean
}
const BlogForm: FC<FormNoteProps> = ({ onSubmit, isEdit, initialValue, isLoadingSubmit }) => {
    const { register, handleSubmit } = useForm<FormNote>({
        defaultValues: initialValue
    })

    // fetch tags list
    const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axios.get('/api/tags');
            return response.data
        }
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5 mt-10">
            <input {...register("title", { required: true })} type="text" placeholder="Note title" className="input input-bordered w-full max-w-lg" />
            <textarea {...register("content", { required: true })} className="textarea textarea-bordered max-w-lg w-full" placeholder="Note here..."></textarea>

            {isLoadingTags ?
                <span className="loading loading-ring loading-md"></span>
                : (
                    <select defaultValue={''} {...register("tagId", { required: true })} className="select select-bordered w-full max-w-lg">
                        <option disabled value={''}>Select tag?</option>
                        {dataTags?.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                )
            }
            <button type="submit" className="btn btn-primary max-w-lg w-full">
                {isLoadingSubmit && <span className="loading loading-ring loading-md"></span>}
                {isLoadingSubmit ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update' : 'Create')}
            </button>
        </form>
    )
}

export default BlogForm