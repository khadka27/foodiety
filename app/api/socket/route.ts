import { NextRequest } from 'next/server';
import { NextApiResponseServerIO } from '@/lib/socket';
import { initializeSocket } from '@/lib/socket';

export async function GET(req: NextRequest) {
  const res = req as any as NextApiResponseServerIO;
  
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO server...');
    initializeSocket(res.socket.server);
  }
  
  return new Response('Socket.IO server initialized', { status: 200 });
}