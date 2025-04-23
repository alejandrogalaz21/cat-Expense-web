import { FC } from 'react';
import { ExpenseItem } from '@types';
import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

type ChartType = 'bar' | 'pie';

/**
 * Props for the ExpenseChart component
 */
interface ExpenseChartProps {
  items: ExpenseItem[];
  topCategories: string[];
  chartType: ChartType;
}

/**
 * Renders a chart (bar or pie) showing total expenses per category
 * Highlights the top spending categories in green
 */
export const ExpenseChart: FC<ExpenseChartProps> = ({
  items,
  topCategories,
  chartType,
}) => {
  // Group items by category and sum the total amount
  const data = Object.entries(
    items.reduce<Record<string, number>>((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {})
  ).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  const getColor = (category: string) =>
    topCategories.includes(category) ? '#4caf50' : '#2196f3';

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Expense by Category ({chartType === 'bar' ? 'Bar Chart' : 'Pie Chart'})
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'bar' ? (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((entry) => (
                <Cell
                  key={`bar-${entry.name}`}
                  fill={getColor(entry.name)}
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry) => (
                <Cell
                  key={`pie-${entry.name}`}
                  fill={getColor(entry.name)}
                />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
};
