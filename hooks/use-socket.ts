import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export function useSocket() {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    // Initialize socket connection
    socketRef.current = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', {
      path: '/api/socket',
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to socket server');
      // Join user-specific room
      socket.emit('join-user-room', session.user.id);
    });

    socket.on('notification', (data) => {
      // Show toast notification
      toast.success(data.message, {
        duration: 5000,
        position: 'top-right',
      });
    });

    socket.on('content-update', (data) => {
      // Handle real-time content updates
      console.log('Content updated:', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [session?.user?.id]);

  const sendNotification = (notification: any) => {
    if (socketRef.current) {
      socketRef.current.emit('send-notification', notification);
    }
  };

  const notifyContentUpdate = (data: { type: string; id: string; action: string }) => {
    if (socketRef.current) {
      socketRef.current.emit('content-updated', data);
    }
  };

  return {
    socket: socketRef.current,
    sendNotification,
    notifyContentUpdate,
  };
}