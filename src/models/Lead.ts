import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        maxlength: [20, 'Phone number cannot be more than 20 characters'],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        select: false, // Don't return OTP in queries by default
    },
    otpExpires: {
        type: Date,
    },
    source: {
        type: String,
        default: 'General',
    },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
