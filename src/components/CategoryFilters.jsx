import React from 'react';
import { Search, X, GraduationCap, Rocket, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedEra,
  onSelectEra,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) {
  return (
    <div className="space-y-4 py-6 border-b border-[#1f242d]">
      {/* Era / Timeline Selection Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#181c26]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
            <Sparkles size={13} className="text-blue-400" />
            <span>작업 타임라인:</span>
          </span>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121520] border border-[#222736]">
            {[
              { id: 'all', label: '전체 프로젝트', icon: Sparkles },
              { id: 'university', label: '🎓 대학 학부 시절', icon: GraduationCap },
              { id: 'postgraduate', label: '🚀 졸업 후 / 독립 연구', icon: Rocket },
            ].map((era) => {
              const isSelected = selectedEra === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectEra(era.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1f2e]'
                  }`}
                >
                  {era.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-xs font-mono text-gray-400">
          표시 중: <span className="text-blue-400 font-bold">{filteredCount}</span> / {totalCount}개
        </div>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('All');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-[#151821] text-gray-400 hover:text-white border border-[#262b37]'
            }`}
          >
            전체 분야
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                onSelectCategory(cat);
              }}
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
              onClick={() => {
                sound.playClick();
                onSearchChange('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
