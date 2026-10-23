import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) {
  return (
    <div className="space-y-4 py-6 border-b border-[#1f242d]">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => onSelectCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-[#151821] text-gray-400 hover:text-white border border-[#262b37]'
            }`}
          >
            전체 아카이브 ({totalCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#151821] text-gray-400 hover:text-white border border-[#262b37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px] sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="작품명, SolidWorks, CMF 소재 검색..."
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#141720] border border-[#262b37] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Result Indicator if filtering */}
      {(selectedCategory !== 'All' || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-1">
          <span>
            검색 결과: <strong className="text-white">{filteredCount}</strong>건 표시 중
          </span>
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="text-blue-400 hover:underline"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
