# Manufacturing Defects Data Analysis Dashboard

A comprehensive React-based data analysis application for visualizing and analyzing manufacturing quality control data. This dashboard provides interactive charts, detailed statistical analysis, and a searchable data table to help understand defect patterns and their impact on production costs.

## 🚀 Live Demo

Visit the live application: [Manufacturing Defects Dashboard](https://hadefuwa.github.io/data-analysis/)

## ✨ Features

### 📊 Interactive Visualizations
- **Defect Type Distribution** - Bar chart showing frequency of different defect types
- **Severity Analysis** - Pie chart displaying severity levels (minor, moderate, critical)
- **Cost Analysis** - Bar chart of average repair costs by defect type
- **Time Series** - Line chart showing defects over time
- **Location Analysis** - Bar chart of defects by location
- **Cost Trends** - Area chart displaying cost patterns

### 📋 Data Table
- **Sortable Columns** - Click any column header to sort data
- **Search Functionality** - Search across all fields simultaneously
- **Pagination** - Navigate through large datasets efficiently
- **Export to CSV** - Download filtered data for further analysis
- **Responsive Design** - Works on desktop and mobile devices

### 📈 Statistical Analysis
- **Summary Statistics** - Total defects, average cost, median, min/max values
- **Severity Breakdown** - Detailed analysis of defect severity levels
- **Cost Analysis** - Average costs by severity and type
- **Time Analysis** - Defects per day, trends, and patterns
- **Key Insights** - Automated recommendations and findings

### 🎨 User Experience
- **Modern UI** - Clean, professional interface with smooth animations
- **Responsive Design** - Optimized for all screen sizes
- **Loading States** - Clear feedback during data processing
- **Error Handling** - Graceful error messages and recovery
- **Accessibility** - WCAG compliant design

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4
- **Charts**: Recharts (React-native charting library)
- **Data Parsing**: Papaparse (CSV parsing)
- **Styling**: Custom CSS with responsive design
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
manufacturing-defects-dashboard/
├── public/
│   ├── defects_data.csv          # Main dataset
│   ├── data_description.txt      # Dataset description
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── App.tsx              # Main application component
│   │   ├── Charts.tsx           # Data visualization components
│   │   ├── DataTable.tsx        # Interactive data table
│   │   ├── Analysis.tsx         # Statistical analysis
│   │   └── Description.tsx      # Dataset information
│   ├── App.css                  # Main stylesheet
│   └── main.tsx                 # Application entry point
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hadefuwa/data-analysis.git
   cd data-analysis/manufacturing-defects-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deployment

The application is automatically deployed to GitHub Pages. To deploy manually:

```bash
npm run deploy
```

## 📊 Dataset Information

The dashboard analyzes a manufacturing defects dataset containing:

- **1,002 records** of manufacturing defects
- **10 columns** including defect type, severity, cost, location, and date
- **Simulated data** for educational and research purposes

### Data Columns
- `defect_id`: Unique identifier for each defect
- `product_id`: Product identifier
- `defect_type`: Type of defect (cosmetic, functional, structural)
- `defect_description`: Detailed description
- `defect_date`: Detection date
- `defect_location`: Location within the product
- `severity`: Severity level (minor, moderate, critical)
- `inspection_method`: Detection method used
- `repair_action`: Action taken to repair
- `repair_cost`: Cost of repair

## 🎯 Use Cases

This dashboard is designed for:
- **Manufacturing Engineers** - Analyze defect patterns and trends
- **Quality Assurance Professionals** - Improve quality control processes
- **Data Analysts** - Perform detailed statistical analysis
- **Researchers** - Study manufacturing quality metrics
- **Students** - Learn data visualization and analysis techniques

## 🔧 Customization

### Adding New Charts
1. Import additional chart components from Recharts
2. Add new data processing functions in `Charts.tsx`
3. Create new chart components following the existing pattern

### Modifying Styles
- Edit `src/App.css` for global styles
- Use CSS classes for component-specific styling
- The design system uses a consistent color palette and spacing

### Adding New Data
- Replace `public/defects_data.csv` with your dataset
- Update the `DefectData` interface in components
- Modify data processing functions as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Recharts** - For the excellent charting library
- **Papaparse** - For CSV parsing functionality
- **Vite** - For the fast build tool
- **React** - For the amazing frontend framework

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the maintainer.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
