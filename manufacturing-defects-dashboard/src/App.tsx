import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
  Stack,
  LinearProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  TableChart as TableChartIcon,
  Analytics as AnalyticsIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import DataTable from './components/DataTable';
import Charts from './components/Charts';
import Analysis from './components/Analysis';
import Description from './components/Description';

// Define the data structure for our defects
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

const drawerWidth = 240;

// Create a modern theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [data, setData] = useState<DefectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme_ = useTheme();
  const isMobile = useMediaQuery(theme_.breakpoints.down('md'));

  // Load and parse the CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Use the correct path for GitHub Pages deployment
        const baseUrl = window.location.hostname === 'localhost' ? '' : '/data-analysis';
        const response = await fetch(`${baseUrl}/defects_data.csv`);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            // Filter out empty rows and ensure data is valid
            const validData = (results.data as DefectData[]).filter(item => 
              item && item.defect_id && item.defect_id.trim()
            );
            setData(validData);
            setLoading(false);
            setSnackbarMessage(`Successfully loaded ${validData.length} defect records`);
            setSnackbarOpen(true);
          },
          error: (error) => {
            setError('Error parsing CSV data: ' + error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Error loading data: ' + (err as Error).message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const getSeverityColor = (severity: string) => {
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
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <ErrorIcon />;
      case 'moderate':
        return <WarningIcon />;
      case 'minor':
        return <CheckCircleIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
          Defects Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === 'overview'}
            onClick={() => handleTabChange('overview')}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === 'charts'}
            onClick={() => handleTabChange('charts')}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Charts & Visualizations" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === 'table'}
            onClick={() => handleTabChange('table')}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Raw Data Table" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === 'analysis'}
            onClick={() => handleTabChange('analysis')}
          >
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Detailed Analysis" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === 'description'}
            onClick={() => handleTabChange('description')}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Dataset Description" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <LinearProgress />
          <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Loading Manufacturing Defects Data...
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we load and analyze your data.
            </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Error Loading Data</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        </Container>
      </ThemeProvider>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Alert severity="warning">
            <Typography variant="h6">No Data Available</Typography>
            <Typography variant="body2">No valid data was found. Please check your data file.</Typography>
          </Alert>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Manufacturing Defects Analysis Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ mr: 2 }}>
              Created by Hamed Adefuwa
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
          }}
        >
          {activeTab === 'overview' && (
            <Container maxWidth="xl">
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Dashboard Overview
              </Typography>
              
              {/* Summary Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <TrendingUpIcon />
                        </Avatar>
                        <Box>
                          <Typography color="text.secondary" gutterBottom variant="body2">
                            Total Defects
                          </Typography>
                          <Typography variant="h4" component="div">
                            {data.length}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <CheckCircleIcon />
                        </Avatar>
                        <Box>
                          <Typography color="text.secondary" gutterBottom variant="body2">
                            Average Cost
                          </Typography>
                          <Typography variant="h4" component="div">
                            ${(data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0) / data.length).toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'warning.main' }}>
                          <WarningIcon />
                        </Avatar>
                        <Box>
                          <Typography color="text.secondary" gutterBottom variant="body2">
                            Total Cost
                          </Typography>
                          <Typography variant="h4" component="div">
                            ${data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0).toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'error.main' }}>
                          <ErrorIcon />
                        </Avatar>
                        <Box>
                          <Typography color="text.secondary" gutterBottom variant="body2">
                            Critical Defects
                          </Typography>
                          <Typography variant="h4" component="div">
                            {data.filter(item => item.severity === 'critical').length}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Severity Distribution */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardHeader title="Defect Severity Distribution" />
                    <CardContent>
                      <Stack spacing={2}>
                        {['critical', 'moderate', 'minor'].map((severity) => {
                          const count = data.filter(item => item.severity === severity).length;
                          const percentage = ((count / data.length) * 100).toFixed(1);
                          return (
                            <Box key={severity}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  {getSeverityIcon(severity)}
                                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                    {severity}
                                  </Typography>
                                </Stack>
                                <Typography variant="body2" color="text.secondary">
                                  {count} ({percentage}%)
                                </Typography>
                              </Stack>
                              <LinearProgress 
                                variant="determinate" 
                                value={parseFloat(percentage)} 
                                color={getSeverityColor(severity) as any}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          );
                        })}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardHeader title="Top Defect Types" />
                    <CardContent>
                      <Stack spacing={1}>
                        {Object.entries(
                          data.reduce((acc, item) => {
                            acc[item.defect_type] = (acc[item.defect_type] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        )
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 5)
                          .map(([type, count]) => (
                            <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                {type}
                              </Typography>
                              <Chip label={count} size="small" color="primary" />
                            </Box>
                          ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Charts Section */}
              <Charts data={data} />
            </Container>
          )}
          
          {activeTab === 'charts' && <Charts data={data} />}
          {activeTab === 'table' && <DataTable data={data} />}
          {activeTab === 'analysis' && <Analysis data={data} />}
          {activeTab === 'description' && <Description />}
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
