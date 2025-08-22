import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface NotificationData {
  id: string;
  type: string;
  title: string;
  message: string;
  userId: string;
  data?: any;
  createdAt: Date;
}

export function initializeSocket(server: NetServer) {
  if (!server.io) {
    console.log('Initializing Socket.IO server...');
    
    const io = new ServerIO(server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Join user-specific room
      socket.on('join-user-room', (userId: string) => {
        socket.join(`user-${userId}`);
        console.log(`User ${userId} joined their room`);
      });

      // Handle real-time notifications
      socket.on('send-notification', (data: NotificationData) => {
        io.to(`user-${data.userId}`).emit('notification', data);
      });

      // Handle recipe/restaurant updates
      socket.on('content-updated', (data: { type: string; id: string; action: string }) => {
        socket.broadcast.emit('content-update', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    server.io = io;
  }
  
  return server.io;
}