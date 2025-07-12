import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Paper, Box, Typography, Chip, Tooltip } from '@mui/material';

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
  // DataGrid expects a unique 'id' field
  const rows = data.map((row, idx) => ({ ...row, id: row.defect_id || idx }));

  const columns: GridColDef[] = [
    { field: 'defect_id', headerName: 'Defect ID', width: 120 },
    { field: 'product_id', headerName: 'Product ID', width: 120 },
    { field: 'defect_type', headerName: 'Type', width: 140 },
    {
      field: 'severity',
      headerName: 'Severity',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label={params.value} color={getSeverityColor(params.value)} size="small" />
      ),
      sortable: true,
    },
    {
      field: 'defect_description',
      headerName: 'Description',
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.value}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: 200 }}>{params.value}</span>
        </Tooltip>
      ),
    },
    { field: 'defect_date', headerName: 'Date', width: 120 },
    { field: 'defect_location', headerName: 'Location', width: 140 },
    { field: 'inspection_method', headerName: 'Inspection', width: 140 },
    { field: 'repair_action', headerName: 'Repair Action', width: 140 },
    { field: 'repair_cost', headerName: 'Repair Cost', width: 120, 
      renderCell: (params: GridRenderCellParams) => (
        <span>£{params.value}</span>
      ) 
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Raw Data Table</Typography>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-row:hover': { backgroundColor: '#f5f5f5' },
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#fafafa', fontWeight: 700 },
            '& .MuiDataGrid-cell': { fontSize: '1rem' },
            borderRadius: 2,
          }}
        />
      </Box>
    </Paper>
  );
} 