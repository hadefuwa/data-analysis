import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
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

function App() {
  const [data, setData] = useState<DefectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Loading Manufacturing Defects Data...</h2>
          <p>Please wait while we load and analyze your data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="app">
        <div className="error">
          <h2>No Data Available</h2>
          <p>No valid data was found. Please check your data file.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Manufacturing Defects Analysis Dashboard</h1>
        <p>Comprehensive analysis of manufacturing quality control data</p>
      </header>

      <nav className="navigation">
        <button 
          className={activeTab === 'overview' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'charts' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('charts')}
        >
          Charts & Visualizations
        </button>
        <button 
          className={activeTab === 'table' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('table')}
        >
          Raw Data Table
        </button>
        <button 
          className={activeTab === 'analysis' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('analysis')}
        >
          Detailed Analysis
        </button>
        <button 
          className={activeTab === 'description' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('description')}
        >
          Dataset Description
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <h2>Dashboard Overview</h2>
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Defects</h3>
                <p className="number">{data.length}</p>
              </div>
              <div className="summary-card">
                <h3>Average Cost</h3>
                <p className="number">
                  ${(data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0) / data.length).toFixed(2)}
                </p>
              </div>
              <div className="summary-card">
                <h3>Total Cost</h3>
                <p className="number">
                  ${data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0).toFixed(2)}
                </p>
              </div>
              <div className="summary-card">
                <h3>Critical Defects</h3>
                <p className="number">
                  {data.filter(item => item.severity === 'critical').length}
                </p>
              </div>
            </div>
            <Charts data={data} />
          </div>
        )}
        
        {activeTab === 'charts' && <Charts data={data} />}
        {activeTab === 'table' && <DataTable data={data} />}
        {activeTab === 'analysis' && <Analysis data={data} />}
        {activeTab === 'description' && <Description />}
      </main>

      <footer className="footer">
        <p>Manufacturing Defects Data Analysis Dashboard - Built with React & Recharts</p>
      </footer>
    </div>
  );
}

export default App;
