import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.AI_API_URL || 'https://127.0.0.1:8081';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ideas`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_BASE_URL}/api/ideas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: 'Failed to create idea' },
        { status: response.status >= 500 ? 503 : 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}