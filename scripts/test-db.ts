
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB Connection...');
console.log('URI present:', !!MONGODB_URI);

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function testConnection() {
    try {
        console.log('Attempting to connect...');
        // Set a short timeout for the test
        await mongoose.connect(MONGODB_URI!, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Successfully connected to MongoDB Atlas!');
        console.log('Connection State:', mongoose.connection.readyState);
        await mongoose.connection.close();
        console.log('Connection closed.');
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Failed to connect to MongoDB:');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.cause) console.error('Cause:', error.cause);

        if (error.message.includes('querySrv ENOTFOUND')) {
            console.error('\n--- TROUBLESHOOTING TIP ---');
            console.error('querySrv ENOTFOUND usually means the DNS lookup failed.');
            console.error('1. Check if your connection string starts with "mongodb+srv://"');
            console.error('2. Ensure your network allows DNS queries to MongoDB Atlas.');
            console.error('3. Try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1).');
        }
        process.exit(1);
    }
}

testConnection();
