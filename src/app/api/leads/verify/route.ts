import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { leadId, otp } = body;

        if (!leadId || !otp) {
            return NextResponse.json({ error: 'Lead ID and OTP are required' }, { status: 400 });
        }

        // Find lead with matching ID and OTP, and check expiry
        // Note: OTP is usually hashed in real apps.
        const lead = await Lead.findOne({
            _id: leadId,
            otp: otp,
            otpExpires: { $gt: new Date() }
        });

        if (!lead) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }

        // Mark as verified
        lead.verified = true;
        lead.otp = undefined; // Clear OTP
        lead.otpExpires = undefined;
        await lead.save();

        return NextResponse.json({ message: 'Phone verified successfully', success: true });

    } catch (error) {
        console.error('Verify error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
