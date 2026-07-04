"use client";

import { useEffect, useState } from "react";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Users, UserCheck, Shield, TrendingUp } from "lucide-react";
import apiClient from "@/lib/api-client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StatsChart } from "@/components/admin/StatsChart";
import { RecentActivity } from "@/components/admin/RecentActivity";

interface DashboardStats {
 overview: {
 totalUsers: number;
 activeUsers: number;
 adminUsers: number;
 recentUsers: number;
 };
 userGrowth: Array<{
 month: string;
 count: number;
 }>;
 recentActivity: Array<{
 id: string;
 action: string;
 resource: string;
 createdAt: string;
 user: {
 name: string;
 email: string;
 };
 }>;
}

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

export default function AdminDashboard() {
 const [stats, setStats] = useState<DashboardStats | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState("");

 useEffect(() => {
 fetchStats();
 }, []);

 const fetchStats = async () => {
 try {
 setIsLoading(true);
 const response = await apiClient.get("/admin/stats");
 setStats(response.data.data);
 } catch (error: any) {
 setError(error.message || "Failed to fetch dashboard stats");
 } finally {
 setIsLoading(false);
 }
 };

 if (isLoading) {
 return (
 <div className="flex items-center justify-center h-64">
 <LoadingSpinner />
 </div>
 );
 }

 if (error) {
 return (
 <Alert variant="destructive">
 <AlertDescription>{error}</AlertDescription>
 </Alert>
 );
 }

 if (!stats) {
 return null;
 }

 const { overview, userGrowth, recentActivity } = stats;

 return (
 <div className="space-y-8 relative pb-12">
 {/* Ambient background decoration */}
 <div className="absolute -top-10 left-1/3 w-[350px] h-[350px] rounded-full bg-[#c05c31]/5 blur-[120px] pointer-events-none" />
 <div className="absolute bottom-20 right-10 w-[350px] h-[350px] rounded-full bg-[#ebc63c]/5 blur-[120px] pointer-events-none" />

 {/* Header section */}
 <div className="relative z-10 space-y-2">
 <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c05c31]/15 text-[#c05c31] dark:text-[#ebc63c] text-[10px] font-bold uppercase tracking-widest border border-[#c05c31]/20 shadow-sm">
 <TrendingUp className="h-3 w-3" />
 <span>System Administration Hub</span>
 </div>
 <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight text-stone-900 dark:text-white">
 Overview Dashboard
 </h2>
 <p className="text-muted-foreground text-sm max-w-xl font-light">
 Manage system actions, review active users growth, and monitor operations across all listing hubs.
 </p>
 </div>

 {/* Stats Cards */}
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
 {[
 {
 title: "Total Users",
 value: overview.totalUsers,
 icon: Users,
 desc: "All registered users",
 color: "text-blue-500",
 bg: "/10 ",
 },
 {
 title: "Active Users",
 value: overview.activeUsers,
 icon: UserCheck,
 desc: "Currently active accounts",
 color: "text-emerald-500",
 bg: "/10 ",
 },
 {
 title: "Admin Users",
 value: overview.adminUsers,
 icon: Shield,
 desc: "Users with admin access",
 color: "text-amber-500",
 bg: "/10 ",
 },
 {
 title: "New Users (30d)",
 value: overview.recentUsers,
 icon: TrendingUp,
 desc: "Registered in last 30 days",
 color: "text-[#c05c31]",
 bg: "from-[#c05c31]/10 ",
 },
 ].map((card, idx) => {
 const CardIcon = card.icon;
 return (
 <Card key={idx} className="glass rounded-3xl border border-stone-200/50 dark:border-stone-800/50 hover:border-[#c05c31]/30 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden relative group">
 <div className="p-6 space-y-4">
 <div className="flex items-center justify-between space-y-0">
 <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{card.title}</span>
 <div className={`p-2.5 rounded-xl ${card.bg} border border-[#c05c31]/10 text-[#c05c31] dark:text-[#ebc63c]`}>
 <CardIcon className="h-4 w-4" />
 </div>
 </div>
 <div className="space-y-1">
 <div className="text-3xl font-black font-outfit text-stone-900 dark:text-white group-hover:text-[#c05c31] dark:group-hover:text-[#ebc63c] transition-colors">{card.value}</div>
 <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
 {card.desc}
 </p>
 </div>
 </div>
 </Card>
 );
 })}
 </div>

 {/* Charts and Activity */}
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 relative z-10">
 <Card className="col-span-4 glass rounded-3xl border border-stone-200/50 dark:border-stone-800/50 shadow-lg p-2">
 <CardHeader className="pb-4">
 <CardTitle className="text-lg font-bold font-outfit text-stone-900 dark:text-white">User Growth</CardTitle>
 <CardDescription className="text-xs text-muted-foreground">
 Monthly user registration trend over the last 12 months
 </CardDescription>
 </CardHeader>
 <CardContent className="pl-2">
 <StatsChart data={userGrowth} />
 </CardContent>
 </Card>

 <Card className="col-span-3 glass rounded-3xl border border-stone-200/50 dark:border-stone-800/50 shadow-lg p-2">
 <CardHeader className="pb-4">
 <CardTitle className="text-lg font-bold font-outfit text-stone-900 dark:text-white">Recent Activity</CardTitle>
 <CardDescription className="text-xs text-muted-foreground">
 Latest user actions and system events
 </CardDescription>
 </CardHeader>
 <CardContent>
 <RecentActivity activities={recentActivity} />
 </CardContent>
 </Card>
 </div>
 </div>
 );
}
