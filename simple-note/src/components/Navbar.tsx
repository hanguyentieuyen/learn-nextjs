import { authOptions } from "@/lib/authOptions"
import getServerSession from "next-auth"
import { BookOpenText } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className="navbar bg-neutral-100">
            <div className="container">
                <div className="flex-1">
                    <Link href='/'><BookOpenText color="red"/></Link>
                </div>
                <div className="flex-none">
                    <Link href='/create' className="btn btn-ghost">Create post</Link>
                    {session?.user ? (
                        <Button variant='destructive'>Sign Out</Button>
                    ) : (
                        <Link href='/login' className="btn btn-ghost">Sign In</Link>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Navbar