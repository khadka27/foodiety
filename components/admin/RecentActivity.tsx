'use client';

import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Activity {
  id: string;
  action: string;
  resource: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN':
        return 'text-green-600';
      case 'SIGNUP':
        return 'text-blue-600';
      case 'PASSWORD_RESET':
        return 'text-yellow-600';
      case 'DELETE':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActionDescription = (action: string, resource: string) => {
    switch (action) {
      case 'LOGIN':
        return 'signed in';
      case 'SIGNUP':
        return 'created account';
      case 'PASSWORD_RESET':
        return 'reset password';
      case 'PASSWORD_RESET_REQUEST':
        return 'requested password reset';
      default:
        return `${action.toLowerCase()} ${resource.toLowerCase()}`;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {activity.user.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name || 'Unknown User'}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className={getActionColor(activity.action)}>
                {getActionDescription(activity.action, activity.resource)}
              </span>
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}