import React from 'react';
import { Layers, LayoutGrid, ListFilter, Terminal, User, BookOpen } from 'lucide-react';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  onOpenAbout, 
  onOpenHarness,
  totalProjects 
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0c10]/85 border-b border-[#1f242d] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-mono font-bold text-lg border border-blue-400/30">
            SY
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-blue-400 font-medium">
                Portfolio & Digital Archive
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/70 text-blue-300 border border-blue-800/60">
                Vol. 2026
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-baseline gap-2">
              <span>디자인공학과 정상연</span>
              <span className="hidden sm:inline text-xs text-gray-400 font-normal font-mono">
                / Design Engineering
              </span>
            </h1>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* View Mode Toggle: Grid vs Table */}
          <div className="hidden md:flex items-center bg-[#151821] p-1 rounded-lg border border-[#272c38]">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={14} />
              <span>도록 갤러리</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>엔지니어링 인덱스</span>
            </button>
          </div>

          {/* Agent & Harness Info Modal Button */}
          <button
            onClick={onOpenHarness}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#151821] hover:bg-[#1d2230] text-gray-300 hover:text-blue-400 border border-[#272c38] text-xs font-mono transition-all group"
            title="에이전트 및 하네스 파이프라인 정보"
          >
            <Terminal size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">에이전트 하네스</span>
          </button>

          {/* About & Profile Button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-md shadow-blue-600/20"
          >
            <User size={14} />
            <span>디자이너 소개</span>
          </button>
        </div>
      </div>
    </header>
  );
}
