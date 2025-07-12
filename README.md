# Manufacturing Defects Analysis Dashboard

A comprehensive React-based dashboard for analyzing manufacturing quality control data. This application provides interactive visualizations, detailed analysis, and data exploration tools for manufacturing defects data.

## Features

- **Interactive Charts**: Multiple chart types including bar charts, pie charts, and line charts
- **Data Table**: Sortable and searchable data table with pagination
- **Real-time Analysis**: Comprehensive statistical analysis of defects data
- **Full-Width Design**: Responsive design that utilizes the full browser width
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Performance**: Built with React and optimized for speed

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern design patterns
- **Charts**: Recharts library for data visualization
- **Data Parsing**: PapaParse for CSV file handling
- **Build Tool**: Vite for fast development and building
- **Package Manager**: npm

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hadefuwa/data-analysis.git
   cd data-analysis/manufacturing-defects-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## Data Structure

The application expects a CSV file with the following columns:

- `defect_id`: Unique identifier for each defect
- `product_id`: Product identifier
- `defect_type`: Type of defect
- `defect_description`: Detailed description of the defect
- `defect_date`: Date when the defect was discovered
- `defect_location`: Location of the defect on the product
- `severity`: Severity level (critical, moderate, minor)
- `inspection_method`: Method used for inspection
- `repair_action`: Action taken to repair the defect
- `repair_cost`: Cost of repairing the defect

## Dashboard Sections

### 1. Overview
- Summary cards with key metrics
- Total defects count
- Average and total repair costs
- Critical defects count
- Interactive charts overview

### 2. Charts & Visualizations
- Defect types distribution
- Severity breakdown
- Cost analysis by defect type
- Time-based trends
- Location-based analysis

### 3. Raw Data Table
- Complete dataset in tabular format
- Sortable columns
- Search functionality
- Pagination
- Export capabilities

### 4. Detailed Analysis
- Statistical breakdowns
- Cost analysis by severity
- Top defect issues
- Time-based statistics
- Inspection method analysis
- Key insights and recommendations

### 5. Dataset Description
- Complete documentation of the dataset
- Column descriptions
- Data usage guidelines
- Feature explanations

## Design Features

- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive Layout**: Adapts to any screen size
- **Interactive Elements**: Hover effects and smooth transitions
- **Color-coded Severity**: Visual indicators for different severity levels
- **Full-Width Design**: Utilizes the entire browser window

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Hamed** - [GitHub Profile](https://github.com/hadefuwa)

## Acknowledgments

- React team for the amazing framework
- Recharts for the charting library
- PapaParse for CSV parsing capabilities
- Vite for the fast build tool

## Support

If you have any questions or need help, please open an issue on GitHub or contact the author.

---

**Made with love for manufacturing quality control analysis** 