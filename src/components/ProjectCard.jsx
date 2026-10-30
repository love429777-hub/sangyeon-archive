import React from 'react';
import { ArrowUpRight, Layers, Award, GraduationCap, Rocket } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  return (
    <article 
      onClick={() => onSelect(project)}
      className="group cursor-pointer rounded-2xl bg-[#13161f]/90 backdrop-blur-md border border-[#232835] hover:border-blue-500/60 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5"
    >
      {/* Visual Thumbnail Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a1d28]">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover image-zoom transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161f] via-transparent to-transparent opacity-80" />

        {/* Catalog Numbering & Year Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded bg-[#0b0c10]/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-semibold">
            № {project.index}
          </span>
          <span className="px-2 py-1 rounded bg-[#0b0c10]/70 backdrop-blur-md border border-white/10 text-gray-300 font-mono text-[11px]">
            {project.year}
          </span>
        </div>

        {/* Era Tag (University vs Postgrad) */}
        {project.eraLabel && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-[#0b0c10]/85 text-teal-300 font-mono text-[10px] backdrop-blur-md border border-teal-500/40">
            {project.era === 'university' ? <GraduationCap size={12} /> : <Rocket size={12} />}
            <span>{project.eraLabel}</span>
          </div>
        )}

        {/* Awards badge if any */}
        {project.awards && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/90 text-black font-semibold text-[10px] tracking-tight backdrop-blur-md shadow-sm">
            <Award size={12} />
            <span>{project.awards}</span>
          </div>
        )}

        {/* Category Pill at bottom left of image */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-950/90 text-blue-300 border border-blue-800/60 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Detail hover trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-950/30 backdrop-blur-[2px]">
          <div className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
            <span>스펙 및 도록 열람</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Content Info Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-gray-400 line-clamp-1">
            {project.titleEn}
          </p>
          <p className="text-xs text-gray-300 font-light line-clamp-2 pt-1 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Engineering Specs Preview */}
        <div className="pt-3 border-t border-[#1f2430] space-y-2">
          {project.specs?.materials && (
            <div className="text-[11px] text-gray-400 flex items-center gap-1.5 truncate">
              <Layers size={13} className="text-blue-400 shrink-0" />
              <span className="truncate">{project.specs.materials}</span>
            </div>
          )}

          {/* Tool Tags */}
          <div className="flex flex-wrap items-center gap-1 pt-1">
            {project.specs?.tools?.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1b1f2b] text-gray-300 border border-[#2a3040]"
              >
                {tool}
              </span>
            ))}
            {project.specs?.tools?.length > 3 && (
              <span className="text-[10px] font-mono text-gray-500 pl-1">
                +{project.specs.tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
