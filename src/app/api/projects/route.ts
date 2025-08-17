import { NextResponse } from 'next/server';
import { mockProjects } from '../../data/type/mockData';

export const dynamic = 'force-static';

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    return NextResponse.json({
      projects: mockProjects,
      total: mockProjects.length,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects', success: false },
      { status: 500 }
    );
  }
}
