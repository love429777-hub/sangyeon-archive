import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Radio } from 'lucide-react';
import { sound } from '../../utils/audio';

const KEYS = [
  { note: 'C4', freq: 261.63, label: '도', key: '1' },
  { note: 'D4', freq: 293.66, label: '레', key: '2' },
  { note: 'E4', freq: 329.63, label: '미', key: '3' },
  { note: 'F4', freq: 349.23, label: '파', key: '4' },
  { note: 'G4', freq: 392.00, label: '솔', key: '5' },
  { note: 'A4', freq: 440.00, label: '라', key: '6' },
  { note: 'B4', freq: 493.88, label: '시', key: '7' },
  { note: 'C5', freq: 523.25, label: '도', key: '8' },
];

export default function CyberSynthesizer() {
  const canvasRef = useRef(null);
  const [activeNote, setActiveNote] = useState(null);
  const [waveType, setWaveType] = useState('sine'); // 'sine' | 'triangle' | 'sawtooth' | 'square'
  const activeFreqRef = useRef(0);

  const playTone = useCallback((keyObj) => {
    setActiveNote(keyObj.note);
    activeFreqRef.current = keyObj.freq;
    sound.playNote(keyObj.freq, 0.4, waveType);
    setTimeout(() => {
      setActiveNote(null);
    }, 250);
  }, [waveType]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const found = KEYS.find((k) => k.key === e.key);
      if (found) {
        playTone(found);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playTone]);

  // Oscilloscope Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Subtle oscilloscope grid
      ctx.strokeStyle = '#1a2030';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      phase += 0.08;
      const freq = activeFreqRef.current || 200;
      const amp = activeNote ? 45 : 12;

      // Draw real-time oscillating sine / neon wave
      ctx.beginPath();
      ctx.lineWidth = 3;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#06b6d4');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#ec4899');
      ctx.strokeStyle = gradient;

      for (let x = 0; x < width; x++) {
        let y;
        const normalizedX = (x / width) * 4 * Math.PI;
        if (waveType === 'sine') {
          y = height / 2 + Math.sin(normalizedX * (freq / 80) + phase) * amp;
        } else if (waveType === 'sawtooth') {
          y = height / 2 + (((normalizedX * (freq / 60) + phase) % Math.PI) / Math.PI - 0.5) * amp * 2;
        } else {
          y = height / 2 + (Math.sin(normalizedX * (freq / 80) + phase) > 0 ? amp : -amp);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [activeNote, waveType]);

  return (
    <div className="space-y-4">
      {/* Oscilloscope Screen */}
      <div className="relative rounded-2xl overflow-hidden border border-[#222736] bg-[#0b0d14] shadow-xl">
        <canvas
          ref={canvasRef}
          width={700}
          height={240}
          className="w-full h-[200px] block"
        />

        <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#121622]/90 backdrop-blur-md border border-[#262c3e] text-xs font-mono space-y-1">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-pink-400 animate-pulse" />
            <span className="text-gray-300 font-bold">오실로스코프 주파수 분석</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            현재 파형: <span className="text-blue-400 uppercase">{waveType} Wave</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            활성 음계: <span className="text-emerald-400">{activeNote || 'Standby'}</span>
          </div>
        </div>

        {/* Waveform Selector */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1 rounded-lg bg-[#141824]/90 border border-[#262c3e]">
          {[
            { id: 'sine', label: 'Sine' },
            { id: 'triangle', label: 'Tri' },
            { id: 'sawtooth', label: 'Saw' },
            { id: 'square', label: 'Pulse' },
          ].map((w) => (
            <button
              key={w.id}
              onClick={() => {
                sound.playClick();
                setWaveType(w.id);
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                waveType === w.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Synthesizer Keyboard (Piano Keys) */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#131622] border border-[#202536] space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <Radio size={14} className="text-blue-400" />
            <span>건반을 마우스로 클릭하거나 숫자 키패드 (1 ~ 8)를 눌러 연주해보세요!</span>
          </span>
          <span className="hidden sm:inline text-gray-500">Web Audio API Pure Synthesis</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {KEYS.map((k) => {
            const isActive = activeNote === k.note;

            return (
              <button
                key={k.note}
                onClick={() => playTone(k)}
                className={`flex flex-col items-center justify-between p-3.5 sm:p-5 rounded-xl border transition-all active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-t from-pink-600 to-indigo-600 border-pink-400 text-white shadow-lg shadow-pink-600/40 -translate-y-1'
                    : 'bg-[#181c29] border-[#292f42] hover:bg-[#23293c] text-gray-200 hover:border-gray-500'
                }`}
              >
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-gray-400 mb-2">
                  [{k.key}]
                </span>
                <span className="text-base sm:text-lg font-bold font-mono">
                  {k.label}
                </span>
                <span className="text-[10px] font-mono text-gray-400 mt-1">
                  {k.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
