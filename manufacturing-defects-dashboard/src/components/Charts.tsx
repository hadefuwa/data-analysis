import * as React from 'react';
import { Box, Paper, Typography, Divider, Stack } from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';

interface DefectData {
  defect_id: string;
  product_id: string;
  defect_type: string;
  defect_description: string;
  defect_date: string;
  defect_location: string;
  severity: string;
  inspection_method: string;
  repair_action: string;
  repair_cost: string;
}

export default function Charts({ data }: { data: DefectData[] }) {
  // Example: Pie chart for severity
  const critical = data.filter(d => d.severity === 'critical').length;
  const moderate = data.filter(d => d.severity === 'moderate').length;
  const minor = data.filter(d => d.severity === 'minor').length;
  const pieData = [
    { id: 0, value: critical, label: 'Critical', color: '#d32f2f' },
    { id: 1, value: moderate, label: 'Moderate', color: '#fbc02d' },
    { id: 2, value: minor, label: 'Minor', color: '#388e3c' },
  ];

  // Example: Bar chart for defect types
  const defectTypeCounts = data.reduce((acc, item) => {
    acc[item.defect_type] = (acc[item.defect_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const barLabels = Object.keys(defectTypeCounts);
  const barValues = Object.values(defectTypeCounts);

  // Example: Line chart for defects over time
  const dateCounts = data.reduce((acc, item) => {
    acc[item.defect_date] = (acc[item.defect_date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedDates = Object.keys(dateCounts).sort();
  const lineLabels = sortedDates;
  const lineValues = sortedDates.map(date => dateCounts[date]);

  return (
    <Box sx={{ mt: 4 }}>
      <Stack spacing={4}>
        {/* Severity Breakdown Pie Chart */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Severity Breakdown</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This pie chart displays the distribution of defect severities across our manufacturing facility's quality control system. Critical defects require immediate attention and may halt production, moderate defects need prompt repair, and minor defects are cosmetic issues. Understanding this distribution helps prioritize quality control resources and identify areas needing process improvements.
          </Typography>
          <PieChart
            series={[{
              data: pieData,
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 4,
              cornerRadius: 4,
              startAngle: 0,
              endAngle: 360,
            }]}
            width={320}
            height={220}
          />
        </Paper>

        {/* Top Defect Types Bar Chart */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Top Defect Types</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This bar chart shows the most frequently occurring defect types in our production line. Structural defects affect product integrity, functional defects impact performance, and cosmetic defects affect appearance. By focusing on the top categories, we can target process improvements where they will have the greatest impact on quality and cost.
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: barLabels }]}
            series={[{ data: barValues, color: '#1976d2' }]}
            width={400}
            height={220}
          />
        </Paper>

        {/* Defects Over Time Line Chart */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Defects Over Time</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This line chart shows the trend of total defects reported over time in our manufacturing facility. It helps us spot increases or decreases in quality issues, identify seasonal patterns, and monitor the effectiveness of process improvements. This data is crucial for maintaining consistent product quality across our production line.
          </Typography>
          <LineChart
            xAxis={[{ scaleType: 'point', data: lineLabels }]}
            series={[{ data: lineValues, color: '#388e3c' }]}
            width={500}
            height={220}
          />
        </Paper>
      </Stack>
    </Box>
  );
} 