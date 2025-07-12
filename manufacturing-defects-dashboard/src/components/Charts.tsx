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
  // Debug: Log the data received
  console.log('Charts data:', data);

  if (!data || data.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="error">No data available for charts.</Typography>
          <Typography variant="body2" color="text.secondary">Please check if the data file is loaded correctly.</Typography>
        </Paper>
      </Box>
    );
  }

  // Example: Pie chart for severity
  const critical = data.filter(d => d.severity && d.severity.toLowerCase() === 'critical').length;
  const moderate = data.filter(d => d.severity && d.severity.toLowerCase() === 'moderate').length;
  const minor = data.filter(d => d.severity && d.severity.toLowerCase() === 'minor').length;
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
            I broke down the severity of defects in the titanium forgings. Critical issues (like cracks or big inclusions) usually mean a part gets rejected, moderate ones (like warping) can sometimes be fixed, and minor ones are mostly cosmetic. This helped me see where the biggest risks and costs are.
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
            I looked at which types of defects showed up most often. Structural problems (like cracks and inclusions) are the most serious, but I also tracked things like warping and surface marks. Knowing which issues pop up the most helps me focus on what really matters in the forging process.
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
            I tracked how the number of defects changed over time. This let me see if things were getting better or worse, and whether any process changes actually made a difference. It’s a great way to keep quality moving in the right direction.
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