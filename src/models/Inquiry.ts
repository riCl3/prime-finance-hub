import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email: string;
    phone: string;
    serviceId?: string;
    serviceName?: string;
    message: string;
    status: 'pending' | 'contacted' | 'closed';
    createdAt: Date;
}

const InquirySchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceId: { type: String },
    serviceName: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'contacted', 'closed'], default: 'pending' }
}, { timestamps: true });

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
