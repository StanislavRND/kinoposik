import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded === 'object' && decoded !== null) {
            return NextResponse.json({ authenticated: true }, { status: 200 }); 
        } else {
            throw new Error('Invalid token'); 
        }
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 }); 
    }
}