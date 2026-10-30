import React, { useEffect } from 'react';
import { Sparkles, Zap, Trophy, X } from 'lucide-react';
import { sound } from '../utils/audio';

export default function EasterEggOverdrive({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      sound.playSuccess();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div 
        className="relative max-w-lg w-full p-8 rounded-3xl bg-gradient-to-b from-[#131726] to-[#0a0c14] border-2 border-pink-500/80 shadow-[0_0_60px_rgba(236,72,153,0.35)] text-center space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Ambient Backdrop */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-600 text-white shadow-xl shadow-pink-500/30 animate-bounce">
          <Zap size={36} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/60 text-pink-300 font-mono text-xs">
            <Sparkles size={13} />
            <span>SECRET EASTER EGG UNLOCKED!</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            ⚡ ANTIGRAVITY CAD OVERDRIVE
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-light">
            히든 이스터에그를 발견하셨습니다! <br />
            정상연의 디자인공학 도록은 엄밀한 기구설계와 창의적인 재미(Playfulness)의 완벽한 융합을 지향합니다.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#161a29] border border-[#2b334a] font-mono text-xs text-left space-y-1.5 text-gray-300">
          <div className="text-pink-400 font-bold flex items-center gap-2">
            <Trophy size={14} />
            <span>엔지니어링 마스터 칭호 획득</span>
          </div>
          <div className="text-[11px] text-gray-400">
            • 3D CAD 가속 렌더링 파이프라인 활성화 <br />
            • Web Audio API 오실로스코프 주파수 동기화 완료 <br />
            • 4대 에이전트 하네스 풀 모니터링 가동 중
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-pink-600/30 hover:opacity-95 transition-opacity"
        >
          계속해서 놀이터 즐기기
        </button>
      </div>
    </div>
  );
}
