import React, { useState, useMemo } from 'react';

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

interface DataTableProps {
  data: DefectData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof DefectData>('defect_id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortField === 'repair_cost') {
        const aNum = parseFloat(aValue || '0');
        const bNum = parseFloat(bValue || '0');
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (field: keyof DefectData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const csvContent = [headers, ...filteredAndSortedData.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    )].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_defects_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="data-table-container">
      <h2>Raw Data Table</h2>
      
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search all fields..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="table-info">
          <p>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} records
            {searchTerm && ` (filtered from ${data.length} total)`}
          </p>
        </div>
        
        <button onClick={exportToCSV} className="export-button">
          Export to CSV
        </button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('defect_id')} className="sortable">
                Defect ID {sortField === 'defect_id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('product_id')} className="sortable">
                Product ID {sortField === 'product_id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('defect_type')} className="sortable">
                Defect Type {sortField === 'defect_type' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('defect_description')} className="sortable">
                Description {sortField === 'defect_description' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('defect_date')} className="sortable">
                Date {sortField === 'defect_date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('defect_location')} className="sortable">
                Location {sortField === 'defect_location' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('severity')} className="sortable">
                Severity {sortField === 'severity' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('inspection_method')} className="sortable">
                Inspection Method {sortField === 'inspection_method' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('repair_action')} className="sortable">
                Repair Action {sortField === 'repair_action' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('repair_cost')} className="sortable">
                Cost {sortField === 'repair_cost' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className={item.severity === 'critical' ? 'critical-row' : ''}>
                <td>{item.defect_id}</td>
                <td>{item.product_id}</td>
                <td>{item.defect_type}</td>
                <td className="description-cell">{item.defect_description}</td>
                <td>{item.defect_date}</td>
                <td>{item.defect_location}</td>
                <td className={`severity-${item.severity}`}>{item.severity}</td>
                <td>{item.inspection_method}</td>
                <td>{item.repair_action}</td>
                <td className="cost-cell">${parseFloat(item.repair_cost || '0').toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable; 