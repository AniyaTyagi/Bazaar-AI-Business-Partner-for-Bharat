import { NextResponse } from 'next/server';
import { AgentOrchestrator } from '@/agents/orchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, forcedAgent } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid prompt string parameter' }, { status: 400 });
    }

    const response = await AgentOrchestrator.processQuery(prompt, forcedAgent);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to execute agent request', message: error.message },
      { status: 500 }
    );
  }
}
