import React, { useState } from 'react';
import { 
  ArrowDownRight, 
  Gamepad2, 
  GraduationCap, 
  Activity, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { sound } from '../utils/audio';
import HeroInteractiveMechanism from './HeroInteractiveMechanism';

export default function HeroBanner({ totalProjects, onExplore, onExploreLab }) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const stories = [
    {
      num: '01',
      title: '학부 기초 및 전공 과제',
      tag: 'Foundation & Biomimicry',
      desc: '3D 파라메트릭 CAD 기구 모델링, 생체모방 허니컴 구조, 친환경 균사체 복합재 탐구.'
    },
    {
      num: '02',
      title: '졸업 캡스톤 & 수상작',
      tag: 'Mechanism & Hardware',
      desc: '햅틱 물리 인터페이스, 편심 캠 연속 키네틱 조명 등 고난도 링크 메커니즘과 전자 기구 융합.'
    },
    {
      num: '03',
      title: '졸업 후 독립 심화 연구',
      tag: 'Production & FEA Rigor',
      desc: '실제 양산 금형성과 고하중 구조해석(FEA)을 정밀 반영한 차세대 모듈러 워크벤치 설계.'
    }
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#1f242d] bg-gradient-to-b from-[#10141e]/90 via-[#0b0c10]/95 to-[#0b0c10] backdrop-blur-md py-12 sm:py-16 lg:py-20">
      {/* Background Subtle Tech Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#3b82f6 1.2px, transparent 1.2px), radial-gradient(#1e293b 1px, #0b0c10 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px'
        }}
      />

      {/* Cyber Laser Scanner Sweep Beam (상하 레이저 스캔 빔) */}
      <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none laser-scanner-beam" />

      {/* Ambient Radial Glowing Flares */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none holo-ambient-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: Main Manifesto & Live Telemetry (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Telemetry Header Tickers */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white">SYSTEM: ONLINE</span>
                <span className="text-gray-500">|</span>
                <span className="text-teal-300">CAD KINEMATICS 60FPS</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/50 text-purple-300 text-xs font-mono">
                <GraduationCap size={13} className="text-purple-400" />
                <span>대학 학부부터 졸업 후 연구까지</span>
              </div>
            </div>

            {/* Giant Futuristic Headline with Metallic Glow */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                조형적 심미성과 <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                  기구역학적 정밀함의
                </span> 융합
              </h2>
              <div className="text-xs sm:text-sm font-mono text-cyan-400 flex items-center gap-2 pt-1">
                <span>[AESTHETIC RIGOR]</span>
                <span className="text-gray-600">×</span>
                <span>[ENGINEERING DEPTH]</span>
                <span className="text-gray-600">×</span>
                <span>[3D MECHANISMS]</span>
              </div>
            </div>

            {/* Manifesto Paragraph */}
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light leading-relaxed">
              디자인공학도 <strong className="text-white font-medium">정상연</strong>의 대학 학부 과제, 졸업 캡스톤, 그리고 그 이후의 심화 설계 프로젝트를 집대성한 개인 아카이브 겸 디지털 도록입니다.
              단순한 렌더링 나열을 넘어, 우측의 <strong className="text-cyan-300">실시간 3D 기구 분해도</strong>와 CMF, 구조 해석 및 배경의 키네틱 조형을 경험해 보세요.
            </p>

            {/* Narrative Timeline Tabs (학부 -> 캡스톤 -> 독립연구) */}
            <div className="p-3.5 rounded-2xl bg-[#141824]/90 border border-[#23293c] backdrop-blur-md space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-[#202636] pb-2">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Activity size={13} />
                  <span>궤적별 아카이브 내러티브</span>
                </span>
                <span>{stories[activeStoryIdx].tag}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {stories.map((s, idx) => {
                  const isActive = activeStoryIdx === idx;
                  return (
                    <button
                      key={s.num}
                      onClick={() => {
                        sound.playClick();
                        setActiveStoryIdx(idx);
                      }}
                      className={`p-2 rounded-xl text-left transition-all border ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                          : 'bg-[#181d2c] border-[#252b3e] text-gray-400 hover:text-white hover:bg-[#1f2538]'
                      }`}
                    >
                      <span className="block text-[10px] font-mono font-bold opacity-80">
                        STAGE {s.num}
                      </span>
                      <span className="block text-xs font-semibold truncate mt-0.5">
                        {s.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-gray-300 font-light leading-relaxed pt-1 flex items-start gap-1.5">
                <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>{stories[activeStoryIdx].desc}</span>
              </p>
            </div>

            {/* Action Buttons & Quick Stats Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onExplore();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 active:scale-95 group"
              >
                <span>아카이브 도록 열람</span>
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onExploreLab();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#171c2a] hover:bg-[#20273c] text-purple-300 border border-purple-500/40 font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 group"
              >
                <Gamepad2 size={16} className="text-teal-400 group-hover:rotate-12 transition-transform" />
                <span>🕹️ 기구역학 랩 플레이</span>
              </button>

              <div className="flex items-center gap-5 px-4 py-2.5 rounded-xl bg-[#131722]/90 border border-[#23293c] text-xs font-mono text-gray-400">
                <div>
                  <span className="text-white font-bold block text-sm">{totalProjects}개</span>
                  <span className="text-[10px]">등록 작품</span>
                </div>
                <div className="w-px h-6 bg-[#252c3e]" />
                <div>
                  <span className="text-cyan-400 font-bold block text-sm">3D Core</span>
                  <span className="text-[10px]">인터랙티브</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Impact 3D Interactive Kinematics Mechanism Core (5 Columns) */}
          <div className="lg:col-span-5 relative">
            {/* Decorative Cyber Frame Badges */}
            <div className="absolute -top-3 -right-3 z-30 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-[#0b0e17]/90 text-cyan-400 font-mono text-[10px] border border-cyan-500/40 backdrop-blur-md">
              <ShieldCheck size={12} className="text-teal-400" />
              <span>FEA & CMF ACCREDITED</span>
            </div>

            {/* The 3D Interactive Kinematics Mechanism Component */}
            <HeroInteractiveMechanism />
          </div>

        </div>
      </div>
    </section>
  );
}
