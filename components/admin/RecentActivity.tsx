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
  const getActionBadgeStyle = (action: string) => {
    switch (action) {
      case 'LOGIN':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'SIGNUP':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'PASSWORD_RESET':
      case 'PASSWORD_RESET_REQUEST':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'DELETE':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-500/20';
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
    <div className="space-y-3">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-2xl border border-stone-200/50 dark:border-stone-800/40 bg-white/40 dark:bg-stone-900/40 hover:bg-[#c05c31]/5 transition-all duration-300">
          <Avatar className="h-9 w-9 border border-[#c05c31]/10">
            <AvatarFallback className="bg-[#c05c31]/10 text-[#c05c31] dark:bg-[#c05c31]/25 dark:text-[#ebc63c] font-bold text-xs">
              {activity.user.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
              {activity.user.name || 'Unknown User'}
            </p>
            <div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase border ${getActionBadgeStyle(activity.action)}`}>
                {getActionDescription(activity.action, activity.resource)}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">
            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}