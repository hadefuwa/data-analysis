import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

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

interface ChartsProps {
  data: DefectData[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  // Process data for charts
  const getDefectTypeData = () => {
    const typeCounts: { [key: string]: number } = {};
    data.forEach(item => {
      if (item.defect_type && item.defect_type.trim()) {
        typeCounts[item.defect_type] = (typeCounts[item.defect_type] || 0) + 1;
      }
    });
    return Object.entries(typeCounts).map(([type, count]) => ({
      name: type,
      count: count,
      percentage: ((count / data.length) * 100).toFixed(1)
    }));
  };

  const getSeverityData = () => {
    const severityCounts: { [key: string]: number } = {};
    data.forEach(item => {
      if (item.severity && item.severity.trim()) {
        severityCounts[item.severity] = (severityCounts[item.severity] || 0) + 1;
      }
    });
    return Object.entries(severityCounts).map(([severity, count]) => ({
      name: severity,
      count: count,
      percentage: ((count / data.length) * 100).toFixed(1)
    }));
  };

  const getCostByTypeData = () => {
    const typeCosts: { [key: string]: { total: number; count: number } } = {};
    data.forEach(item => {
      if (item.defect_type && item.defect_type.trim()) {
        const cost = parseFloat(item.repair_cost || '0');
        if (!typeCosts[item.defect_type]) {
          typeCosts[item.defect_type] = { total: 0, count: 0 };
        }
        typeCosts[item.defect_type].total += cost;
        typeCosts[item.defect_type].count += 1;
      }
    });
    return Object.entries(typeCosts).map(([type, { total, count }]) => ({
      name: type,
      averageCost: total / count,
      totalCost: total
    }));
  };

  const getTimeSeriesData = () => {
    const dateCounts: { [key: string]: number } = {};
    data.forEach(item => {
      // Add safety check for undefined or empty defect_date
      if (item.defect_date && item.defect_date.trim()) {
        const date = item.defect_date.split(' ')[0]; // Get just the date part
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      }
    });
    return Object.entries(dateCounts)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, count]) => ({
        date: date,
        defects: count
      }));
  };

  const getLocationData = () => {
    const locationCounts: { [key: string]: number } = {};
    data.forEach(item => {
      if (item.defect_location && item.defect_location.trim()) {
        locationCounts[item.defect_location] = (locationCounts[item.defect_location] || 0) + 1;
      }
    });
    return Object.entries(locationCounts).map(([location, count]) => ({
      name: location,
      count: count
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const defectTypeData = getDefectTypeData();
  const severityData = getSeverityData();
  const costByTypeData = getCostByTypeData();
  const timeSeriesData = getTimeSeriesData();
  const locationData = getLocationData();

  return (
    <div className="charts-container">
      <h2>Data Visualizations</h2>
      
      <div className="chart-grid">
        {/* Defect Type Distribution - Bar Chart */}
        <div className="chart-card">
          <h3>Defect Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defectTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution - Pie Chart */}
        <div className="chart-card">
          <h3>Defect Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Average Cost by Defect Type */}
        <div className="chart-card">
          <h3>Average Repair Cost by Defect Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costByTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Average Cost']} />
              <Legend />
              <Bar dataKey="averageCost" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Defects Over Time */}
        <div className="chart-card">
          <h3>Defects Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="defects" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Defect Location */}
        <div className="chart-card">
          <h3>Defects by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Trend */}
        <div className="chart-card">
          <h3>Total Cost Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="defects" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts; 