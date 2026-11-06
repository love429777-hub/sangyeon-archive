import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  Maximize2, 
  Sparkles, 
  Zap, 
  Eye, 
  Activity, 
  Cpu 
} from 'lucide-react';
import { sound } from '../utils/audio';

// FEA stress colormap helper
function getFEAColor(ratio) {
  if (ratio < 0.25) return '#00f0ff'; // Cyan
  if (ratio < 0.5) return '#10b981';  // Green
  if (ratio < 0.75) return '#fbbf24'; // Yellow
  return '#ef4444';                   // Red max stress
}

export default function HeroInteractiveMechanism() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Interaction states
  const [viewMode, setViewMode] = useState('cmf'); // 'cmf' | 'blueprint' | 'fea'
  const [isExploded, setIsExploded] = useState(false);
  const [isOverdrive, setIsOverdrive] = useState(false);
  const [rpm, setRpm] = useState(120);

  // Rotation angles (degrees)
  const rotationRef = useRef({ x: 22, y: -30, vx: 0, vy: 0.35 });
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, hoverX: 0, hoverY: 0 });
  const animFrameRef = useRef(null);
  const explodeLerpRef = useRef(0); // 0 (assembled) to 1 (fully exploded)
  const gearAngleRef = useRef(0);
  const sparkParticlesRef = useRef([]);

  // Toggle Exploded View
  const handleToggleExplode = () => {
    sound.playSnap();
    setIsExploded(!isExploded);
  };

  // Trigger Overdrive 3-sec speed burst
  const handleTriggerOverdrive = () => {
    if (isOverdrive) return;
    sound.playSuccess();
    setIsOverdrive(true);
    setRpm(380);

    // Create particle sparks
    const sparks = [];
    for (let i = 0; i < 40; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      sparks.push({
        x: 0,
        y: 0,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        life: 1,
        color: Math.random() > 0.5 ? '#00f0ff' : '#fbbf24'
      });
    }
    sparkParticlesRef.current = sparks;

    setTimeout(() => {
      setIsOverdrive(false);
      setRpm(120);
    }, 3200);
  };

  // Change View Mode
  const handleModeChange = (mode) => {
    sound.playClick();
    setViewMode(mode);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const dpr = window.devicePixelRatio || 1;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Smooth explode lerp
      const targetExplode = isExploded ? 1 : 0;
      explodeLerpRef.current += (targetExplode - explodeLerpRef.current) * 0.1;
      const exp = explodeLerpRef.current;

      // Update rotation
      if (!mouseRef.current.isDown) {
        rotationRef.current.y += rotationRef.current.vy * (isOverdrive ? 3.5 : 1);
        rotationRef.current.x += (20 + mouseRef.current.hoverY * 12 - rotationRef.current.x) * 0.05;
      }
      gearAngleRef.current += (isOverdrive ? 0.08 : 0.02);

      const rotX = (rotationRef.current.x * Math.PI) / 180;
      const rotY = (rotationRef.current.y * Math.PI) / 180;

      // 3D projection helper
      const project3D = (x, y, z) => {
        // Rotate around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective scale
        const fov = 420 * dpr;
        const cameraDistance = 500 * dpr;
        const factor = fov / (cameraDistance + z2);

        return {
          px: cx + x1 * factor,
          py: cy + y2 * factor,
          scale: factor,
          depth: z2
        };
      };

      // ----------------------------------------------------
      // Background Radial Tech Grid & Laser Scan in Canvas
      // ----------------------------------------------------
      ctx.save();
      // Tech coordinate grid
      ctx.strokeStyle = viewMode === 'blueprint' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 1 * dpr;
      for (let r = 50 * dpr; r <= 190 * dpr; r += 35 * dpr) {
        ctx.beginPath();
        ctx.ellipse(cx, cy + 40 * dpr, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs at center
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.beginPath();
      ctx.moveTo(cx - 20 * dpr, cy + 40 * dpr);
      ctx.lineTo(cx + 20 * dpr, cy + 40 * dpr);
      ctx.moveTo(cx, cy + 40 * dpr - 20 * dpr);
      ctx.lineTo(cx, cy + 40 * dpr + 20 * dpr);
      ctx.stroke();
      ctx.restore();

      // Exploded axis line connecting all parts
      if (exp > 0.05) {
        ctx.save();
        ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.lineWidth = 1.2 * dpr;
        const topAxis = project3D(0, 0, 140 * exp);
        const btmAxis = project3D(0, 0, -100 * exp);
        ctx.beginPath();
        ctx.moveTo(btmAxis.px, btmAxis.py);
        ctx.lineTo(topAxis.px, topAxis.py);
        ctx.stroke();
        ctx.restore();
      }

      // ====================================================
      // 3D MECHANISM PARTS LAYER
      // ====================================================

      // Helper to render circle in 3D
      const renderCircle3D = (z, radius, style = {}) => {
        const segments = 36;
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const px = Math.cos(theta) * radius;
          const py = Math.sin(theta) * radius;
          const pt = project3D(px, py, z);
          if (i === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.closePath();

        if (style.fill) {
          ctx.fillStyle = style.fill;
          ctx.fill();
        }
        if (style.stroke) {
          ctx.strokeStyle = style.stroke;
          ctx.lineWidth = (style.lineWidth || 1.5) * dpr;
          ctx.stroke();
        }
      };

      // Helper to render extruded gear in 3D
      const renderGear3D = (z, teeth, radius, innerRadius, angleOffset, color, isWire) => {
        const totalPoints = teeth * 4;
        ctx.beginPath();
        for (let i = 0; i <= totalPoints; i++) {
          const a = angleOffset + (i / totalPoints) * Math.PI * 2;
          const isTip = (i % 4 === 1 || i % 4 === 2);
          const r = isTip ? radius : innerRadius;
          const pt = project3D(Math.cos(a) * r, Math.sin(a) * r, z);
          if (i === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.closePath();

        if (!isWire) {
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.strokeStyle = viewMode === 'blueprint' ? '#00f0ff' : viewMode === 'fea' ? '#ef4444' : '#60a5fa';
        ctx.lineWidth = (isWire ? 1.5 : 1) * dpr;
        ctx.stroke();

        // Center hub
        renderCircle3D(z, innerRadius * 0.45, {
          fill: isWire ? null : '#0b0e17',
          stroke: viewMode === 'blueprint' ? '#00f0ff' : '#94a3b8',
          lineWidth: 1.2
        });
      };

      // PART 1: BASE HOUSING & ANNULAR RING (Z = -90 * exp)
      const z1 = -90 * exp;
      const isWire = viewMode === 'blueprint';
      const c1 = viewMode === 'fea' ? getFEAColor(0.2) : viewMode === 'blueprint' ? 'rgba(0, 240, 255, 0.15)' : '#1e2433';

      renderCircle3D(z1, 130, {
        fill: isWire ? 'rgba(6, 182, 212, 0.05)' : c1,
        stroke: viewMode === 'blueprint' ? '#00f0ff' : '#3b82f6',
        lineWidth: 2
      });

      // 8 M4 Mounting Bolt Holes on Ring
      for (let b = 0; b < 8; b++) {
        const bAng = (b / 8) * Math.PI * 2;
        const bx = Math.cos(bAng) * 115;
        const by = Math.sin(bAng) * 115;
        const bPt = project3D(bx, by, z1);
        ctx.beginPath();
        ctx.arc(bPt.px, bPt.py, 3.5 * dpr * bPt.scale, 0, Math.PI * 2);
        ctx.fillStyle = viewMode === 'blueprint' ? '#00f0ff' : '#0f131d';
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 1 * dpr;
        ctx.fill();
        ctx.stroke();
      }

      // Internal gear teeth ring
      renderCircle3D(z1, 95, {
        stroke: viewMode === 'blueprint' ? '#00f0ff' : '#475569',
        lineWidth: 1.2
      });

      // PART 2: SUN GEAR & SPINDLE (Z = -30 * exp)
      const z2 = -30 * exp;
      const c2 = viewMode === 'fea' ? getFEAColor(0.7) : viewMode === 'blueprint' ? 'rgba(0, 240, 255, 0.2)' : '#252e42';
      renderGear3D(z2, 14, 42, 34, gearAngleRef.current * 2, c2, isWire);

      // PART 3: 3 PLANETARY GEARS (Z = 20 * exp)
      const z3 = 20 * exp;
      const planetOrbitR = 66;
      for (let p = 0; p < 3; p++) {
        const pOrbAng = (p / 3) * Math.PI * 2 + gearAngleRef.current * 0.4;
        const px = Math.cos(pOrbAng) * planetOrbitR;
        const py = Math.sin(pOrbAng) * planetOrbitR;

        // Render planetary gear at offset
        const pTeeth = 10;
        const pRad = 26;
        const pInner = 20;
        const pSpin = -gearAngleRef.current * 1.8 + p;

        ctx.save();
        ctx.beginPath();
        for (let i = 0; i <= pTeeth * 4; i++) {
          const a = pSpin + (i / (pTeeth * 4)) * Math.PI * 2;
          const isTip = (i % 4 === 1 || i % 4 === 2);
          const r = isTip ? pRad : pInner;
          const pt = project3D(px + Math.cos(a) * r, py + Math.sin(a) * r, z3);
          if (i === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.closePath();

        const cP = viewMode === 'fea' ? getFEAColor(0.45 + p * 0.2) : viewMode === 'blueprint' ? 'rgba(0, 240, 255, 0.25)' : '#334155';
        if (!isWire) {
          ctx.fillStyle = cP;
          ctx.fill();
        }
        ctx.strokeStyle = viewMode === 'blueprint' ? '#00f0ff' : '#38bdf8';
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        // Planetary Pin
        const centerPin = project3D(px, py, z3);
        ctx.beginPath();
        ctx.arc(centerPin.px, centerPin.py, 3.5 * dpr * centerPin.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#93c5fd';
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // PART 4: PLANET CARRIER TRIANGLE PLATE (Z = 75 * exp)
      const z4 = 75 * exp;
      ctx.save();
      ctx.beginPath();
      for (let p = 0; p < 3; p++) {
        const pOrbAng = (p / 3) * Math.PI * 2 + gearAngleRef.current * 0.4;
        const pt = project3D(Math.cos(pOrbAng) * (planetOrbitR + 8), Math.sin(pOrbAng) * (planetOrbitR + 8), z4);
        if (p === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.closePath();
      const cCarrier = viewMode === 'fea' ? getFEAColor(0.85) : viewMode === 'blueprint' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(30, 41, 59, 0.85)';
      if (!isWire) {
        ctx.fillStyle = cCarrier;
        ctx.fill();
      }
      ctx.strokeStyle = viewMode === 'blueprint' ? '#00f0ff' : '#60a5fa';
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();
      ctx.restore();

      // PART 5: 4-BAR OUTPUT ARM & CALIPER (Z = 135 * exp)
      const z5 = 135 * exp;
      const armLength = 120;
      const armAng = gearAngleRef.current * 0.4;
      const pArmBase = project3D(0, 0, z5);
      const pArmTip = project3D(Math.cos(armAng) * armLength, Math.sin(armAng) * armLength, z5);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pArmBase.px, pArmBase.py);
      ctx.lineTo(pArmTip.px, pArmTip.py);
      ctx.strokeStyle = viewMode === 'blueprint' ? '#00f0ff' : viewMode === 'fea' ? '#ef4444' : '#38bdf8';
      ctx.lineWidth = 4 * dpr;
      ctx.stroke();

      // Caliper end-effector box at tip
      ctx.beginPath();
      ctx.arc(pArmTip.px, pArmTip.py, 8 * dpr * pArmTip.scale, 0, Math.PI * 2);
      ctx.fillStyle = viewMode === 'fea' ? '#ef4444' : '#0284c7';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5 * dpr;
      ctx.fill();
      ctx.stroke();

      // Laser measurement pointer from tip to target
      ctx.beginPath();
      ctx.setLineDash([3 * dpr, 3 * dpr]);
      ctx.moveTo(pArmTip.px, pArmTip.py);
      ctx.lineTo(pArmTip.px + 35 * dpr, pArmTip.py - 25 * dpr);
      ctx.strokeStyle = isOverdrive ? '#f59e0b' : '#00f0ff';
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
      ctx.restore();

      // ====================================================
      // FLOATING 3D CAD DIMENSION HUD LABELS (Shown when Exploded)
      // ====================================================
      if (exp > 0.4) {
        ctx.save();
        ctx.font = `${10 * dpr}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = viewMode === 'blueprint' ? '#00f0ff' : '#93c5fd';
        ctx.globalAlpha = (exp - 0.4) / 0.6;

        // Label 1: Base Housing
        const l1 = project3D(140, 0, z1);
        ctx.fillText('№01. HOUSING RING Ø130 mm [AL6061-T6]', l1.px + 10 * dpr, l1.py);

        // Label 2: Sun Gear
        const l2 = project3D(-70, 40, z2);
        ctx.fillText('№02. SUN SPINDLE z=14, m=1.5', l2.px - 140 * dpr, l2.py);

        // Label 3: Planetary Cluster
        const l3 = project3D(90, 50, z3);
        ctx.fillText('№03. 3x PLANETARY z=10 [POM/BRASS]', l3.px + 10 * dpr, l3.py);

        // Label 4: Output Arm
        const l4 = project3D(-60, -70, z5);
        ctx.fillText('№04. 4-BAR KINEMATICS ARM ±0.01mm', l4.px - 160 * dpr, l4.py);

        ctx.restore();
      }

      // ====================================================
      // PARTICLE SPARKS (During Overdrive Burst)
      // ====================================================
      if (sparkParticlesRef.current.length > 0) {
        ctx.save();
        sparkParticlesRef.current.forEach((sp) => {
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.life -= 0.03;
          ctx.beginPath();
          ctx.arc(cx + sp.x * dpr, cy + sp.y * dpr, 2 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.life);
          ctx.fill();
        });
        sparkParticlesRef.current = sparkParticlesRef.current.filter((sp) => sp.life > 0);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [viewMode, isExploded, isOverdrive]);

  // Mouse interaction handlers for 3D rotation
  const handleMouseDown = (e) => {
    mouseRef.current.isDown = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current.hoverX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.hoverY = (e.clientY - rect.top) / rect.height - 0.5;
    }

    if (!mouseRef.current.isDown) return;
    const deltaX = e.clientX - mouseRef.current.lastX;
    const deltaY = e.clientY - mouseRef.current.lastY;

    rotationRef.current.y += deltaX * 0.75;
    rotationRef.current.x = Math.max(-60, Math.min(60, rotationRef.current.x - deltaY * 0.75));

    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-[400px] sm:h-[460px] rounded-3xl bg-gradient-to-b from-[#131722]/95 via-[#0e111a]/95 to-[#090b10] border border-[#23293c] shadow-2xl overflow-hidden select-none group cursor-grab active:cursor-grabbing backdrop-blur-xl"
    >
      {/* Laser HUD Frame Elements */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-500/40 text-[11px] font-mono text-cyan-300">
          <Activity size={12} className={isOverdrive ? 'animate-pulse text-amber-400' : 'text-teal-400'} />
          <span>3D KINEMATICS CORE</span>
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#161a26] text-gray-400 border border-[#252b3d]">
          {isExploded ? 'EXPLODED: 100%' : 'ASSEMBLED: 0%'}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/40">
          RPM: {rpm}
        </span>
        <button
          onClick={handleTriggerOverdrive}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border ${
            isOverdrive
              ? 'bg-amber-500 text-black border-amber-300 font-bold shadow-lg shadow-amber-500/50 scale-105'
              : 'bg-[#181d2a] hover:bg-amber-950/60 text-amber-400 border-amber-500/30'
          }`}
          title="3초간 초고속 회전 부스트 가속"
        >
          <Zap size={12} className={isOverdrive ? 'animate-bounce' : ''} />
          <span>{isOverdrive ? 'OVERDRIVE!' : '가속 부스트'}</span>
        </button>
      </div>

      {/* Main 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Interactive Drag & Rotate Helper Hint */}
      <div className="absolute bottom-16 sm:bottom-14 left-4 z-20 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
        <RotateCw size={11} className="text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>마우스 드래그로 360° 자유 3D 회전</span>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[#0f121b]/90 border border-[#222739] backdrop-blur-md">
        {/* Explode View Toggle */}
        <button
          onClick={handleToggleExplode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
            isExploded
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40'
              : 'bg-[#161a26] text-blue-300 border-blue-500/30 hover:bg-[#1e2436]'
          }`}
        >
          <Maximize2 size={13} className={isExploded ? 'rotate-45 transition-transform' : ''} />
          <span>{isExploded ? '부품 조립' : '기구부 분해 (Explode)'}</span>
        </button>

        {/* View Mode Pills: CMF vs Blueprint vs FEA */}
        <div className="flex items-center gap-1 bg-[#131622] p-0.5 rounded-lg border border-[#24293a]">
          {[
            { id: 'cmf', label: 'CMF 금속', icon: Sparkles },
            { id: 'blueprint', label: '청사진 CAD', icon: Eye },
            { id: 'fea', label: 'FEA 응력', icon: Cpu },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={11} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cyber Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
    </div>
  );
}
