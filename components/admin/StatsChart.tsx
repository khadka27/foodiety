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
        <CartesianGrid stroke="currentColor" className="opacity-[0.06]" strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis
          stroke="#888888"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          dx={-10}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--background)',
            borderColor: 'rgba(192, 92, 49, 0.2)',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#c05c31"
          strokeWidth={3}
          dot={{ fill: '#ebc63c', stroke: '#c05c31', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#c05c31', stroke: '#ffffff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}