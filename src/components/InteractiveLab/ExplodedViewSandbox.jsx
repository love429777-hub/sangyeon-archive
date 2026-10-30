import React, { useState, useEffect, useRef } from 'react';
import { Layers, AlertTriangle, RotateCw, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/audio';

function getFEAColor(force, baseIdx) {
  const stressRatio = Math.min(force / 700 + baseIdx * 0.12, 1);
  if (stressRatio < 0.35) return '#06b6d4'; // Cyan - Low
  if (stressRatio < 0.65) return '#10b981'; // Green - Moderate
  if (stressRatio < 0.85) return '#f59e0b'; // Yellow - Yield
  return '#ef4444'; // Red - High stress
}

function drawPseudo3DBlock(ctx, cx, cy, w, h, d, angle, fillColor, strokeColor, isWire) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // 8 vertices of cuboid
  const hw = (w / 2) * cos - (d / 2) * sin * 0.4;
  const hd = (w / 2) * sin * 0.4 + (d / 2) * cos * 0.4;

  ctx.save();
  // Top Face
  ctx.beginPath();
  ctx.moveTo(cx, cy - h / 2 - hd);
  ctx.lineTo(cx + hw, cy - h / 2);
  ctx.lineTo(cx, cy - h / 2 + hd);
  ctx.lineTo(cx - hw, cy - h / 2);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  if (!isWire) {
    ctx.globalAlpha = 0.95;
    ctx.fill();
  }
  ctx.stroke();

  // Front Left Face
  ctx.beginPath();
  ctx.moveTo(cx - hw, cy - h / 2);
  ctx.lineTo(cx, cy - h / 2 + hd);
  ctx.lineTo(cx, cy + h / 2 + hd);
  ctx.lineTo(cx - hw, cy + h / 2);
  ctx.closePath();
  if (!isWire) {
    ctx.globalAlpha = 0.8;
    ctx.fill();
  }
  ctx.stroke();

  // Front Right Face
  ctx.beginPath();
  ctx.moveTo(cx, cy - h / 2 + hd);
  ctx.lineTo(cx + hw, cy - h / 2);
  ctx.lineTo(cx + hw, cy + h / 2);
  ctx.lineTo(cx, cy + h / 2 + hd);
  ctx.closePath();
  if (!isWire) {
    ctx.globalAlpha = 0.65;
    ctx.fill();
  }
  ctx.stroke();

  ctx.restore();
}

export default function ExplodedViewSandbox() {
  const canvasRef = useRef(null);
  const [rotationY, setRotationY] = useState(25);
  const [explosion, setExplosion] = useState(35); // 0 to 100%
  const [loadForce, setLoadForce] = useState(220); // 0 to 900 N
  const [material, setMaterial] = useState('anodized'); // 'anodized' | 'titanium' | 'wireframe' | 'fea'
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  // Overload trigger
  useEffect(() => {
    if (loadForce > 650) {
      sound.playWarning();
    }
  }, [loadForce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Subtle isometric/radial grid
    ctx.strokeStyle = '#1b202e';
    ctx.lineWidth = 1;
    for (let r = 40; r < 300; r += 50) {
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2 + 70, r, r * 0.45, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    const rad = (rotationY * Math.PI) / 180;
    const explodeGap = (explosion / 100) * 85;

    // 4 Assemblies stacked along Z/Y axis
    const parts = [
      { name: 'Base Mount CNC', baseY: 80, height: 35, width: 140, depth: 80, color: '#2563eb' },
      { name: 'Planetary Gear Core', baseY: 25, height: 40, width: 110, depth: 70, color: '#3b82f6' },
      { name: 'Ceramic Bearing Unit', baseY: -25, height: 25, width: 90, depth: 60, color: '#60a5fa' },
      { name: 'Magnetic Top Housing', baseY: -75, height: 30, width: 130, depth: 75, color: '#1d4ed8' },
    ];

    // Render exploded parts from back to front
    parts.forEach((p, idx) => {
      // Offset position based on explosion ratio
      const yOffset = p.baseY + (idx - 1.5) * explodeGap;
      const cx = width / 2;
      const cy = height / 2 + yOffset;

      let fill = p.color;
      let stroke = '#ffffff';

      if (material === 'titanium') {
        fill = '#64748b';
        stroke = '#94a3b8';
      } else if (material === 'wireframe') {
        fill = 'rgba(15, 23, 42, 0.4)';
        stroke = '#38bdf8';
      } else if (material === 'fea') {
        fill = getFEAColor(loadForce, idx);
        stroke = loadForce > 650 ? '#ff0055' : '#ffffff';
      }

      // Draw isometric pseudo-3D cylinder / cuboid block
      drawPseudo3DBlock(ctx, cx, cy, p.width, p.height, p.depth, rad, fill, stroke, material === 'wireframe');

      // Leader line and part callout in exploded view
      if (explosion > 25) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx + p.width * 0.5, cy);
        ctx.lineTo(cx + p.width * 0.5 + 40, cy - 10);
        ctx.lineTo(cx + p.width * 0.5 + 90, cy - 10);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(`0${idx + 1}. ${p.name}`, cx + p.width * 0.5 + 45, cy - 14);
      }
    });

    // Central Assembly Axis Line
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - 160);
    ctx.lineTo(width / 2, height / 2 + 160);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [rotationY, explosion, loadForce, material]);

  // Drag to rotate turntable
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    setRotationY((prev) => (prev + deltaX * 0.8) % 360);
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="space-y-4">
      {/* 3D Viewport */}
      <div 
        className="relative rounded-2xl overflow-hidden border border-[#222736] bg-[#0c0e15] shadow-xl select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={700}
          height={380}
          className="w-full h-[320px] sm:h-[380px] block cursor-grab active:cursor-grabbing"
        />

        {/* Floating Hint */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#121622]/90 backdrop-blur-md border border-[#262c3e] text-xs font-mono space-y-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <RotateCw size={13} className="text-blue-400 animate-spin" />
            <span className="text-gray-300 font-bold">마우스 드래그로 360° 회전</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            회전각: <span className="text-blue-400">{Math.round(rotationY)}°</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            분해율: <span className="text-teal-400">{explosion}%</span>
          </div>
        </div>

        {/* Overload Alert Badge */}
        {loadForce > 650 && (
          <div className="absolute top-4 right-4 px-3 py-2 rounded-xl bg-red-950/90 border border-red-500 text-red-300 text-xs font-mono font-bold flex items-center gap-2 animate-bounce">
            <AlertTriangle size={15} className="text-red-400" />
            <span>최대 허용 응력 초과 (OVERLOAD)</span>
          </div>
        )}
      </div>

      {/* Control Sliders & Shaders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#131622] border border-[#202536]">
        {/* Explosion slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-gray-400 flex items-center gap-1">
              <Layers size={13} />
              <span>분해도 전개 (Exploded View)</span>
            </span>
            <span className="text-blue-400 font-bold">{explosion}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={explosion}
            onChange={(e) => {
              setExplosion(Number(e.target.value));
              sound.playHover();
            }}
            className="w-full accent-blue-500 h-1.5 bg-[#202538] rounded-lg cursor-pointer"
          />
        </div>

        {/* Load Force Slider (FEA) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-gray-400 flex items-center gap-1">
              <ShieldAlert size={13} />
              <span>가압 하중 (FEA Load)</span>
            </span>
            <span className={loadForce > 650 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
              {loadForce} N
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="850"
            value={loadForce}
            onChange={(e) => {
              setLoadForce(Number(e.target.value));
              if (material !== 'fea') setMaterial('fea');
              sound.playHover();
            }}
            className="w-full accent-red-500 h-1.5 bg-[#202538] rounded-lg cursor-pointer"
          />
        </div>

        {/* Material Shader Buttons */}
        <div className="space-y-1">
          <span className="text-gray-400 text-xs font-mono block">렌더링 셰이더</span>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'anodized', label: '블루 알루미늄' },
              { id: 'titanium', label: '티타늄 CMF' },
              { id: 'wireframe', label: 'CAD 와이어' },
              { id: 'fea', label: '🌈 응력 해석' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  sound.playClick();
                  setMaterial(m.id);
                }}
                className={`px-2 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  material === m.id
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-[#181c28] text-gray-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
