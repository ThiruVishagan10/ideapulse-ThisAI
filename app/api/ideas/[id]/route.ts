import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const response = await fetch(`${API_URL}/ideas/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Idea not found' },
          { status: 404 }
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching idea:', error);
    return NextResponse.json(
      { error: 'Failed to fetch idea' },
      { status: 500 }
    );
  }
}