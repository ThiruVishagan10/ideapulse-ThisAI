import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ idea_id: string }> }
) {
  try {
    const { idea_id } = await params;
    
    const response = await fetch(`http://127.0.0.1:8081/api/analyzer/results/${idea_id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting analysis results:', error);
    return NextResponse.json(
      { error: 'Failed to get analysis results' },
      { status: 500 }
    );
  }
}