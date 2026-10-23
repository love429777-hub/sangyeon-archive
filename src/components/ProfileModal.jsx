import React from 'react';
import { X, Mail, MapPin, Award, Layers, Code, Compass, ExternalLink } from 'lucide-react';
import profileData from '../data/profile.json';

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl my-auto rounded-2xl bg-[#0f1118] border border-[#272c3d] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141722] border-b border-[#232736]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h3 className="text-sm font-mono text-gray-300 font-medium">
              Designer Dossier · {profileData.departmentEn}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#202535] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Bio Headline */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400">
              {profileData.department}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {profileData.name}{' '}
              <span className="text-lg font-light text-gray-400 font-mono">
                ({profileData.nameEn})
              </span>
            </h2>
            <p className="text-sm text-blue-300 font-mono font-medium">
              {profileData.tagline}
            </p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light pt-2">
              {profileData.bio}
            </p>
          </div>

          {/* Quick Contact & Location */}
          <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl bg-[#141722] border border-[#222636] text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-blue-400" />
              <span>{profileData.email}</span>
            </div>
            <div className="w-px h-4 bg-[#2b3142]" />
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-blue-400" />
              <span>{profileData.location}</span>
            </div>
          </div>

          {/* Skill Matrix */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass size={14} />
              <span>전문 기술 및 설계 역량 (Skill Matrix)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(profileData.skills).map(([category, list]) => (
                <div key={category} className="p-4 rounded-xl bg-[#131520] border border-[#212534] space-y-2">
                  <span className="text-xs font-mono text-gray-300 font-semibold block">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {list.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1c202d] text-blue-300 border border-[#2a3144]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exhibition & Awards */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Award size={14} />
              <span>전시 및 수상 이력 (Exhibitions & Awards)</span>
            </h4>
            <div className="space-y-2">
              {profileData.exhibitions.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#141722] border border-[#202536] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-blue-400 font-bold">{ex.year}</span>
                    <span className="text-white font-medium">{ex.title}</span>
                  </div>
                  <span className="text-gray-400 font-mono text-[11px]">{ex.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
