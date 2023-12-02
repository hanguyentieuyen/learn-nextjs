'use client'

import {useSession} from 'next-auth/react'

export default function User() {
    const {data: session} = useSession() 
    return <pre>Get session from client component: {JSON.stringify(session)}</pre>
}