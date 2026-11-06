import React, { useState } from 'react';
import { X, Copy, Check, Share2, Linkedin, Twitter, Mail } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ShareModal({ isOpen, onClose, project = null }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sangyeon-archive.love429777.workers.dev';
  const shareTitle = project 
    ? `[디자인공학과 정상연] ${project.title}`
    : '디자인공학과 정상연 | Personal Archive & Exhibition Catalog';
  const shareDescription = project 
    ? project.subtitle 
    : '조형적 심미성과 기구역학적 정밀함의 융합을 담은 디자인공학 디지털 도록';

  const handleCopyLink = async () => {
    try {
      sound.playClick();
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSocialShare = (platform) => {
    sound.playClick();
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    } else if (platform === 'mail') {
      url = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${shareDescription}\n\n링크: ${currentUrl}`)}`;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full p-6 sm:p-7 rounded-2xl bg-[#11141e] border border-[#272e42] shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#212638]">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
            <Share2 size={16} />
            <span>SHARE ARCHIVE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2538] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Info */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-white">
            {project ? project.title : '디자인공학과 정상연 아카이브 공유'}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            {project 
              ? `${project.year} · ${project.category} · ${project.role}` 
              : '디지털 도록 및 키네틱 인터랙티브 아카이브 링크를 전달합니다.'}
          </p>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-gray-400">웹사이트 URL 링크</label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0b0c10] border border-[#232839]">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent px-2.5 text-xs text-gray-300 font-mono focus:outline-none select-all truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? '복사완료!' : '링크 복사'}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-2 pt-1">
          <label className="text-[11px] font-mono text-gray-400">채널로 공유</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#171b28] hover:bg-[#202638] text-gray-300 hover:text-white border border-[#282f42] text-xs font-medium transition-all"
            >
              <Linkedin size={14} className="text-blue-400" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#171b28] hover:bg-[#202638] text-gray-300 hover:text-white border border-[#282f42] text-xs font-medium transition-all"
            >
              <Twitter size={14} className="text-sky-400" />
              <span>X (트위터)</span>
            </button>

            <button
              onClick={() => handleSocialShare('mail')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#171b28] hover:bg-[#202638] text-gray-300 hover:text-white border border-[#282f42] text-xs font-medium transition-all"
            >
              <Mail size={14} className="text-teal-400" />
              <span>이메일 전송</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
