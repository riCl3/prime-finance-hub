import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import twilio from 'twilio';

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { name, phone, source } = body;

        // Basic validation
        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Check if lead exists (by phone) to update or create new
        let lead = await Lead.findOne({ phone });

        if (lead) {
            // Update existing lead with new OTP
            lead.name = name;
            lead.otp = otp;
            lead.otpExpires = otpExpires;
            lead.verified = false;
            await lead.save();
        } else {
            // Create new lead
            lead = await Lead.create({
                name,
                phone,
                otp,
                otpExpires,
                source: source || 'Website',
                verified: false
            });
        }

        // Send OTP via Twilio
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

        if (accountSid && authToken && twilioPhoneNumber) {
            const client = twilio(accountSid, authToken);
            try {
                await client.messages.create({
                    body: `Your Prime Finance Hub verification code is: ${otp}`,
                    from: twilioPhoneNumber,
                    to: phone
                });
                console.log(`[Twilio] OTP sent to ${phone}`);
            } catch (twilioError: any) {
                console.error('Twilio Error:', twilioError);
                return NextResponse.json({ error: 'Failed to send SMS. Please check your number or try again.' }, { status: 500 });
            }
        } else {
            console.warn('[Twilio] Credentials missing in .env.local. OTP not sent via SMS.');
            // Fallback for dev mode
            if (process.env.NODE_ENV === 'development') {
                console.log(`[OTP-SIMULATION] User asked for real backend, but credentials missing. OTP: ${otp}`);
            }
        }

        return NextResponse.json({
            message: 'OTP Sent successfully',
            leadId: lead._id
        });

    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();
    try {
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
