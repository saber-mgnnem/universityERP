'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

export default function DataTable({
  columns,
  data = [],
  actions,
  searchable = true,
  pagination = true
}) {
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;

    return data.filter((item) =>
      columns.some((col) =>
        String(item?.[col.key] ?? '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, columns, searchable]);

  const sortedData = useMemo(() => {
    let sorted = [...filteredData];

    if (sortConfig) {
      sorted.sort((a, b) => {
        const aValue = a?.[sortConfig.key];
        const bValue = b?.[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, pagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === 'asc'
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div className="space-y-4">

      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5" />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="w-full pl-10 p-2 border rounded"
          />
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="p-2 border cursor-pointer"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, i) => (
            <tr key={i} className="border-t">

              {columns.map((col) => (
                <td key={col.key} className="p-2">

                  {col.render
                    ? col.render(item?.[col.key], item)
                    : item?.[col.key]}

                </td>
              ))}

              {actions && (
                <td className="p-2">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => action.onClick(item)}
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}