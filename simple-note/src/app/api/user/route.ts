// Create register user api
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from "bcrypt"

export async function POST(req: Response) {
    try {
        const body = await req.json()
        const { email, username, password } = body

        // check user is existed with email
        const existedUserByEmail = await db.user.findUnique({ where: { email: email } })
        if (existedUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this email already exists.' },  {status: 409})
        }

        // check user is existed with username
        const existedUserByUsername = await db.user.findUnique({ where: { username: username } })
        if (existedUserByUsername) {
            return NextResponse.json({ user: null, message: 'User with this username already exists.' },  {status: 409})
        }

        // create user
        const hashPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })

        const {password: newUserPassword, ...rest} = newUser
        return NextResponse.json({user: rest, message: "User is created successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: 'can not create user' }, {status: 500})
    }
}