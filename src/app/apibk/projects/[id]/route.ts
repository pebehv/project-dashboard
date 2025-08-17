import { NextResponse } from 'next/server';
import { mockDetailedProjects } from '../../../data/type/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    // In a real application, this would fetch from a database
    const project = mockDetailedProjects.find(p => p.id === projectId);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      project,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project details', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    const body = await request.json();
    
    // In a real application, this would update the database
    const updatedProject = {
      id: projectId,
      updatedAt: new Date().toISOString(),
      ...body
    };

    return NextResponse.json({
      project: updatedProject,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    // In a real application, this would delete from the database
    return NextResponse.json({
      message: `Project ${projectId} deleted successfully`,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project', success: false },
      { status: 500 }
    );
  }
}