import React from 'react';
import { Search } from 'lucide-react';
import { Work } from '../data';

interface FilterToolbarProps {
  filterType: 'all' | Work['type'];
  onFilterTypeChange: (type: 'all' | Work['type']) => void;
  filterRating: string;
  onFilterRatingChange: (rating: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterToolbar({ filterType, onFilterTypeChange, filterRating, onFilterRatingChange, searchQuery, onSearchChange }: FilterToolbarProps) {
  const tabs = [
    { id: 'all', label: '全部馆藏' },
    { id: 'movie', label: '电影' },
    { id: 'book', label: '书籍' },
    { id: 'game', label: '游戏' },
  ] as const;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--color-border)]/50">
      <div className="flex flex-wrap items-center space-x-6 gap-y-4">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterTypeChange(tab.id)}
              className={`relative pb-1 text-[15px] transition-colors duration-200 ${
                filterType === tab.id 
                  ? 'text-[var(--color-ink)] font-medium' 
                  : 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)]'
              }`}
            >
              {tab.label}
              {filterType === tab.id && (
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-[var(--color-primary)] rounded-t-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Rating Filter */}
        <div className="group relative">
          <select 
            value={filterRating} 
            onChange={(e) => onFilterRatingChange(e.target.value)}
            className="text-sm bg-transparent border-b border-[var(--color-border)] pb-1 focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-ink-light)] cursor-pointer appearance-none pr-6"
          >
            <option value="all">评分不限</option>
            <option value="5">神作 (5.0)</option>
            <option value="4">优秀 (4.0+)</option>
            <option value="3">良好 (3.0+)</option>
            <option value="0">暂无评分</option>
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-[var(--color-ink-light)]">▼</span>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 md:w-64 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[var(--color-ink-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="搜索标题或作者..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-9 pr-3 py-1.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-ink-light)] text-[var(--color-ink)]"
          />
        </div>
      </div>
    </div>
  );
}
