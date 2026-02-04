import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ job_id: string }> }
) {
  try {
    const { job_id } = await params;
    
    const response = await fetch(`http://127.0.0.1:8081/api/analyzer/job/${job_id}/result`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting job result:', error);
    return NextResponse.json(
      { error: 'Failed to get job result' },
      { status: 500 }
    );
  }
}