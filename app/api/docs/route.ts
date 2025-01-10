import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/src/utils/swagger';

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
