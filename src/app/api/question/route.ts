import { NextResponse } from "next/server"

export async function GET() {
    try {
        const resp = await fetch("https://opentdb.com/api.php?amount=2")
        const data = await resp.json()
        return NextResponse.json({error: null, data: data})
    } catch (err) {
        return NextResponse.json({error: err, data: null})
    }
}