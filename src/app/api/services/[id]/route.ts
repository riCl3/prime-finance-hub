import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        if (!updatedService) {
            return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedService });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 });
    }
}
