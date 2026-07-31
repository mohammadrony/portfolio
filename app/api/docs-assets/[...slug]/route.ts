/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolveAssetPath } from '@/lib/docs';

interface Params {
  params: Promise<{ slug: string[] }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const asset = resolveAssetPath(slug);
  if (!asset) return new NextResponse('Not found', { status: 404 });

  const body = fs.readFileSync(asset.filePath); // nosemgrep: path-join-resolve-traversal
  return new NextResponse(body, {
    headers: {
      'Content-Type': asset.mimeType,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
