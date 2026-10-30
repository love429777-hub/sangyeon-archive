import React, { useState } from 'react';
import { Layers, LayoutGrid, Terminal, User, Volume2, VolumeX, Crosshair, Gamepad2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  onOpenAbout, 
  onOpenHarness,
  totalProjects,
  isCadInspector,
  setIsCadInspector,
  isSoundOn,
  setIsSoundOn,
  onTriggerEasterEgg,
  onScrollToLab
}) {
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    sound.playClick();
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      setLogoClicks(0);
      onTriggerEasterEgg();
    }
  };

  const toggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const toggleCadInspector = () => {
    sound.playClick();
    setIsCadInspector(!isCadInspector);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0c10]/90 border-b border-[#1f242d] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & Title with Secret Easter Egg clicker */}
        <div className="flex items-center gap-3 sm:gap-4 select-none">
          <button
            onClick={handleLogoClick}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-mono font-bold text-lg border border-blue-400/30 hover:scale-105 active:scale-95 transition-transform"
            title="5회 연속 클릭 시 히든 오버드라이브 이스터에그 발동!"
          >
            SY
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-blue-400 font-medium">
                Portfolio & Digital Archive
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/70 text-blue-300 border border-blue-800/60">
                Vol. 2026
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white flex items-baseline gap-2">
              <span>디자인공학과 정상연</span>
              <span className="hidden sm:inline text-xs text-gray-400 font-normal font-mono">
                / Design Engineering
              </span>
            </h1>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Jump to Interactive Playground Button */}
          <button
            onClick={() => {
              sound.playClick();
              onScrollToLab();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-900/60 to-purple-900/60 hover:from-blue-800/80 hover:to-purple-800/80 text-blue-300 border border-blue-600/40 text-xs font-mono transition-all shadow-sm group"
          >
            <Gamepad2 size={14} className="text-teal-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">인터랙티브 랩</span>
          </button>

          {/* CAD Inspector Crosshair Cursor Toggle */}
          <button
            onClick={toggleCadInspector}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              isCadInspector
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-900/40 ring-1 ring-cyan-400/50'
                : 'bg-[#151821] border-[#272c38] text-gray-400 hover:text-white'
            }`}
            title="CAD 십자선 실시간 치수 측정 커서 모드"
          >
            <Crosshair size={14} className={isCadInspector ? 'animate-spin' : ''} />
            <span className="hidden lg:inline">{isCadInspector ? '측정기 ON' : 'CAD 측정기'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg text-xs font-mono transition-all border ${
              isSoundOn
                ? 'bg-blue-950/70 border-blue-500/50 text-blue-300'
                : 'bg-[#151821] border-[#272c38] text-gray-500 hover:text-gray-300'
            }`}
            title={isSoundOn ? '기계식 사운드 효과 끄기' : '기계식 사운드 효과 켜기'}
          >
            {isSoundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="hidden lg:flex items-center bg-[#151821] p-1 rounded-lg border border-[#272c38]">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={14} />
              <span>도록</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('table');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>인덱스</span>
            </button>
          </div>

          {/* Agent & Harness Info Modal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHarness();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-[#151821] hover:bg-[#1d2230] text-gray-300 hover:text-blue-400 border border-[#272c38] text-xs font-mono transition-all group"
            title="에이전트 및 하네스 파이프라인 정보"
          >
            <Terminal size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">하네스</span>
          </button>

          {/* About & Profile Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAbout();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-md shadow-blue-600/20"
          >
            <User size={14} />
            <span className="hidden sm:inline">소개</span>
          </button>
        </div>
      </div>
    </header>
  );
}
