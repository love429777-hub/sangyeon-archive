import React from 'react';
import { Sparkles, ArrowDownRight, Compass, Cpu, Box, Wrench } from 'lucide-react';

export default function HeroBanner({ totalProjects, onExplore }) {
  return (
    <section className="relative overflow-hidden border-b border-[#1f242d] bg-gradient-to-b from-[#10131a] via-[#0b0c10] to-[#0b0c10] py-14 sm:py-20">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-mono">
              <Sparkles size={13} className="text-blue-400" />
              <span>디지털 도록 & 엔지니어링 아카이브</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              조형적 심미성과 <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                기구역학적 정밀함의
              </span> 융합
            </h2>

            <p className="text-base sm:text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
              디자인공학도 <strong>정상연</strong>의 창작물과 설계 프로세스를 집대성한 공식 디지털 도록입니다.
              단순한 3D 렌더링을 넘어, 실제 작동 가능한 메커니즘과 CMF, 구조 해석 및 프로토타입의 전 과정을 엄밀한 기록으로 전달합니다.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30 group"
              >
                <span>아카이브 도록 열람</span>
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              
              <div className="flex items-center gap-6 px-4 py-2 rounded-lg bg-[#151821]/80 border border-[#232834] text-xs font-mono text-gray-400">
                <div>
                  <span className="text-white font-bold block text-sm">{totalProjects}개</span>
                  <span>수록 작품</span>
                </div>
                <div className="w-px h-6 bg-[#272c38]" />
                <div>
                  <span className="text-white font-bold block text-sm">SolidWorks & CMF</span>
                  <span>핵심 스펙</span>
                </div>
                <div className="w-px h-6 bg-[#272c38]" />
                <div>
                  <span className="text-white font-bold block text-sm">3 Agents</span>
                  <span>하네스 자동화</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlight Badge / Aesthetic Specs Box */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-[#141720]/90 border border-[#242938] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Compass size={120} className="text-blue-500" />
              </div>
              <div className="space-y-4">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Box size={14} />
                  <span>Curatorial Principles</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  디자인공학 도록의 3대 원칙
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-400 font-normal">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-blue-400 font-bold">01.</span>
                    <span><strong>형상과 기구의 일체화</strong>: 조형적 아름다움 속에 숨겨진 하중 분산과 메커니즘.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-blue-400 font-bold">02.</span>
                    <span><strong>소재와 공차의 엄밀성</strong>: 알루미늄 CNC, 3D 프린팅, 정밀 가공 CMF 기록.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-blue-400 font-bold">03.</span>
                    <span><strong>과정 중심의 서사</strong>: 아이디어 스케치부터 최종 검증 프로토타입까지 투명한 공개.</span>
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
