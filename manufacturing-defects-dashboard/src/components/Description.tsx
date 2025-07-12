import * as React from 'react';
import { Paper, Typography, Divider, Box, Grid, Chip, Avatar, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Description() {
  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}><InfoIcon /></Avatar>
          <Typography variant="h5">Dataset Description</Typography>
        </Stack>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <ListAltIcon color="secondary" />
              <Typography variant="subtitle1">About This Dataset</Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" mb={2}>
              This dataset contains simulated data related to manufacturing defects observed during quality control processes. It includes information such as defect type, detection date, location within the product, severity level, inspection method used, and repair costs. This dataset can be used for analyzing defect patterns, improving quality control processes, and assessing the impact of defects on product quality and production costs.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <AssignmentIcon color="success" />
              <Typography variant="subtitle1">Data Columns</Typography>
            </Stack>
            <Grid container spacing={1}>
              {[
                ['defect_id', 'Unique identifier for each defect'],
                ['product_id', 'Identifier for the product associated with the defect'],
                ['defect_type', 'Type or category of the defect (e.g., cosmetic, functional, structural)'],
                ['defect_description', 'Description of the defect'],
                ['defect_date', 'Date when the defect was detected'],
                ['defect_location', 'Location within the product where the defect was found (e.g., surface, component)'],
                ['severity', 'Severity level of the defect (e.g., minor, moderate, critical)'],
                ['inspection_method', 'Method used to detect the defect (e.g., visual inspection, automated testing)'],
                ['repair_action', 'Action taken to repair or address the defect'],
                ['repair_cost', 'Cost incurred to repair the defect (in local currency)'],
              ].map(([col, desc]) => (
                <Grid size={{ xs: 12, sm: 6 }} key={col}>
                  <Chip label={col} color="primary" size="small" sx={{ mr: 1, mb: 0.5 }} />
                  <Typography variant="body2" display="inline">{desc}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <EmojiObjectsIcon color="warning" />
              <Typography variant="subtitle1">Potential Uses</Typography>
            </Stack>
            <ul style={{ marginTop: 0, marginBottom: 16, paddingLeft: 24 }}>
              <li><strong>Quality Control Analysis:</strong> Analyze defect patterns and trends in manufacturing processes</li>
              <li><strong>Process Improvement:</strong> Identify areas for process optimization to reduce defect rates</li>
              <li><strong>Cost Analysis:</strong> Evaluate the financial impact of defects on production costs and profitability</li>
              <li><strong>Product Quality Assurance:</strong> Enhance product quality assurance strategies based on defect data analysis</li>
            </ul>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <CheckCircleIcon color="success" />
              <Typography variant="subtitle1">Data Quality Notes</Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" mb={2}>
              This dataset is entirely synthetic and generated for educational and research purposes. It can be a valuable resource for manufacturing engineers, quality assurance professionals, and researchers interested in defect analysis and quality control. The data has been structured to represent realistic manufacturing scenarios while maintaining consistency and completeness.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 