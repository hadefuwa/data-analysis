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
// Import image from top-level assets folder
import forgingImg from '../../assets/Forging.jpg';
import './App.css';

// Define the data structure for our defects
interface DefectData {
  id: string; // Required for DataGrid compatibility
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
    mode: 'dark',
    primary: {
      main: '#1e88e5', // Deep blue
    },
    secondary: {
      main: '#ab47bc', // Vibrant purple accent
    },
    background: {
      default: '#181A20', // Very dark background
      paper: '#23272F', // Card background
    },
    text: {
      primary: '#F3F6F9', // Light text
      secondary: '#B0B8C1', // Muted text
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 32px rgba(30,136,229,0.10)',
          background: 'rgba(35,39,47,0.95)',
          border: '1px solid rgba(255,255,255,0.04)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(35,39,47,0.95)',
          border: '1px solid rgba(255,255,255,0.04)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1e88e5 0%, #23272F 100%)',
          color: '#F3F6F9',
        },
      },
    },
  },
});

function App() {
  const [data, setData] = useState<DefectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme_ = useTheme();

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
            ).map((item, idx) => ({ ...item, id: item.defect_id ? String(item.defect_id) : String(idx) })); // id always string
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

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <LinearProgress />
          <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Loading Titanium Forging Data...
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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        {/* App Bar Only */}
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Titanium Forging Data Analysis
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ mr: 2 }}>
              Created by Hamed Adefuwa
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Main Content - All sections combined */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: '100%' }}>
          {/* Overview Section */}
          <div className="overview">
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Titanium Forging Data Analysis
            </Typography>
            {/* Image and Intro Text */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ flex: '1 1 320px', minWidth: 280, display: 'flex', justifyContent: 'center' }}>
                <img
                  src={forgingImg}
                  alt="Titanium forging press"
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 16,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                    objectFit: 'cover',
                    aspectRatio: '4/3',
                  }}
                />
              </div>
              <div style={{ flex: '2 1 400px', minWidth: 280 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #23272F 0%, #1e88e5 100%)',
                    borderRadius: 4,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                    p: 3,
                    borderLeft: '6px solid #1e88e5',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      fontSize: '1.15rem',
                      color: '#F3F6F9',
                      textShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    }}
                  >
                    I received a dataset with 1,000 records from a titanium forging facility, each describing a defect found in a forged titanium part. I built this dashboard to explore and analyze the data—looking at defect types (like cracks, inclusions, and warping), where they occurred (flange, bore, web, surface), and how they were detected (ultrasonic, dye penetrant, X-ray, or visual inspection). By visualizing these trends, I identified which defects were most common and costly, and highlighted areas where the forging process could be improved. This project shows how I can turn real manufacturing data into actionable insights using modern data analysis and visualization tools.
                  </Typography>
                </Box>
              </div>
            </div>
            {/* Summary Cards */}
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Defects</h3>
                <span className="number">{data.length}</span>
              </div>
              <div className="summary-card">
                <h3>Average Cost</h3>
                <span className="number">£{(data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0) / data.length).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="summary-card">
                <h3>Total Cost</h3>
                <span className="number">£{data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="summary-card">
                <h3>Critical Defects</h3>
                <span className="number">{data.filter(item => item.severity && item.severity.toLowerCase() === 'critical').length}</span>
              </div>
            </div>
          </div>

          {/* Charts & Visualizations Section */}
          <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 2 }}>
            Charts & Visualizations
          </Typography>
          <Charts data={data} />

          {/* Raw Data Table Section */}
          <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 2 }}>
            Raw Data Table
          </Typography>
          <DataTable data={data} />

          {/* Detailed Analysis Section */}
          <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 2 }}>
            Detailed Analysis
          </Typography>
          <Analysis data={data} />

          {/* Dataset Description Section */}
          <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 2 }}>
            Dataset Description
          </Typography>
          <Description />
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
