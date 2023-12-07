import { authOptions } from "@/lib/authOptions"
import { getServerSession } from 'next-auth'
import StepperForm from "./StepperForm"
import { Container } from "@mui/material"

export default async function Admin() {
    const session = await getServerSession(authOptions)
    
    if(session?.user) {
        return (
            <Container maxWidth='md'>
                <StepperForm/>
            </Container>
        )
    }
    return <h1>Please login to see admin page</h1>
}