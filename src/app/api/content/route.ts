import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public/data/content.json');

// Define types
// Define types
interface ContentData {
    hero: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    featuredPost: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    stats: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    contactInfo: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Helper to read data
function getContentData(): ContentData | null {
    if (!fs.existsSync(dataFilePath)) {
        return null;
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
}

// GET handler
export async function GET() {
    try {
        const data = getContentData();
        if (!data) {
            return NextResponse.json({ error: 'Content data not found' }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch (_) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

// POST handler
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate basics (optional refinement here)
        if (!body.hero || !body.stats) {
            return NextResponse.json({ error: 'Invalid content data structure' }, { status: 400 });
        }

        fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
        return NextResponse.json({ message: 'Content updated successfully', data: body });
    } catch (error) {
        console.error("Error updating content:", error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
