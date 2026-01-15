import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        if (process.env.MONGODB_URI?.includes('localhost') && process.env.NODE_ENV === 'production') {
            console.warn('⚠️ WARNING: Using localhost MongoDB URI in production!');
        }
        const services = await Service.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        console.log('🔵 Service creation started at:', new Date().toISOString());

        // Step 1: Connect to database
        await dbConnect();
        console.log('✅ Database connected successfully');

        // Step 2: Parse request body
        const body = await req.json();
        console.log('📝 Request body received:', {
            title: body.title,
            category: body.category,
            type: body.type,
            hasDescription: !!body.description,
            benefitsCount: body.benefits?.length || 0,
            actualPrice: body.actualPrice,
            discountedPrice: body.discountedPrice
        });

        // Step 3: Validate required fields
        const requiredFields = ['title', 'category', 'type', 'description', 'actualPrice', 'discountedPrice'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            console.error('❌ Missing required fields:', missingFields);
            return NextResponse.json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            }, { status: 400 });
        }

        // Step 4: Create service
        console.log('💾 Creating service in database...');
        const service = await Service.create(body);
        console.log('✅ Service created successfully:', service._id);

        return NextResponse.json({ success: true, data: service }, { status: 201 });

    } catch (error) {
        console.error('❌ Service creation error:', error);

        // Detailed error logging
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }

        // Handle Mongoose validation errors specifically
        if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
            const validationError = error as { errors?: Record<string, { message: string }> };
            const errorMessages = validationError.errors
                ? Object.values(validationError.errors).map(err => err.message).join(', ')
                : 'Validation failed';

            return NextResponse.json({
                success: false,
                error: `Validation error: ${errorMessages}`
            }, { status: 400 });
        }

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            success: false,
            error: `Failed to create service: ${errorMessage}`
        }, { status: 500 });
    }
}
