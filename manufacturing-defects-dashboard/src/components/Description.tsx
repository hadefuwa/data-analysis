import React from 'react';

const Description: React.FC = () => {
  return (
    <div className="description-container">
      <h2>Dataset Description</h2>
      
      <div className="description-content">
        <div className="description-section">
          <h3>About This Dataset</h3>
          <p>
            This dataset contains simulated data related to manufacturing defects observed during quality control processes. 
            It includes information such as defect type, detection date, location within the product, severity level, 
            inspection method used, and repair costs. This dataset can be used for analyzing defect patterns, 
            improving quality control processes, and assessing the impact of defects on product quality and production costs.
          </p>
        </div>

        <div className="description-section">
          <h3>Data Columns</h3>
          <div className="columns-grid">
            <div className="column-item">
              <strong>defect_id:</strong> Unique identifier for each defect
            </div>
            <div className="column-item">
              <strong>product_id:</strong> Identifier for the product associated with the defect
            </div>
            <div className="column-item">
              <strong>defect_type:</strong> Type or category of the defect (e.g., cosmetic, functional, structural)
            </div>
            <div className="column-item">
              <strong>defect_description:</strong> Description of the defect
            </div>
            <div className="column-item">
              <strong>defect_date:</strong> Date when the defect was detected
            </div>
            <div className="column-item">
              <strong>defect_location:</strong> Location within the product where the defect was found (e.g., surface, component)
            </div>
            <div className="column-item">
              <strong>severity:</strong> Severity level of the defect (e.g., minor, moderate, critical)
            </div>
            <div className="column-item">
              <strong>inspection_method:</strong> Method used to detect the defect (e.g., visual inspection, automated testing)
            </div>
            <div className="column-item">
              <strong>repair_action:</strong> Action taken to repair or address the defect
            </div>
            <div className="column-item">
              <strong>repair_cost:</strong> Cost incurred to repair the defect (in local currency)
            </div>
          </div>
        </div>

        <div className="description-section">
          <h3>Potential Uses</h3>
          <ul className="uses-list">
            <li><strong>Quality Control Analysis:</strong> Analyze defect patterns and trends in manufacturing processes</li>
            <li><strong>Process Improvement:</strong> Identify areas for process optimization to reduce defect rates</li>
            <li><strong>Cost Analysis:</strong> Evaluate the financial impact of defects on production costs and profitability</li>
            <li><strong>Product Quality Assurance:</strong> Enhance product quality assurance strategies based on defect data analysis</li>
          </ul>
        </div>

        <div className="description-section">
          <h3>Dataset Information</h3>
          <div className="dataset-info">
            <div className="info-item">
              <strong>Total Records:</strong> 1,002 defects
            </div>
            <div className="info-item">
              <strong>Data Type:</strong> Simulated manufacturing data
            </div>
            <div className="info-item">
              <strong>Purpose:</strong> Educational and research purposes
            </div>
            <div className="info-item">
              <strong>Target Users:</strong> Manufacturing engineers, quality assurance professionals, and researchers
            </div>
          </div>
        </div>

        <div className="description-section">
          <h3>Data Quality Notes</h3>
          <p>
            This dataset is entirely synthetic and generated for educational and research purposes. 
            It can be a valuable resource for manufacturing engineers, quality assurance professionals, 
            and researchers interested in defect analysis and quality control. The data has been structured 
            to represent realistic manufacturing scenarios while maintaining consistency and completeness.
          </p>
        </div>

        <div className="description-section">
          <h3>Analysis Features</h3>
          <p>
            This dashboard provides comprehensive analysis capabilities including:
          </p>
          <ul className="features-list">
            <li>Interactive data visualizations with charts and graphs</li>
            <li>Sortable and searchable data table</li>
            <li>Statistical analysis and insights</li>
            <li>Cost analysis and trend identification</li>
            <li>Severity and location-based analysis</li>
            <li>Export functionality for filtered data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Description; 