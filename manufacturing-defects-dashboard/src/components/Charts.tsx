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

  try {
    // Severity counts
    const critical = data.filter(d => d.severity && d.severity.toLowerCase() === 'critical');
    const moderate = data.filter(d => d.severity && d.severity.toLowerCase() === 'moderate');
    const minor = data.filter(d => d.severity && d.severity.toLowerCase() === 'minor');
    const pieData = [
      { id: 0, value: critical.length, label: 'Critical', color: '#d32f2f' },
      { id: 1, value: moderate.length, label: 'Moderate', color: '#fbc02d' },
      { id: 2, value: minor.length, label: 'Minor', color: '#388e3c' },
    ];

    // Cost by severity
    const costBySeverity = {
      critical: critical.reduce((sum, d) => sum + parseFloat(d.repair_cost || '0'), 0),
      moderate: moderate.reduce((sum, d) => sum + parseFloat(d.repair_cost || '0'), 0),
      minor: minor.reduce((sum, d) => sum + parseFloat(d.repair_cost || '0'), 0),
    };
    const totalCost = costBySeverity.critical + costBySeverity.moderate + costBySeverity.minor;
    const donutData = [
      { id: 0, value: costBySeverity.critical, label: 'Critical', color: '#d32f2f' },
      { id: 1, value: costBySeverity.moderate, label: 'Moderate', color: '#fbc02d' },
      { id: 2, value: costBySeverity.minor, label: 'Minor', color: '#388e3c' },
    ];

    // Defect type counts and costs
    const defectTypeCounts = data.reduce((acc, item) => {
      acc[item.defect_type] = (acc[item.defect_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const defectTypeCosts = data.reduce((acc, item) => {
      acc[item.defect_type] = (acc[item.defect_type] || 0) + parseFloat(item.repair_cost || '0');
      return acc;
    }, {} as Record<string, number>);
    const barLabels = Object.keys(defectTypeCounts);
    const barValues = Object.values(defectTypeCounts);
    const costBarValues = barLabels.map(type => defectTypeCosts[type]);
    const avgCostPerType = barLabels.map(type => defectTypeCosts[type] / defectTypeCounts[type]);
    const maxCostType = barLabels.reduce((max, type) => defectTypeCosts[type] > (defectTypeCosts[max] || 0) ? type : max, barLabels[0] || '');

    // Defects over time (by month)
    const monthCounts = data.reduce((acc, item) => {
      if (!item.defect_date) return acc;
      const date = new Date(item.defect_date);
      if (isNaN(date.getTime())) return acc;
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const monthCosts = data.reduce((acc, item) => {
      if (!item.defect_date) return acc;
      const date = new Date(item.defect_date);
      if (isNaN(date.getTime())) return acc;
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[month] = (acc[month] || 0) + parseFloat(item.repair_cost || '0');
      return acc;
    }, {} as Record<string, number>);
    const sortedMonths = Object.keys(monthCounts).sort();
    const lineLabels = sortedMonths.map(m => {
      const [year, month] = m.split('-');
      return new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
    });
    const lineValues = sortedMonths.map(month => monthCounts[month]);
    const costLineValues = sortedMonths.map(month => monthCosts[month]);
    // Moving average (3-month)
    const movingAvg = lineValues.map((_, i, arr) => {
      const start = Math.max(0, i - 2);
      const end = i + 1;
      const slice = arr.slice(start, end);
      return slice.reduce((a, b) => a + b, 0) / slice.length;
    });
    // Month with highest/lowest defects
    const maxMonthIdx = lineValues.indexOf(Math.max(...lineValues));
    const minMonthIdx = lineValues.indexOf(Math.min(...lineValues));

    return (
      <Box sx={{ mt: 4 }}>
        <Stack spacing={4}>
          {/* Severity Breakdown Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Severity Breakdown</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              I broke down the severity of defects in the titanium forgings. Critical issues (like cracks or big inclusions) usually mean a part gets rejected, moderate ones (like warping) can sometimes be fixed, and minor ones are mostly cosmetic. This helped me see where the biggest risks and costs are.
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="center">
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
                width={220}
                height={180}
              />
              <PieChart
                series={[{
                  data: donutData,
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 4,
                  cornerRadius: 4,
                  startAngle: 0,
                  endAngle: 360,
                }]}
                width={220}
                height={180}
              />
              <Box>
                <Typography variant="body2" sx={{ mb: 1, color: '#F3F6F9' }}><b>Total Cost:</b> £{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                <Stack spacing={1}>
                  {(Object.entries({ critical: critical.length, moderate: moderate.length, minor: minor.length }) as ["critical" | "moderate" | "minor", number][]).map(([sev, count]) => (
                    <Box key={sev}>
                      <Typography variant="body2" sx={{ color: sev === 'critical' ? '#d32f2f' : sev === 'moderate' ? '#fbc02d' : '#388e3c' }}>
                        <b>{sev.charAt(0).toUpperCase() + sev.slice(1)}:</b> £{costBySeverity[sev].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (
                        {((costBySeverity[sev] / totalCost) * 100).toFixed(1)}% of total, avg £{(costBySeverity[sev] / count).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per defect)
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>

          {/* Top Defect Types Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Top Defect Types</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              I looked at which types of defects showed up most often and which cost the most. Structural problems (like cracks and inclusions) are the most serious, but I also tracked things like warping and surface marks. Knowing which issues pop up the most and cost the most helps me focus on what really matters in the forging process.
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="center">
              <BarChart
                xAxis={[{ scaleType: 'band', data: barLabels }]}
                series={[{ data: barValues, color: '#1976d2', label: 'Count' }]}
                width={320}
                height={220}
              />
              <BarChart
                xAxis={[{ scaleType: 'band', data: barLabels }]}
                series={[{ data: costBarValues, color: '#ab47bc', label: 'Total Cost' }]}
                width={320}
                height={220}
              />
              <Box>
                <Typography variant="body2" sx={{ mb: 1, color: '#F3F6F9' }}><b>Most Expensive Type:</b> {maxCostType} (£{defectTypeCosts[maxCostType]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</Typography>
                <Stack spacing={1}>
                  {barLabels.map((type, idx) => (
                    <Typography key={type} variant="body2" sx={{ color: '#B0B8C1' }}>
                      <b>{type}:</b> avg £{avgCostPerType[idx].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per defect
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>

          {/* Defects Over Time Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Defects Over Time</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              I tracked how the number and cost of defects changed over time. This let me see if things were getting better or worse, and whether any process changes actually made a difference. It’s a great way to keep quality moving in the right direction.
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: lineLabels }]}
              series={[{ data: costLineValues, color: '#ab47bc', label: 'Total Cost' }]}
              width={500}
              height={220}
            />
            <LineChart
              xAxis={[{ scaleType: 'point', data: lineLabels }]}
              series={[
                { data: lineValues, color: '#388e3c', label: 'Defects' },
                { data: movingAvg, color: '#1e88e5', label: '3-mo Avg', curve: 'monotoneX' },
              ]}
              width={500}
              height={220}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#F3F6F9' }}><b>Peak Month:</b> {lineLabels[maxMonthIdx]} ({lineValues[maxMonthIdx]} defects)</Typography>
              <Typography variant="body2" sx={{ color: '#B0B8C1' }}><b>Lowest Month:</b> {lineLabels[minMonthIdx]} ({lineValues[minMonthIdx]} defects)</Typography>
            </Box>
          </Paper>
        </Stack>
      </Box>
    );
  } catch (error) {
    console.error('Error rendering Charts:', error);
    return <div style={{color: 'red', fontWeight: 'bold'}}>Failed to load charts. Check the console for details.</div>;
  }
} 