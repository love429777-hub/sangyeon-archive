import React from 'react';
import { ArrowDownRight, Compass, Box, Gamepad2, GraduationCap, Link2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function HeroBanner({ totalProjects, onExplore, onExploreLab }) {
  return (
    <section className="relative overflow-hidden border-b border-[#1f242d] bg-gradient-to-b from-[#10131a]/80 via-[#0b0c10]/90 to-[#0b0c10]/95 backdrop-blur-sm py-14 sm:py-20">
      {/* Background Subtle Tech Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#1e293b 1px, #0b0c10 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Manifesto */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 text-xs font-mono">
                <GraduationCap size={13} className="text-teal-400" />
                <span>대학 학부 프로젝트부터 졸업 후 독립 연구까지</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[11px] font-mono">
                <Link2 size={12} className="text-pink-400" />
                <span>스크롤 연동 3D 사슬 조형 배경</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              조형적 심미성과 <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                기구역학적 정밀함의
              </span> 융합
            </h2>

            <p className="text-base sm:text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
              디자인공학도 <strong>정상연</strong>의 대학 학부 과제, 졸업 캡스톤, 그리고 그 이후의 심화 설계 프로젝트를 집대성한 개인 아카이브 겸 디지털 도록입니다.
              단순한 렌더링 나열을 넘어, 실제 작동 가능한 메커니즘과 CMF, 구조 해석 및 배경에 흐르는 키네틱 조형을 경험해 보세요.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onExplore();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30 group"
              >
                <span>아카이브 도록 열람</span>
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onExploreLab();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-900/60 to-blue-900/60 hover:from-purple-800/80 hover:to-blue-800/80 text-purple-200 border border-purple-500/40 font-medium text-sm transition-all shadow-lg shadow-purple-900/30 group"
              >
                <Gamepad2 size={16} className="text-teal-400 group-hover:rotate-12 transition-transform" />
                <span>🕹️ 기구역학 랩 플레이</span>
              </button>
              
              <div className="flex items-center gap-6 px-4 py-2 rounded-lg bg-[#151821]/80 border border-[#232834] text-xs font-mono text-gray-400">
                <div>
                  <span className="text-white font-bold block text-sm">{totalProjects}개</span>
                  <span>등록 작품</span>
                </div>
                <div className="w-px h-6 bg-[#272c38]" />
                <div>
                  <span className="text-white font-bold block text-sm">2024 - 2026</span>
                  <span>연도별 타임라인</span>
                </div>
                <div className="w-px h-6 bg-[#272c38]" />
                <div>
                  <span className="text-white font-bold block text-sm">Kinetic 3D</span>
                  <span>사슬 & 파동 배경</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlight Badge / Aesthetic Specs Box */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-[#141720]/90 backdrop-blur-md border border-[#242938] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Compass size={120} className="text-blue-500" />
              </div>
              <div className="space-y-4">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Box size={14} />
                  <span>Archive Narrative</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  학부에서 미래로 이어지는 궤적
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-400 font-normal">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-teal-400 font-bold">01.</span>
                    <span><strong>학부 기초 및 전공 과제</strong>: CAD 기구 모델링, 생체모방 구조, 친환경 바이오 소재 탐구.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-blue-400 font-bold">02.</span>
                    <span><strong>졸업 캡스톤 & 수상작</strong>: 햅틱 물리 인터페이스, 편심 캠 키네틱 조명 등 고난도 설계.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-purple-400 font-bold">03.</span>
                    <span><strong>졸업 후 독립 연구</strong>: 실제 양산성과 구조 해석(FEA)을 고려한 고신뢰성 워크벤치.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
