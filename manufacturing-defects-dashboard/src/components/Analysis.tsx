import React from 'react';

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

interface AnalysisProps {
  data: DefectData[];
}

const Analysis: React.FC<AnalysisProps> = ({ data }) => {
  // Calculate basic statistics
  const totalDefects = data.length;
  const totalCost = data.reduce((sum, item) => sum + parseFloat(item.repair_cost || '0'), 0);
  const averageCost = totalCost / totalDefects;
  
  // Cost statistics
  const costs = data.map(item => parseFloat(item.repair_cost || '0')).sort((a, b) => a - b);
  const medianCost = costs[Math.floor(costs.length / 2)];
  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);
  
  // Severity analysis
  const severityCounts = data.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const criticalDefects = severityCounts['critical'] || 0;
  const moderateDefects = severityCounts['moderate'] || 0;
  const minorDefects = severityCounts['minor'] || 0;
  
  // Defect type analysis
  const typeCounts = data.reduce((acc, item) => {
    acc[item.defect_type] = (acc[item.defect_type] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const mostCommonType = Object.entries(typeCounts).sort(([,a], [,b]) => b - a)[0];
  
  // Location analysis
  const locationCounts = data.reduce((acc, item) => {
    acc[item.defect_location] = (acc[item.defect_location] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const mostProblematicLocation = Object.entries(locationCounts).sort(([,a], [,b]) => b - a)[0];
  
  // Cost by severity
  const costBySeverity = data.reduce((acc, item) => {
    const severity = item.severity;
    const cost = parseFloat(item.repair_cost || '0');
    if (!acc[severity]) {
      acc[severity] = { total: 0, count: 0 };
    }
    acc[severity].total += cost;
    acc[severity].count += 1;
    return acc;
  }, {} as { [key: string]: { total: number; count: number } });
  
  // Time analysis
  const dateCounts = data.reduce((acc, item) => {
    const date = item.defect_date.split(' ')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const dates = Object.keys(dateCounts).sort();
  const defectsPerDay = dates.map(date => dateCounts[date]);
  const averageDefectsPerDay = defectsPerDay.reduce((sum, count) => sum + count, 0) / defectsPerDay.length;
  
  // Find trends
  const maxDefectsInDay = Math.max(...defectsPerDay);
  const minDefectsInDay = Math.min(...defectsPerDay);
  
  // Inspection method analysis
  const inspectionCounts = data.reduce((acc, item) => {
    acc[item.inspection_method] = (acc[item.inspection_method] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="analysis-container">
      <h2>Detailed Data Analysis</h2>
      
      <div className="analysis-grid">
        {/* Basic Statistics */}
        <div className="analysis-card">
          <h3>Basic Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Defects:</span>
              <span className="stat-value">{totalDefects.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Cost:</span>
              <span className="stat-value">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Cost:</span>
              <span className="stat-value">${averageCost.toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Median Cost:</span>
              <span className="stat-value">${medianCost.toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Min Cost:</span>
              <span className="stat-value">${minCost.toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Max Cost:</span>
              <span className="stat-value">${maxCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Severity Analysis */}
        <div className="analysis-card">
          <h3>Severity Analysis</h3>
          <div className="severity-breakdown">
            <div className="severity-item critical">
              <span className="severity-label">Critical:</span>
              <span className="severity-count">{criticalDefects}</span>
              <span className="severity-percentage">({((criticalDefects / totalDefects) * 100).toFixed(1)}%)</span>
            </div>
            <div className="severity-item moderate">
              <span className="severity-label">Moderate:</span>
              <span className="severity-count">{moderateDefects}</span>
              <span className="severity-percentage">({((moderateDefects / totalDefects) * 100).toFixed(1)}%)</span>
            </div>
            <div className="severity-item minor">
              <span className="severity-label">Minor:</span>
              <span className="severity-count">{minorDefects}</span>
              <span className="severity-percentage">({((minorDefects / totalDefects) * 100).toFixed(1)}%)</span>
            </div>
          </div>
          
          <div className="cost-by-severity">
            <h4>Average Cost by Severity:</h4>
            {Object.entries(costBySeverity).map(([severity, { total, count }]) => (
              <div key={severity} className="cost-item">
                <span className="cost-label">{severity}:</span>
                <span className="cost-value">${(total / count).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Issues */}
        <div className="analysis-card">
          <h3>Top Issues</h3>
          <div className="top-issues">
            <div className="issue-item">
              <span className="issue-label">Most Common Defect Type:</span>
              <span className="issue-value">{mostCommonType[0]}</span>
              <span className="issue-count">({mostCommonType[1]} occurrences)</span>
            </div>
            <div className="issue-item">
              <span className="issue-label">Most Problematic Location:</span>
              <span className="issue-value">{mostProblematicLocation[0]}</span>
              <span className="issue-count">({mostProblematicLocation[1]} defects)</span>
            </div>
          </div>
        </div>

        {/* Time Analysis */}
        <div className="analysis-card">
          <h3>Time Analysis</h3>
          <div className="time-stats">
            <div className="time-item">
              <span className="time-label">Average Defects per Day:</span>
              <span className="time-value">{averageDefectsPerDay.toFixed(1)}</span>
            </div>
            <div className="time-item">
              <span className="time-label">Maximum Defects in a Day:</span>
              <span className="time-value">{maxDefectsInDay}</span>
            </div>
            <div className="time-item">
              <span className="time-label">Minimum Defects in a Day:</span>
              <span className="time-value">{minDefectsInDay}</span>
            </div>
            <div className="time-item">
              <span className="time-label">Date Range:</span>
              <span className="time-value">{dates[0]} to {dates[dates.length - 1]}</span>
            </div>
          </div>
        </div>

        {/* Inspection Methods */}
        <div className="analysis-card">
          <h3>Inspection Methods</h3>
          <div className="inspection-methods">
            {Object.entries(inspectionCounts).map(([method, count]) => (
              <div key={method} className="method-item">
                <span className="method-label">{method}:</span>
                <span className="method-count">{count}</span>
                <span className="method-percentage">({((count / totalDefects) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="analysis-card insights">
          <h3>Key Insights & Recommendations</h3>
          <div className="insights-list">
            <div className="insight-item">
              <strong>Cost Impact:</strong> The total cost of defects is ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, 
              with an average of ${averageCost.toFixed(2)} per defect.
            </div>
            <div className="insight-item">
              <strong>Critical Defects:</strong> {criticalDefects} critical defects represent {((criticalDefects / totalDefects) * 100).toFixed(1)}% of all defects, 
              requiring immediate attention.
            </div>
            <div className="insight-item">
              <strong>Most Common Issue:</strong> {mostCommonType[0]} defects are the most frequent, 
              suggesting a systematic problem in this area.
            </div>
            <div className="insight-item">
              <strong>Location Focus:</strong> {mostProblematicLocation[0]} has the highest defect rate, 
              indicating a need for process improvement in this location.
            </div>
            <div className="insight-item">
              <strong>Recommendations:</strong>
              <ul>
                <li>Implement preventive measures for {mostCommonType[0]} defects</li>
                <li>Increase quality control at {mostProblematicLocation[0]}</li>
                <li>Review processes for critical defect prevention</li>
                <li>Consider cost-benefit analysis of inspection methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 