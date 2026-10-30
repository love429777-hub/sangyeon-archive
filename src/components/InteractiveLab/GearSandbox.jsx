import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Zap, Gauge, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

function drawGear(ctx, cx, cy, radius, teeth, rotation, strokeColor, fillColor) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  const toothDepth = radius * 0.16;
  const outerRadius = radius + toothDepth;
  const innerRadius = radius - toothDepth;

  for (let i = 0; i < teeth; i++) {
    const a0 = ((i - 0.25) * 2 * Math.PI) / teeth;
    const a1 = ((i - 0.1) * 2 * Math.PI) / teeth;
    const a2 = ((i + 0.1) * 2 * Math.PI) / teeth;
    const a3 = ((i + 0.25) * 2 * Math.PI) / teeth;

    ctx.lineTo(innerRadius * Math.cos(a0), innerRadius * Math.sin(a0));
    ctx.lineTo(outerRadius * Math.cos(a1), outerRadius * Math.sin(a1));
    ctx.lineTo(outerRadius * Math.cos(a2), outerRadius * Math.sin(a2));
    ctx.lineTo(innerRadius * Math.cos(a3), innerRadius * Math.sin(a3));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center bore & Keyway
  ctx.fillStyle = '#0b0c10';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Pitch circle reference line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

export default function GearSandbox() {
  const canvasRef = useRef(null);
  const [rpm, setRpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOverdrive, setIsOverdrive] = useState(false);
  const [showTracer, setShowTracer] = useState(true);
  const tracerPointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = '#1e2433';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const effectiveRpm = isOverdrive ? rpm * 2.5 : rpm;
      if (isPlaying) {
        angle += (effectiveRpm * Math.PI) / (180 * 4);
      }

      // Center positions
      const cx1 = width * 0.35;
      const cy1 = height * 0.52;
      const r1 = 70; // Driver gear
      const teeth1 = 20;

      const r2 = 45; // Driven gear
      const teeth2 = 12;
      const distance = r1 + r2 - 3; // Meshing distance
      const cx2 = cx1 + distance * Math.cos(-0.2);
      const cy2 = cy1 + distance * Math.sin(-0.2);

      // Ratio calculation
      const angle2 = -angle * (teeth1 / teeth2) + 0.3;

      // Draw Gear 1 (Driver)
      drawGear(ctx, cx1, cy1, r1, teeth1, angle, isOverdrive ? '#ff0055' : '#3b82f6', '#1e3a8a');
      // Draw Gear 2 (Driven)
      drawGear(ctx, cx2, cy2, r2, teeth2, angle2, isOverdrive ? '#ffaa00' : '#06b6d4', '#155e75');

      // Linkage mechanism attached to Gear 1
      const pinX = cx1 + (r1 * 0.65) * Math.cos(angle);
      const pinY = cy1 + (r1 * 0.65) * Math.sin(angle);

      // Rocker arm fixed point
      const rockerPivotX = width * 0.85;
      const rockerPivotY = height * 0.25;

      // Calculate linkage joint (4-bar linkage coupler)
      const dx = rockerPivotX - pinX;
      const dy = rockerPivotY - pinY;
      const d = Math.hypot(dx, dy);

      const couplerX = pinX + (dx / (d || 1)) * 120 + Math.sin(angle) * 30;
      const couplerY = pinY + (dy / (d || 1)) * 120 + Math.cos(angle) * 20;

      // Draw Coupler Link
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(pinX, pinY);
      ctx.lineTo(couplerX, couplerY);
      ctx.stroke();

      // Draw Rocker Arm
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rockerPivotX, rockerPivotY);
      ctx.lineTo(couplerX, couplerY);
      ctx.stroke();

      // Pivot joints
      [ [cx1, cy1], [cx2, cy2], [pinX, pinY], [couplerX, couplerY], [rockerPivotX, rockerPivotY] ].forEach(([px, py], i) => {
        ctx.fillStyle = i < 2 ? '#ffffff' : (i === 3 ? '#10b981' : '#f59e0b');
        ctx.beginPath();
        ctx.arc(px, py, i === 3 ? 6 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Tracer path for coupler joint
      if (showTracer && isPlaying) {
        tracerPointsRef.current.push({ x: couplerX, y: couplerY });
        if (tracerPointsRef.current.length > 180) {
          tracerPointsRef.current.shift();
        }
      }

      if (showTracer && tracerPointsRef.current.length > 1) {
        ctx.strokeStyle = isOverdrive ? 'rgba(255, 0, 85, 0.7)' : 'rgba(16, 185, 129, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        tracerPointsRef.current.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }

      // Spark particles in Overdrive mode
      if (isOverdrive && isPlaying) {
        const contactX = (cx1 + cx2) / 2;
        const contactY = (cy1 + cy2) / 2;
        ctx.fillStyle = '#fffae0';
        for (let i = 0; i < 4; i++) {
          const spX = contactX + (Math.random() - 0.5) * 30;
          const spY = contactY + (Math.random() - 0.5) * 30;
          ctx.beginPath();
          ctx.arc(spX, spY, Math.random() * 2.5 + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [rpm, isPlaying, isOverdrive, showTracer]);

  const handleOverdrive = () => {
    sound.playWarning();
    setIsOverdrive(!isOverdrive);
  };

  return (
    <div className="space-y-4">
      {/* Interactive Canvas Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-[#222736] bg-[#0d0f17] shadow-xl">
        <canvas
          ref={canvasRef}
          width={700}
          height={380}
          className="w-full h-[320px] sm:h-[380px] block cursor-crosshair"
        />

        {/* Live Telemetry Overlay */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#121622]/90 backdrop-blur-md border border-[#262c3e] text-xs font-mono space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300 font-bold">기구역학 시뮬레이터</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            감속비: <span className="text-blue-400">1 : 1.67 (20T / 12T)</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            출력 속도:{' '}
            <span className={isOverdrive ? 'text-red-400 font-bold animate-pulse' : 'text-emerald-400'}>
              {Math.round(isOverdrive ? rpm * 4.17 : rpm * 1.67)} RPM
            </span>
          </div>
          <div className="text-gray-400 text-[11px]">
            궤적 추적: <span className="text-teal-400">{showTracer ? '기구 커플러 곡선 (Tracer)' : 'OFF'}</span>
          </div>
        </div>

        {/* Overdrive Status Banner */}
        {isOverdrive && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-mono font-bold flex items-center gap-1.5 animate-bounce">
            <Zap size={14} className="fill-red-400" />
            <span>OVERDRIVE ACTIVE</span>
          </div>
        )}
      </div>

      {/* Control Console */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#131622] border border-[#202536]">
        {/* RPM Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-gray-400 flex items-center gap-1">
              <Gauge size={13} />
              <span>입력 모터 속도</span>
            </span>
            <span className="text-blue-400 font-bold">{rpm} RPM</span>
          </div>
          <input
            type="range"
            min="10"
            max="180"
            value={rpm}
            onChange={(e) => {
              setRpm(Number(e.target.value));
              sound.playHover();
            }}
            className="w-full accent-blue-500 h-1.5 bg-[#202538] rounded-lg cursor-pointer"
          />
        </div>

        {/* Play/Pause & Tracer */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setIsPlaying(!isPlaying);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isPlaying
                ? 'bg-[#1b2030] text-gray-200 hover:bg-[#252c42]'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/30'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? '일시정지' : '작동 시작'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowTracer(!showTracer);
            }}
            className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
              showTracer
                ? 'bg-teal-950/60 border-teal-600/50 text-teal-300'
                : 'bg-[#181c28] border-[#292f42] text-gray-400'
            }`}
            title="링크 끝단 궤적 그리기"
          >
            <Sparkles size={14} />
          </button>
        </div>

        {/* Overdrive Turbo Button */}
        <div>
          <button
            onClick={handleOverdrive}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              isOverdrive
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-600/40 animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white'
            }`}
          >
            <Zap size={14} />
            <span>{isOverdrive ? '오버드라이브 해제' : '🔥 기어 과부하 테스트'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
