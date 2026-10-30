import React, { useState, useEffect, useRef } from 'react';
import { Link2, Waves, Sparkles, Sliders } from 'lucide-react';
import { sound } from '../utils/audio';

// Helper to draw elongated pill/capsule shape
function drawCapsule(ctx, w, h) {
  const r = h / 2;
  const l = (w / 2) - r;
  ctx.moveTo(-l, -r);
  ctx.lineTo(l, -r);
  ctx.arc(l, 0, r, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(-l, r);
  ctx.arc(-l, 0, r, Math.PI / 2, -Math.PI / 2);
  ctx.closePath();
}

export default function KineticSculptureBackground() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('hybrid'); // 'chain' | 'wave' | 'hybrid'
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [sensitivity, setSensitivity] = useState(1.2); // Scroll rotation speed multiplier

  // State refs for smooth physics lerp
  const scrollRef = useRef({ current: 0, target: 0, velocity: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Window scroll listener
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    // Mouse movement listener
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Smooth scroll interpolation (damped inertia)
      const prevScroll = scrollRef.current.current;
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      scrollRef.current.velocity = (scrollRef.current.current - prevScroll) * 0.05;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      time += 0.012;
      const scrollNorm = (scrollRef.current.current * 0.0025 * sensitivity);

      // ==========================================
      // 1. Fluid Wave Simulation Layer (물결 파동)
      // ==========================================
      if (mode === 'wave' || mode === 'hybrid') {
        const waveCount = 5;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const baseOffset = (w / (waveCount - 1)) * height;
          const wavePhase = time * 0.7 + w * 0.8 + scrollNorm * 1.5;
          const amp = 30 + w * 12;

          ctx.lineWidth = 1.2;
          ctx.strokeStyle = w % 2 === 0
            ? `rgba(59, 130, 246, ${0.12 + w * 0.02})`
            : `rgba(6, 182, 212, ${0.10 + w * 0.02})`;

          for (let x = 0; x <= width; x += 15) {
            const nx = x / width;
            // Wave equation with mouse ripple distortion
            const mouseDist = Math.hypot(x - (width * 0.5 + mouseRef.current.x * width * 0.3), baseOffset - (height * 0.5 + mouseRef.current.y * height * 0.3));
            const ripple = Math.sin(mouseDist * 0.02 - time * 2) * Math.max(0, 30 - mouseDist * 0.05);

            const y = baseOffset 
              + Math.sin(nx * 4 * Math.PI + wavePhase) * amp 
              + Math.cos(nx * 2 * Math.PI - wavePhase * 0.5) * (amp * 0.4)
              + ripple;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // =======================================================
      // 2. Kinetic Interlocking Chain Sculpture (3D 사슬 조형)
      // =======================================================
      if (mode === 'chain' || mode === 'hybrid') {
        const linkCount = 32;
        const links = [];

        // Generate 3D helical spline coordinates for chain links
        for (let i = 0; i < linkCount; i++) {
          const t = i / (linkCount - 1);
          // Spline passes vertically through screen with S-curve swing
          const curveAngle = t * Math.PI * 2.8 + scrollNorm * 2.2 + time * 0.3;
          
          const centerX = width * 0.68 + mouseRef.current.x * 60;
          const radiusX = Math.min(width * 0.22, 220);
          const radiusZ = 160;

          const x3d = centerX + Math.sin(curveAngle) * radiusX;
          const y3d = t * (height + 240) - 120;
          const z3d = Math.cos(curveAngle) * radiusZ;

          // Rotation angle: 90 deg offset per link for realistic chain interlocking!
          const rotationAngle = (i * Math.PI * 0.5) + (scrollNorm * 3.5) + (time * 0.6) + (mouseRef.current.y * 1.5);

          links.push({
            index: i,
            x: x3d,
            y: y3d,
            z: z3d,
            angle: rotationAngle,
          });
        }

        // Sort by Z (painter's algorithm) so front links overlap back links
        links.sort((a, b) => a.z - b.z);

        // Render each mechanical chain link
        links.forEach((link) => {
          // Perspective projection
          const fov = 500;
          const scale = fov / (fov + link.z);
          const screenX = link.x;
          const screenY = link.y;

          // Normalized depth: 0 (far) to 1 (near)
          const depthRatio = Math.max(0, Math.min(1, (link.z + 160) / 320));

          // Outer link dimensions
          const linkWidth = 72 * scale;
          const linkHeight = 32 * scale;
          const linkThickness = 14 * scale;

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(link.angle);

          // Subtle soft shadow behind closer links
          if (depthRatio > 0.4) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
            ctx.shadowBlur = 15 * scale;
            ctx.shadowOffsetX = 6 * scale;
            ctx.shadowOffsetY = 8 * scale;
          }

          // Metallic Gradient Shading based on 3D depth and angle
          const grad = ctx.createLinearGradient(-linkWidth / 2, -linkHeight / 2, linkWidth / 2, linkHeight / 2);
          if (depthRatio > 0.6) {
            // Front links: polished aerospace aluminum & Klein blue specular
            grad.addColorStop(0, '#94a3b8');
            grad.addColorStop(0.3, '#3b82f6');
            grad.addColorStop(0.7, '#1e293b');
            grad.addColorStop(1, '#60a5fa');
          } else {
            // Back links: deeper recessed dark slate
            grad.addColorStop(0, '#1e2536');
            grad.addColorStop(0.5, '#0f172a');
            grad.addColorStop(1, '#1e293b');
          }

          ctx.fillStyle = grad;
          ctx.strokeStyle = depthRatio > 0.5 ? 'rgba(147, 197, 253, 0.6)' : 'rgba(71, 85, 105, 0.4)';
          ctx.lineWidth = 1.8 * scale;

          // Outer Torus Ring (Elongated capsule)
          ctx.beginPath();
          drawCapsule(ctx, linkWidth, linkHeight);
          ctx.fill();
          ctx.stroke();

          // Reset shadow for inner hole cutout
          ctx.shadowColor = 'transparent';

          // Inner Hole Cutout
          ctx.beginPath();
          drawCapsule(ctx, Math.max(10, linkWidth - linkThickness * 2), Math.max(6, linkHeight - linkThickness * 1.5));
          ctx.fillStyle = '#0b0c10'; // Blend seamlessly with dark site background
          ctx.fill();
          ctx.strokeStyle = depthRatio > 0.5 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(30, 41, 59, 0.5)';
          ctx.lineWidth = 1.2 * scale;
          ctx.stroke();

          // Metallic Specular Highlight Ridge
          if (depthRatio > 0.5) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 1 * scale;
            ctx.beginPath();
            ctx.arc(-linkWidth * 0.25, -linkHeight * 0.25, linkHeight * 0.2, Math.PI, Math.PI * 1.6);
            ctx.stroke();
          }

          ctx.restore();
        });
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [mode, sensitivity]);

  const handleModeChange = (newMode) => {
    sound.playClick();
    setMode(newMode);
  };

  return (
    <>
      {/* Background Interactive Kinetic Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 block w-full h-full opacity-85"
      />

      {/* Floating Background Sculpture Customizer Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <div className="relative">
          {/* Expanded Control Box */}
          {isWidgetOpen && (
            <div className="mb-2 p-3.5 rounded-2xl bg-[#11141e]/95 backdrop-blur-xl border border-[#272e42] shadow-2xl space-y-3 w-64 text-xs font-mono animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#212638]">
                <span className="text-gray-300 font-bold flex items-center gap-1.5">
                  <Sparkles size={13} className="text-blue-400" />
                  <span>배경 조형 인터랙션</span>
                </span>
                <span className="text-[10px] text-teal-400">스크롤 연동 회전</span>
              </div>

              {/* Mode Switcher */}
              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block">조형 모드 선택</span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'chain', label: '🔗 사슬', icon: Link2 },
                    { id: 'wave', label: '🌊 물결', icon: Waves },
                    { id: 'hybrid', label: '🪐 융합', icon: Sparkles },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleModeChange(m.id)}
                      className={`px-2 py-1.5 rounded-lg text-center transition-all ${
                        mode === m.id
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                          : 'bg-[#181c28] text-gray-400 hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sensitivity Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>스크롤 회전 감도</span>
                  <span className="text-blue-400 font-bold">{sensitivity}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={sensitivity}
                  onChange={(e) => {
                    setSensitivity(Number(e.target.value));
                    sound.playHover();
                  }}
                  className="w-full accent-blue-500 h-1.5 bg-[#202538] rounded-lg cursor-pointer"
                />
              </div>

              <div className="text-[10px] text-gray-500 leading-tight">
                마우스 이동 시 커서에 반응하며, 스크롤을 내릴 때 3D 사슬이 나선형으로 부드럽게 회전합니다.
              </div>
            </div>
          )}

          {/* Trigger Pill Button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsWidgetOpen(!isWidgetOpen);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border text-xs font-mono shadow-xl transition-all ${
              isWidgetOpen
                ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30'
                : 'bg-[#141824]/85 text-gray-300 hover:text-white border-[#272e42] hover:border-blue-500/50'
            }`}
            title="배경 키네틱 사슬 및 물결 조형 조절"
          >
            <Sliders size={13} className={isWidgetOpen ? 'rotate-90 transition-transform' : 'transition-transform'} />
            <span className="font-semibold">
              {mode === 'chain' ? '🔗 키네틱 사슬 배경' : mode === 'wave' ? '🌊 물결 파동 배경' : '🪐 융합 키네틱 조형'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
