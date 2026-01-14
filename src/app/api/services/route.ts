import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const services = await Service.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const service = await Service.create(body);
        return NextResponse.json({ success: true, data: service }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 400 });
    }
}
