import { NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/docs';

// Cache the index at module level so it's built once per server process
let cached: ReturnType<typeof buildSearchIndex> | null = null;

export async function GET() {
  if (!cached) {
    cached = buildSearchIndex();
  }
  return NextResponse.json(cached, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
