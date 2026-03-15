'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ placeholder = 'Search...', onSearch, filters = [] }) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value, selectedFilters);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...selectedFilters, [filterName]: value };
    setSelectedFilters(newFilters);
    onSearch(query, newFilters);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedFilters({});
    onSearch('', {});
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-input bg-background text-sm"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <select
              key={filter.name}
              value={selectedFilters[filter.name] || ''}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
}
