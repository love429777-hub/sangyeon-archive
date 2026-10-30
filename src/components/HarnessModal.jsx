import React from 'react';
import { X, Terminal, Bot, Sparkles, Play } from 'lucide-react';

export default function HarnessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl my-auto rounded-2xl bg-[#0f1118] border border-[#272c3d] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141722] border-b border-[#232736]">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
            <Terminal size={16} />
            <span>AGENT & HARNESS ARCHITECTURE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#202535] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          <div>
            <h3 className="text-xl font-bold text-white">
              ‘디자인공학과 정상연’ 전용 에이전트 및 하네스 시스템
            </h3>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              본 웹사이트는 작품 등록부터 검수, 배포까지 스스로 관리할 수 있는 맞춤형 AI 에이전트와 자동화 하네스(Harness)로 구축되었습니다.
            </p>
          </div>

          {/* 3 Dedicated Agents */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bot size={14} />
              <span>3대 특화 서브에이전트 (Subagents)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#131520] border border-[#232738] space-y-2">
                <span className="font-mono text-blue-400 font-bold block text-xs">
                  catalog-curator
                </span>
                <p className="text-[11px] text-gray-300 leading-normal">
                  작품 메모, 사진, CAD 파일을 바탕으로 도록 수준의 국/영문 해설, CMF 및 공학 스펙을 작성합니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#131520] border border-[#232738] space-y-2">
                <span className="font-mono text-blue-400 font-bold block text-xs">
                  archive-engineer
                </span>
                <p className="text-[11px] text-gray-300 leading-normal">
                  반응형 도록 웹 UI, 갤러리 라이트박스, 필터링, 엔지니어링 인덱스 테이블 등 프론트엔드를 개발합니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#131520] border border-[#232738] space-y-2">
                <span className="font-mono text-blue-400 font-bold block text-xs">
                  quality-critic
                </span>
                <p className="text-[11px] text-gray-300 leading-normal">
                  스키마 유효성, 이미지 누락, 타이포그래피 정렬, 모바일 화면 적합성을 엄밀히 검증합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Harness CLI Commands */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Play size={14} />
              <span>하네스 자동화 명령어 (Harness Tooling)</span>
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#0b0c10] border border-[#202536] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-blue-400">npm run harness:add</span>
                <span className="text-gray-400 font-sans text-xs">새 도록 프로젝트 스캐폴딩 생성</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0b0c10] border border-[#202536] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-blue-400">npm run harness:validate</span>
                <span className="text-gray-400 font-sans text-xs">데이터 필수 필드 및 스키마 검증</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0b0c10] border border-[#202536] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-blue-400">npm run harness:stats</span>
                <span className="text-gray-400 font-sans text-xs">등록 작품 현황 및 설계 도구 통계 리포트</span>
              </div>
            </div>
          </div>

          {/* How to add new work with AI */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-2">
            <div className="flex items-center gap-2 text-blue-300 font-semibold text-xs">
              <Sparkles size={14} />
              <span>작품을 추가하고 싶을 때</span>
            </div>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              채팅창에 <strong className="text-white">"이번에 작업한 OOO 프로젝트 도록에 추가해줘"</strong>라고 말씀하시거나, 사진과 대략적인 메모(사용한 툴, 재질 등)를 알려주시면 전담 에이전트가 완벽한 도록 데이터로 등록 및 검수까지 원클릭으로 처리합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
