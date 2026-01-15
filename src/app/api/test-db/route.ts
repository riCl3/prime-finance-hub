import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

export async function GET() {
    try {
        const diagnostics: Record<string, unknown> = {
            timestamp: new Date().toISOString(),
            nodeEnv: process.env.NODE_ENV,
            mongooseVersion: mongoose.version,
        };

        // Check if MONGODB_URI is present (without exposing it)
        if (!process.env.MONGODB_URI) {
            return NextResponse.json({
                success: false,
                error: 'MONGODB_URI environment variable is not set',
                diagnostics
            }, { status: 500 });
        }

        diagnostics.mongoUriPresent = true;
        diagnostics.mongoUriPrefix = process.env.MONGODB_URI.substring(0, 10) + '...';

        // Test database connection
        const startTime = Date.now();
        await dbConnect();
        const connectionTime = Date.now() - startTime;

        diagnostics.connectionStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        diagnostics.connectionTimeMs = connectionTime;
        diagnostics.databaseName = mongoose.connection.name;

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            diagnostics
        });

    } catch (error) {
        console.error('Database diagnostic error:', error);

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown database error',
            errorType: error instanceof Error ? error.constructor.name : typeof error,
            diagnostics: {
                timestamp: new Date().toISOString(),
                nodeEnv: process.env.NODE_ENV,
                mongoUriPresent: !!process.env.MONGODB_URI,
            }
        }, { status: 500 });
    }
}
