import React, { useState } from 'react';
import { mockWorks, Work } from '../data';
import { WorkCard } from '../components/WorkCard';
import { FilterToolbar } from '../components/FilterToolbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function WorksList() {
  const [works, setWorks] = useState<Work[]>(mockWorks);
  const [filterType, setFilterType] = useState<'all' | Work['type']>('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredWorks = works.filter(work => {
    const matchesType = filterType === 'all' || work.type === filterType;
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          work.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filterRating === 'all' || 
                          (filterRating === '5' && work.rating === 5) ||
                          (filterRating === '4' && work.rating >= 4) ||
                          (filterRating === '3' && work.rating >= 3) ||
                          (filterRating === '0' && work.rating === 0);
    
    return matchesType && matchesSearch && matchesRating;
  });

  const total = filteredWorks.length;
  const pageCount = Math.ceil(total / pageSize);
  const currentData = filteredWorks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = (id: string) => {
    setWorks(works.filter(w => w.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-700 ease-out fill-mode-forwards max-w-[1440px] mx-auto w-full">
      <FilterToolbar 
        filterType={filterType} 
        onFilterTypeChange={(type) => { setFilterType(type); setCurrentPage(1); }}
        filterRating={filterRating}
        onFilterRatingChange={(rating) => { setFilterRating(rating); setCurrentPage(1); }}
        searchQuery={searchQuery}
        onSearchChange={(query) => { setSearchQuery(query); setCurrentPage(1); }}
      />
      
      {currentData.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10 mt-6">
            {currentData.map((work) => (
              <WorkCard key={work.id} work={work} onDelete={handleDelete} />
            ))}
          </div>

          {/* Elegant Pagination matching screenshot data needs but retaining style */}
          <div className="mt-16 pt-6 flex items-center justify-between border-t border-[var(--color-border)]/50 text-sm">
            <div className="text-[var(--color-ink-light)]">
              共 <span className="font-medium text-[var(--color-ink)]">{total}</span> 条记录
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-transparent border border-[var(--color-border)] rounded px-2 py-1 text-[var(--color-ink-light)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value={10}>10 条/页</option>
                <option value={20}>20 条/页</option>
                <option value={50}>50 条/页</option>
              </select>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-sm hover:bg-[var(--color-surface)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-ink)] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs font-medium text-[var(--color-primary)]">
                  {currentPage}
                </span>
                <span className="px-1 text-[var(--color-ink-light)]">/</span>
                <span className="px-2 text-[var(--color-ink-light)]">{pageCount || 1}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount || pageCount === 0}
                  className="p-1.5 rounded-sm hover:bg-[var(--color-surface)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-ink)] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-[var(--color-border)] rounded-md bg-[var(--color-surface)]/50 mt-6">
          <p className="text-[var(--color-ink-light)] text-lg font-serif mb-2">书房里暂时没有找到相关的藏品</p>
          <button 
            onClick={() => { setSearchQuery(''); setFilterType('all'); setFilterRating('all'); }}
            className="text-[var(--color-primary)] hover:underline text-sm font-medium transition-colors"
          >
            清空搜索条件
          </button>
        </div>
      )}
    </div>
  );
}
