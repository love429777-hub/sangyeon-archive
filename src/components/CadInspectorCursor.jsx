import React, { useState, useEffect } from 'react';

export default function CadInspectorCursor({ isEnabled }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled]);

  if (!isEnabled) return null;

  const mmX = (pos.x * 0.264583).toFixed(1);
  const mmY = (pos.y * 0.264583).toFixed(1);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ cursor: 'none' }}
    >
      {/* Horizontal & Vertical Crosshair Lines */}
      <div
        className="absolute top-0 bottom-0 border-l border-blue-500/40"
        style={{ left: `${pos.x}px` }}
      />
      <div
        className="absolute left-0 right-0 border-t border-blue-500/40"
        style={{ top: `${pos.y}px` }}
      />

      {/* Target Reticle with Live Dimensions */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        {/* Reticle Ring */}
        <div className="w-10 h-10 rounded-full border border-teal-400/70 border-dashed animate-spin duration-700" />
        <div className="w-2 h-2 rounded-full bg-blue-500" />

        {/* Live Coordinate Badge */}
        <div className="absolute top-6 left-6 px-2.5 py-1 rounded bg-[#0b0e17]/95 border border-blue-500/60 text-[10px] font-mono text-cyan-300 shadow-xl whitespace-nowrap backdrop-blur-md">
          <div className="text-gray-400 font-bold">CAD CALIPER INSPECTOR</div>
          <div>X: <span className="text-white font-bold">{mmX} mm</span></div>
          <div>Y: <span className="text-white font-bold">{mmY} mm</span></div>
        </div>
      </div>
    </div>
  );
}
