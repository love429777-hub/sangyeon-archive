import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw, CheckCircle2, Clock, ShieldCheck, Box } from 'lucide-react';
import { sound } from '../../utils/audio';

const PARTS = [
  { id: 'casing', name: '01. 베이스 알루미늄 하우징', color: 'from-blue-600 to-indigo-700', icon: '🏛️', tolerance: '±0.02 mm' },
  { id: 'bearing', name: '02. 세라믹 하이브리드 베어링', color: 'from-cyan-500 to-teal-600', icon: '⚙️', tolerance: '±0.005 mm' },
  { id: 'shaft', name: '03. 티타늄 피니언 드라이브 샤프트', color: 'from-amber-500 to-orange-600', icon: '🔩', tolerance: '±0.01 mm' },
  { id: 'cover', name: '04. 마그네틱 인클로저 커버', color: 'from-purple-500 to-pink-600', icon: '🛡️', tolerance: '±0.02 mm' },
];

export default function SnapAssemblyGame() {
  const [assembled, setAssembled] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const handleSelectPart = (part) => {
    if (assembled.includes(part.id)) return;
    if (!isRunning && assembled.length === 0) {
      setIsRunning(true);
    }
    sound.playHover();
    setSelectedPart(part);
  };

  const handleSnapToSlot = (slotId) => {
    if (!selectedPart) return;

    if (selectedPart.id === slotId && !assembled.includes(slotId)) {
      sound.playSnap();
      const nextAssembled = [...assembled, slotId];
      setAssembled(nextAssembled);
      setSelectedPart(null);

      // Complete game
      if (nextAssembled.length === PARTS.length) {
        setIsCompleted(true);
        setIsRunning(false);
        sound.playSuccess();
        const finalScore = Math.max(1000 - Math.round(timer * 40), 450);
        setScore(finalScore);
      }
    } else {
      sound.playWarning();
    }
  };

  const resetGame = () => {
    sound.playClick();
    setAssembled([]);
    setSelectedPart(null);
    setTimer(0);
    setIsRunning(false);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <div className="space-y-4">
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#131622] border border-[#202536]">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-400" />
          <span className="text-xs font-mono text-gray-300">경과 시간:</span>
          <span className="font-mono text-base font-bold text-white">
            {timer.toFixed(1)}s
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-400" />
          <span className="text-xs font-mono text-gray-300">조립 진척도:</span>
          <span className="font-mono text-base font-bold text-emerald-400">
            {assembled.length} / {PARTS.length}
          </span>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181c28] hover:bg-[#222738] text-gray-300 hover:text-white border border-[#282e42] text-xs font-mono transition-all"
        >
          <RefreshCw size={13} />
          <span>초기화</span>
        </button>
      </div>

      {/* Assembly Workstation Blueprint View */}
      <div className="relative rounded-2xl overflow-hidden border border-[#222736] bg-[#0c0e16] p-6 sm:p-8 min-h-[360px] flex flex-col justify-between">
        {/* Subtle CAD Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blueprint Assembly Target Slots */}
        <div className="relative z-10 max-w-lg mx-auto w-full space-y-3">
          <div className="text-center pb-2">
            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">
              CAD Precision Alignment Jig
            </span>
            <h4 className="text-base font-bold text-white">
              초정밀 구동 모듈 스냅핏 조립대
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              아래 부품 트레이에서 부품을 선택한 후, 일치하는 번호의 슬롯을 클릭해 결합하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PARTS.map((part, idx) => {
              const isLocked = assembled.includes(part.id);
              const isTargeting = selectedPart?.id === part.id;

              return (
                <div
                  key={part.id}
                  onClick={() => handleSnapToSlot(part.id)}
                  className={`relative p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                    isLocked
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-lg shadow-emerald-950/30'
                      : isTargeting
                      ? 'bg-blue-950/60 border-blue-400 text-blue-200 animate-pulse ring-2 ring-blue-500/30'
                      : 'bg-[#121520]/80 border-[#23283a] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{part.icon}</span>
                    <div>
                      <span className="text-xs font-bold block text-white font-mono">
                        SLOT 0{idx + 1}
                      </span>
                      <span className="text-[11px] text-gray-300 block">
                        {part.name.split('. ')[1]}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        공차: {part.tolerance}
                      </span>
                    </div>
                  </div>

                  <div>
                    {isLocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <CheckCircle2 size={15} />
                        <span>결합완료</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#1c2132] text-gray-400 border border-[#2b334c]">
                        {isTargeting ? '여기를 클릭!' : '빈 슬롯'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Modal / Overlay */}
        {isCompleted && (
          <div className="relative z-20 mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 to-indigo-950/90 border border-blue-500/50 text-center space-y-3 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-lg font-bold text-white">
              🎉 0.005mm 초정밀 기구 결합 성공!
            </h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              모든 CAD 부품이 공차 규격 내에 완벽하게 스냅핏 체결되었습니다.
            </p>
            <div className="flex items-center justify-center gap-6 font-mono text-xs pt-1">
              <div>
                <span className="text-gray-400 block text-[10px]">완성 소요시간</span>
                <span className="text-white font-bold text-sm">{timer.toFixed(1)}초</span>
              </div>
              <div className="w-px h-6 bg-blue-800/60" />
              <div>
                <span className="text-gray-400 block text-[10px]">공학 정밀 점수</span>
                <span className="text-amber-400 font-bold text-sm">{score} PTS</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Parts Tray (Dock) */}
      <div className="p-4 rounded-xl bg-[#131622] border border-[#202536] space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <Box size={13} className="text-blue-400" />
            <span>부품 랙 (Parts Tray) — 결합할 부품을 클릭하세요</span>
          </span>
          {selectedPart && (
            <span className="text-teal-400 font-bold animate-pulse">
              선택됨: {selectedPart.name}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PARTS.map((part) => {
            const isLocked = assembled.includes(part.id);
            const isSelected = selectedPart?.id === part.id;

            return (
              <button
                key={part.id}
                disabled={isLocked}
                onClick={() => handleSelectPart(part)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isLocked
                    ? 'opacity-35 bg-[#0e1017] border-[#1d2232] cursor-not-allowed'
                    : isSelected
                    ? 'bg-blue-600/30 border-blue-400 text-white ring-2 ring-blue-500/40'
                    : 'bg-[#171b26] border-[#252b3d] hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{part.icon}</span>
                  <span className="text-xs font-bold text-white font-mono">
                    {part.id.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] font-medium truncate text-gray-300">
                  {part.name.split('. ')[1]}
                </div>
                {isLocked && (
                  <span className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400">
                    장착됨
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
