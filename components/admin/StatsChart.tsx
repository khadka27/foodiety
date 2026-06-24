'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface StatsChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
}

export function StatsChart({ data }: StatsChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    month: new Date(item.month).toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    }),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#D97742"
          strokeWidth={2}
          dot={{ fill: '#D97742' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}