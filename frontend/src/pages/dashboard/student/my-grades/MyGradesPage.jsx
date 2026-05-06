'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

export default function DataTable({
  columns,
  data = [],   // ✅ DEFAULT SAFE ARRAY
  actions,
  searchable = true,
  pagination = true
}) {
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // =========================
  // SAFE ARRAY GUARANTEE
  // =========================
  const safeData = Array.isArray(data) ? data : [];

  // =========================
  // SAFE VALUE
  // =========================
  const safeValue = (val) => {
    if (val === null || val === undefined) return '—';
    if (typeof val === 'object') {
      return (
        val.name ||
        val.title ||
        val.semester_name ||
        val.course_title ||
        val.course_code ||
        '—'
      );
    }
    return val;
  };

  // =========================
  // FILTER
  // =========================
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return safeData;

    return safeData.filter((item) =>
      columns.some((col) =>
        String(safeValue(item[col.key]))
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [safeData, searchTerm, columns, searchable]);

  // =========================
  // SORT
  // =========================
  const sortedData = useMemo(() => {
    let sorted = [...filteredData]; // ✅ NOW SAFE

    if (sortConfig) {
      sorted.sort((a, b) => {
        const aValue = safeValue(a[sortConfig.key]);
        const bValue = safeValue(b[sortConfig.key]);

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [filteredData, sortConfig]);

  // =========================
  // PAGINATION
  // =========================
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, pagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="space-y-4">

      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 p-2 border rounded"
          />
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-2 border">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, i) => (
            <tr key={i} className="border-t">

              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {col.render
                    ? col.render(row[col.key], row)
                    : safeValue(row[col.key])}
                </td>
              ))}

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}