import React, { useState } from 'react';
import { Cog, Layers, Puzzle, Radio, Sparkles, Terminal } from 'lucide-react';
import GearSandbox from './GearSandbox';
import ExplodedViewSandbox from './ExplodedViewSandbox';
import SnapAssemblyGame from './SnapAssemblyGame';
import CyberSynthesizer from './CyberSynthesizer';
import { sound } from '../../utils/audio';

export default function InteractiveLab() {
  const [activeTab, setActiveTab] = useState('gears'); // 'gears' | 'exploded' | 'game' | 'synth'

  const tabs = [
    {
      id: 'gears',
      label: '⚙️ 기구역학 샌드박스',
      sub: '기어 맞물림 & 링크 궤적',
      icon: Cog,
      badge: 'Interactive Physics',
    },
    {
      id: 'exploded',
      label: '💥 분해도 & FEA 해석',
      sub: '360° 턴테이블 & 응력 테스트',
      icon: Layers,
      badge: '3D CAD View',
    },
    {
      id: 'game',
      label: '🧩 20초 조립 챌린지',
      sub: '초정밀 스냅핏 미니게임',
      icon: Puzzle,
      badge: 'Mini Game',
    },
    {
      id: 'synth',
      label: '🔊 사이버 신시사이저',
      sub: '공학 사운드 & 오실로스코프',
      icon: Radio,
      badge: 'Web Audio API',
    },
  ];

  const handleTabChange = (id) => {
    sound.playClick();
    setActiveTab(id);
  };

  return (
    <section className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-3xl bg-[#0f1118]/90 border border-[#232839] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#212638]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <Sparkles size={13} className="text-teal-400" />
              <span>디자인공학 인터랙티브 놀이터</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Engineering Playground & Sandbox</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl font-light">
              디자인공학의 핵심 요소인 <strong>기구역학 메커니즘, 3D 분해도, 공차 결합 조립, 주파수 음향</strong>을 직접 만지고 조작하며 즐겨보세요!
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-gray-400 bg-[#141724] px-3.5 py-2 rounded-xl border border-[#252b3d]">
            <Terminal size={14} className="text-blue-400" />
            <span>Interactive Labs: 4 Modes Available</span>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 py-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-b from-[#1c2236] to-[#141826] border-blue-500/80 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/50'
                    : 'bg-[#121520]/80 border-[#222738] hover:bg-[#181d2e] hover:border-gray-500 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-2 rounded-xl ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-[#1b2030] text-gray-400 group-hover:text-white'
                  }`}>
                    <Icon size={18} />
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-blue-950 text-blue-300 border-blue-700/60'
                      : 'bg-[#181c2b] text-gray-400 border-[#262c40]'
                  }`}>
                    {tab.badge}
                  </span>
                </div>

                <div className="font-bold text-sm text-white block">
                  {tab.label}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5 truncate">
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Sandbox Viewport */}
        <div className="relative z-10 pt-2">
          {activeTab === 'gears' && <GearSandbox />}
          {activeTab === 'exploded' && <ExplodedViewSandbox />}
          {activeTab === 'game' && <SnapAssemblyGame />}
          {activeTab === 'synth' && <CyberSynthesizer />}
        </div>
      </div>
    </section>
  );
}
