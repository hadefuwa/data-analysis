import * as React from 'react';
import { Card, CardContent, Typography, Paper, Divider, Box, Chip, Stack, Avatar, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import { PieChart, LineChart } from '@mui/x-charts';

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

export default function Analysis({ data }: { data: DefectData[] }) {
  // Calculate stats
  const totalDefects = data.length;
  const totalCost = data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0);
  const avgCost = totalDefects ? totalCost / totalDefects : 0;
  const criticalCount = data.filter(item => item.severity && item.severity.toLowerCase() === 'critical').length;
  const moderateCount = data.filter(item => item.severity && item.severity.toLowerCase() === 'moderate').length;
  const minorCount = data.filter(item => item.severity && item.severity.toLowerCase() === 'minor').length;

  // Pie chart data for severity
  const pieData = [
    { id: 0, value: criticalCount, label: 'Critical', color: '#d32f2f' },
    { id: 1, value: moderateCount, label: 'Moderate', color: '#fbc02d' },
    { id: 2, value: minorCount, label: 'Minor', color: '#388e3c' },
  ];

  // Top 5 defect types
  const defectTypeCounts = data.reduce((acc, item) => {
    const type = item.defect_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topDefectTypes = Object.entries(defectTypeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Defects over time (line chart)
  const dateCounts = data.reduce((acc, item) => {
    acc[item.defect_date] = (acc[item.defect_date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedDates = Object.keys(dateCounts).sort();
  const lineLabels = sortedDates;
  const lineValues = sortedDates.map(date => dateCounts[date]);

  try {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>Data Analysis</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          I used this dashboard to dig into the titanium forging data and spot trends in defect types, costs, and severity. By breaking down the numbers, I could see which issues were most common and expensive, and where the process could be improved. This analysis shows how I approach real-world manufacturing data to find actionable insights.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Metric Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={2}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}><TrendingUpIcon /></Avatar>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Total Defects</Typography>
                    <Typography variant="h5">{totalDefects}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={2}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'success.main' }}><CheckCircleIcon /></Avatar>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Average Cost</Typography>
                    <Typography variant="h5">£{avgCost.toFixed(2)}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={2}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'warning.main' }}><WarningIcon /></Avatar>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Total Cost</Typography>
                    <Typography variant="h5">£{totalCost.toFixed(2)}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={2}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'error.main' }}><ErrorIcon /></Avatar>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Critical Defects</Typography>
                    <Typography variant="h5">{criticalCount}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          {/* Severity Breakdown Pie Chart */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
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
                width={260}
                height={200}
              />
              <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
                <Chip label={`Critical: ${criticalCount}`} color="error" size="small" />
                <Chip label={`Moderate: ${moderateCount}`} color="warning" size="small" />
                <Chip label={`Minor: ${minorCount}`} color="success" size="small" />
              </Stack>
            </Paper>
          </Grid>

          {/* Top Defect Types Bar Chart */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>Top Defect Types</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                I looked at which types of defects showed up most often. Structural problems (like cracks and inclusions) are the most serious, but I also tracked things like warping and surface marks. Knowing which issues pop up the most helps me focus on what really matters in the forging process.
              </Typography>
              <Stack spacing={1}>
                {topDefectTypes.map(([type, count]) => (
                  <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <BarChartIcon color="primary" />
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{type}</Typography>
                    </Stack>
                    <Chip label={count} color="primary" size="small" />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Defects Over Time Line Chart */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>Defects Over Time</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                I tracked how the number of defects changed over time. This let me see if things were getting better or worse, and whether any process changes actually made a difference. It’s a great way to keep quality moving in the right direction.
              </Typography>
              <LineChart
                xAxis={[{ scaleType: 'point', data: lineLabels }]}
                series={[{ data: lineValues, color: '#388e3c' }]}
                width={260}
                height={200}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  } catch (error) {
    console.error('Error rendering Analysis:', error);
    return <div style={{color: 'red', fontWeight: 'bold'}}>Failed to load analysis. Check the console for details.</div>;
  }
} 