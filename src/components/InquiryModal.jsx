import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, MessageSquare, Copy, Check, Sparkles, Building2, Briefcase, Coffee } from 'lucide-react';
import profileData from '../data/profile.json';
import { sound } from '../utils/audio';

export default function InquiryModal({ isOpen, onClose, defaultSubject = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'project', // 'project' | 'exhibition' | 'career' | 'etc'
    subject: defaultSubject || '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'project', label: '기구설계 & 디자인 프로젝트 의뢰', icon: Briefcase },
    { id: 'exhibition', label: '작품 전시 및 도록 협업', icon: Building2 },
    { id: 'career', label: '채용 제안 & 인터뷰 / 커피챗', icon: Coffee },
    { id: 'etc', label: '기타 문의', icon: MessageSquare },
  ];

  const handleCopyEmail = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    // Open default mail client with pre-filled parameters
    const subjectEncoded = encodeURIComponent(`[${formData.category.toUpperCase()}] ${formData.subject || '작품 문의'}`);
    const bodyEncoded = encodeURIComponent(
      `이름/소속: ${formData.name}\n이메일: ${formData.email}\n문의 유형: ${formData.category}\n\n문의 내용:\n${formData.message}`
    );
    window.open(`mailto:${profileData.email}?subject=${subjectEncoded}&body=${bodyEncoded}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full my-auto rounded-3xl bg-[#11141e] border border-[#272e42] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141824] border-b border-[#212638]">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
            <Mail size={16} />
            <span>PROJECT & COLLABORATION INQUIRY</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2538] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {!isSubmitted ? (
            <>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>작품 문의 및 프로젝트 협업</span>
                  <Sparkles size={16} className="text-teal-400" />
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  디자인공학과 정상연의 아카이브 작품에 대한 전시, 기구설계 및 제품 디자인 프로젝트 협업, 채용 관련 문의를 남겨주세요.
                </p>
              </div>

              {/* Direct Email Fast Copy */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0b0c10] border border-[#212638] text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail size={14} className="text-blue-400" />
                  <span>{profileData.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#181d2c] hover:bg-[#22293e] text-gray-300 hover:text-white text-[11px] transition-all"
                >
                  {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedEmail ? '복사됨!' : '이메일 주소 복사'}</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-400 block">문의 유형</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((c) => {
                      const Icon = c.icon;
                      const isSelected = formData.category === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: c.id })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-blue-200 font-medium ring-1 ring-blue-500/40'
                              : 'bg-[#151926] border-[#252b3d] text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          <Icon size={14} className={isSelected ? 'text-blue-400' : 'text-gray-500'} />
                          <span className="truncate">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400 block">성함 / 소속 기관</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 (○○디자인스튜디오)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b0c10] border border-[#232839] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400 block">회신받으실 이메일</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b0c10] border border-[#232839] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400 block">문의 제목</label>
                  <input
                    type="text"
                    required
                    placeholder="문의하실 프로젝트명 또는 협업 내용의 요약"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b0c10] border border-[#232839] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400 block">상세 내용</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="작품 전시 일정, 설계 요구사항, 미팅 일정 등 구체적인 내용을 자유롭게 적어주세요."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b0c10] border border-[#232839] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-lg shadow-blue-600/30"
                >
                  <Send size={14} />
                  <span>문의 메시지 전송 (이메일 연결)</span>
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 size={30} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">문의가 정상적으로 연결되었습니다</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                  작성해주신 내용이 이메일 클라이언트로 전달되었습니다. 확인 후 기재해주신 이메일로 빠르게 회신드리겠습니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1c2235] text-gray-200 hover:text-white text-xs font-medium transition-all"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
