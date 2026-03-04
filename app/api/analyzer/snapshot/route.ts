import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/api/analyzer/snapshot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving snapshot:', error);
    return NextResponse.json(
      { error: 'Failed to save snapshot' },
      { status: 500 }
    );
  }
}