import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const inquiry = await Inquiry.create(body);
        return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to create inquiry' }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: inquiries });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}
