import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Tooltip, useTheme, Box
} from '@mui/material';

interface DefectData {
  id: string;
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

function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'error';
    case 'moderate':
      return 'warning';
    case 'minor':
      return 'success';
    default:
      return 'default';
  }
}

export default function DataTable({ data }: { data: DefectData[] }) {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Raw Data Table</Typography>
      <TableContainer component={Box} sx={{ maxHeight: 600, borderRadius: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Defect ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Product ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Severity</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Inspection</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Repair Action</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Repair Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={row.defect_id || idx}
                sx={{
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30,136,229,0.12)' : '#f5f5f5',
                  },
                }}
              >
                <TableCell>{row.defect_id}</TableCell>
                <TableCell>{row.product_id}</TableCell>
                <TableCell>{row.defect_type}</TableCell>
                <TableCell>
                  <Chip label={row.severity} color={getSeverityColor(row.severity)} size="small" />
                </TableCell>
                <TableCell>
                  <Tooltip title={row.defect_description}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: 200 }}>{row.defect_description}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.defect_date}</TableCell>
                <TableCell>{row.defect_location}</TableCell>
                <TableCell>{row.inspection_method}</TableCell>
                <TableCell>{row.repair_action}</TableCell>
                <TableCell>£{row.repair_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
} 