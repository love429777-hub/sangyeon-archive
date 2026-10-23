import React from 'react';
import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';

export default function ProjectTableView({ projects, onSelect }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#232835] bg-[#13161f]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[#232835] bg-[#171b26] text-gray-400 font-mono">
            <th className="py-3 px-4 font-semibold">인덱스</th>
            <th className="py-3 px-4 font-semibold">작품명 & 영문명</th>
            <th className="py-3 px-4 font-semibold">분야 (Category)</th>
            <th className="py-3 px-4 font-semibold">주요 소재 & CMF</th>
            <th className="py-3 px-4 font-semibold">설계 툴 / 메커니즘</th>
            <th className="py-3 px-4 font-semibold text-right">상세 도록</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1f2430]">
          {projects.map((proj) => (
            <tr
              key={proj.id}
              onClick={() => onSelect(proj)}
              className="hover:bg-[#1a1e2b] transition-colors cursor-pointer group"
            >
              <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                № {proj.index}
              </td>
              <td className="py-3.5 px-4">
                <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                  {proj.title}
                </div>
                <div className="text-[11px] text-gray-400 font-mono">
                  {proj.titleEn}
                </div>
              </td>
              <td className="py-3.5 px-4">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-950/70 text-blue-300 border border-blue-900/40">
                  {proj.category}
                </span>
              </td>
              <td className="py-3.5 px-4 text-gray-300 max-w-xs truncate">
                {proj.specs?.materials || '-'}
              </td>
              <td className="py-3.5 px-4">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {proj.specs?.tools?.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1b1f2b] text-gray-300 border border-[#2a3040]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3.5 px-4 text-right">
                <button className="inline-flex items-center gap-1 text-blue-400 group-hover:text-white font-mono text-[11px]">
                  <span>열람</span>
                  <ArrowUpRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
