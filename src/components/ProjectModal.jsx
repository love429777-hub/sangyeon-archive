import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Layers, Cpu, Wrench, Award, ExternalLink, Box, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const gallery = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [{ url: project.thumbnail, caption: '작품 대표 렌더링' }];

  const currentImg = gallery[activeImageIdx] || gallery[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl my-auto rounded-2xl bg-[#0f1118] border border-[#272c3d] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#141722]/95 border-b border-[#232736] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
              CATALOG № {project.index}
            </span>
            <span className="text-xs font-mono text-gray-400">
              {project.year} · {project.category}
            </span>
            {project.awards && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold">
                <Award size={12} />
                {project.awards}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#202535] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Title & Subtitle */}
          <div className="space-y-2 border-b border-[#202433] pb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <div className="text-sm font-mono text-blue-400">
              {project.titleEn}
            </div>
            <p className="text-base text-gray-300 font-light pt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Exhibition Media Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-[#25293a]">
              <img
                src={currentImg.url}
                alt={currentImg.caption || project.title}
                className="w-full h-full object-contain"
              />
              {/* Prev / Next controls if multiple images */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm border border-white/10 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm border border-white/10 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            {/* Image Caption & Thumbnails */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400 font-mono">
              <span className="text-gray-300 italic">
                {currentImg.caption || 'Exhibition View'}
              </span>
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`relative w-14 h-9 rounded overflow-hidden border transition-all ${
                        activeImageIdx === i
                          ? 'border-blue-500 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Curatorial Summary */}
          <div className="bg-[#141722] p-6 rounded-xl border border-[#232737] space-y-2">
            <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={13} />
              <span>작품 개요 및 도록 서문</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              {project.summary}
            </p>
          </div>

          {/* Engineering Specifications Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Layers size={13} />
              <span>엔지니어링 & CMF 스펙 시트</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#131520] border border-[#212534] space-y-1.5">
                <span className="text-[11px] font-mono text-gray-400 block">규격 및 치수 (Dimensions)</span>
                <p className="text-xs font-mono text-white">{project.specs?.dimensions || '미정'}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#131520] border border-[#212534] space-y-1.5">
                <span className="text-[11px] font-mono text-gray-400 block">소재 및 표면처리 (CMF Materials)</span>
                <p className="text-xs font-mono text-white">{project.specs?.materials || '미정'}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#131520] border border-[#212534] space-y-1.5">
                <span className="text-[11px] font-mono text-gray-400 block">핵심 메커니즘 (Key Mechanism)</span>
                <p className="text-xs font-mono text-white">{project.specs?.mechanisms || '-'}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#131520] border border-[#212534] space-y-1.5">
                <span className="text-[11px] font-mono text-gray-400 block">활용 도구 및 공정 (CAD & Tools)</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.specs?.tools?.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1c202d] text-blue-300 border border-[#2d3447]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Design & Engineering Process Stages */}
          {project.process && project.process.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Wrench size={13} />
                <span>디자인 엔지니어링 프로세스</span>
              </h3>
              <div className="space-y-3">
                {project.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#131622] border border-[#202536] flex flex-col sm:flex-row sm:items-start gap-3"
                  >
                    <span className="font-mono text-xs font-bold text-blue-400 shrink-0 sm:w-48">
                      {step.phase}
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role & Links */}
          <div className="pt-4 border-t border-[#202433] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="text-gray-400">
              담당 역할: <strong className="text-white">{project.role}</strong> ({project.period})
            </div>
            <div className="flex items-center gap-3">
              {project.links?.video && (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline"
                >
                  <span>시연 영상</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline"
                >
                  <span>코드 저장소</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
