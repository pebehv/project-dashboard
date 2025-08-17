import { NextResponse } from 'next/server';
import { mockProjects } from '../../data/type/mockData';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, this would save to a database
    const newProject = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body
    };

    return NextResponse.json({
      project: newProject,
      success: true
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project', success: false },
      { status: 500 }
    );
  }
}