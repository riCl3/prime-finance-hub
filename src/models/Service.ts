import mongoose, { Schema, Document, Model } from 'mongoose';

// The two main sections the user requested
export enum MainCategory {
    Loans = 'Loans',
    LifeInsurance = 'Life Insurance'
}

// Sub-types can still exist for display labels, but the main grouping is by Category
export enum ServiceType {
    PersonalLoan = 'Personal Loan',
    BusinessLoan = 'Business Loan',
    InstantLoan = 'Instant Loan',
    LifeInsurance = 'Life Insurance',
    HealthInsurance = 'Health Insurance',
    MutualFund = 'Mutual Fund',
    GeneralInsurance = 'General Insurance',
    CibilRecover = 'Cibil Recover'
}

export interface IService extends Document {
    title: string;
    category: MainCategory;
    type: ServiceType; // Kept for icon mapping and specific labeling
    description: string;
    benefits: string[];
    actualPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum: Object.values(MainCategory), required: true },
    type: { type: String, enum: Object.values(ServiceType), required: true },
    description: { type: String, required: true },
    benefits: { type: [String], default: [] },
    actualPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true }, // Calculated on save/front-end
}, { timestamps: true });

// Prevent recompilation of model in dev mode
const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
