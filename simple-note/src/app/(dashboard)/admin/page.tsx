import { authOptions } from "@/lib/authOptions"
import { getServerSession } from 'next-auth'
export default async function Admin() {
    const session = await getServerSession(authOptions)

    if(session?.user) {
        return <h1 className="text-2xl">Welcome {session?.user.username} to Admin</h1>
    }
    return <h1>Please login to see admin page</h1>
}