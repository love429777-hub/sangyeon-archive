import React, { useState, useRef } from 'react';
import { 
  X, 
  Plus, 
  Upload, 
  Sparkles, 
  Check, 
  Layers, 
  Wrench, 
  FileText, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  GraduationCap,
  Rocket,
  Info
} from 'lucide-react';
import { sound } from '../utils/audio';

const CATEGORIES = [
  'Product Design',
  'Mechanism & Engineering',
  'Interaction & UX',
  'Sustainable & Concept'
];

const PRESET_TOOLS = [
  'SolidWorks',
  'KeyShot',
  'Rhino 3D',
  'FDM 3D Printing',
  'CNC Milling',
  'ANSYS FEA',
  'Fusion 360',
  'Arduino',
  'MATLAB',
  'Waterjet Cutting',
  'Laser Cutting',
  'Figma'
];

const PRESET_IMAGES = [
  {
    name: '인더스트리얼 워크벤치/로봇',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: '정밀 CAD 메커니즘 조립',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: '프로토타입 기능 목업',
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: '디지털 햅틱 인터랙션',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
  }
];

const SAMPLE_PROJECT = {
  title: 'HEXA-POD: 6축 병렬 매니퓰레이터 햅틱 컨트롤러',
  titleEn: 'HEXA-POD: 6-DOF Stewart Platform Haptic Controller',
  subtitle: '스튜어트 플랫폼 기구학 해석과 초정밀 볼스크류를 결합한 촉각 피드백 컨트롤러',
  id: 'hexa-pod-controller',
  category: 'Mechanism & Engineering',
  era: 'postgraduate',
  year: '2026',
  period: '2026.03 - 2026.06',
  role: '기구설계, 3D CAD 모델링 및 역기구학 시뮬레이션 (개인 100%)',
  awards: '2026 대한민국 차세대 디자인공학 우수상',
  thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  dimensions: '280 x 280 x 210 mm / 중량 2.4kg',
  materials: 'CNC Anodized 6061-T6 Aluminum, Carbon Fiber Rod, Stainless Steel Universal Joint',
  tools: ['SolidWorks', 'KeyShot', 'ANSYS FEA', 'CNC Milling', 'MATLAB'],
  mechanisms: '6-UPS Stewart-Gough Platform, Precision Ball-Screw Linear Actuation',
  summary: '가상 수술 및 미세 원격 제어 환경을 위한 6자유도 병렬 기구 기반 촉각 피드백 장치입니다. 폐루프 역기구학 해석을 통해 0.05mm 급의 정밀도와 고강성 촉각 피드백을 성공적으로 구현했습니다.',
  process: [
    {
      phase: '01. 문제 발굴 & 기구학 요구분석',
      description: '기존 직렬 로봇 링크의 백래시 및 누적 오차 한계를 극복하기 위해 폐루프 병렬 기구 메커니즘을 선정하고 작업 영역을 분석했습니다.'
    },
    {
      phase: '02. 역기구학 CAD 시뮬레이션',
      description: 'SolidWorks와 MATLAB을 연동하여 작업 영역(Workspace) 및 특이점(Singularity)을 해석하고 조인트 간섭을 사전에 방지했습니다.'
    },
    {
      phase: '03. 1:1 고정밀 기능 목업 & 조립 검증',
      description: '항공용 알루미늄 가공 부품과 유니버설 조인트를 조립하고 모터 엔코더 캘리브레이션을 진행하여 작동 안정성을 확보했습니다.'
    }
  ],
  gallery: [
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      caption: 'HEXA-POD 전개 상태 KeyShot 렌더링',
      type: 'render'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      caption: 'SolidWorks 6축 기구 어셈블리 분해도',
      type: 'cad'
    }
  ],
  videoLink: '',
  githubLink: ''
};

export default function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'media' | 'specs' | 'process'
  const [customToolInput, setCustomToolInput] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [id, setId] = useState('');
  const [category, setCategory] = useState('Product Design');
  const [era, setEra] = useState('postgraduate');
  const [year, setYear] = useState('2026');
  const [period, setPeriod] = useState('2026.03 - 2026.06');
  const [role, setRole] = useState('기구설계 및 CMF 디렉팅 (개인 100%)');
  const [awards, setAwards] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [materials, setMaterials] = useState('');
  const [tools, setTools] = useState(['SolidWorks', 'KeyShot', 'Rhino 3D']);
  const [mechanisms, setMechanisms] = useState('');
  const [summary, setSummary] = useState('');
  const [processSteps, setProcessSteps] = useState([
    { phase: '01. 문제 발굴 & 리서치', description: '' },
    { phase: '02. 형상 & 기구설계', description: '' },
    { phase: '03. 프로토타이핑 & CMF', description: '' }
  ]);
  const [gallery, setGallery] = useState([
    { url: '', caption: '작품 대표 렌더링', type: 'render' }
  ]);
  const [videoLink, setVideoLink] = useState('');
  const [githubLink, setGithubLink] = useState('');

  const thumbFileInputRef = useRef(null);

  if (!isOpen) return null;

  // Auto-generate id slug if empty
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!id || id.startsWith('project-')) {
      const generated = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      if (generated) {
        setId(generated);
      }
    }
  };

  // Preset loader
  const handleLoadSample = () => {
    sound.playSnap();
    setTitle(SAMPLE_PROJECT.title);
    setTitleEn(SAMPLE_PROJECT.titleEn);
    setSubtitle(SAMPLE_PROJECT.subtitle);
    setId(SAMPLE_PROJECT.id);
    setCategory(SAMPLE_PROJECT.category);
    setEra(SAMPLE_PROJECT.era);
    setYear(SAMPLE_PROJECT.year);
    setPeriod(SAMPLE_PROJECT.period);
    setRole(SAMPLE_PROJECT.role);
    setAwards(SAMPLE_PROJECT.awards);
    setThumbnail(SAMPLE_PROJECT.thumbnail);
    setDimensions(SAMPLE_PROJECT.dimensions);
    setMaterials(SAMPLE_PROJECT.materials);
    setTools(SAMPLE_PROJECT.tools);
    setMechanisms(SAMPLE_PROJECT.mechanisms);
    setSummary(SAMPLE_PROJECT.summary);
    setProcessSteps(SAMPLE_PROJECT.process);
    setGallery(SAMPLE_PROJECT.gallery);
    setVideoLink(SAMPLE_PROJECT.videoLink);
    setGithubLink(SAMPLE_PROJECT.githubLink);
  };

  // Reset form
  const handleResetForm = () => {
    sound.playClick();
    setTitle('');
    setTitleEn('');
    setSubtitle('');
    setId('');
    setCategory('Product Design');
    setEra('postgraduate');
    setYear(new Date().getFullYear().toString());
    setPeriod(`${new Date().getFullYear()}.03 - ${new Date().getFullYear()}.06`);
    setRole('기구설계 및 CMF 디렉팅 (개인 100%)');
    setAwards('');
    setThumbnail('');
    setDimensions('');
    setMaterials('');
    setTools(['SolidWorks', 'KeyShot']);
    setMechanisms('');
    setSummary('');
    setProcessSteps([
      { phase: '01. 문제 발굴 & 리서치', description: '' },
      { phase: '02. 형상 & 기구설계', description: '' },
      { phase: '03. 프로토타이핑 & CMF', description: '' }
    ]);
    setGallery([{ url: '', caption: '작품 대표 렌더링', type: 'render' }]);
    setVideoLink('');
    setGithubLink('');
  };

  // Thumbnail upload from local file
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      sound.playClick();
      setThumbnail(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Gallery image file upload
  const handleGalleryUpload = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      sound.playClick();
      const updated = [...gallery];
      updated[idx].url = event.target.result;
      setGallery(updated);
    };
    reader.readAsDataURL(file);
  };

  // Toggle tool tag
  const toggleTool = (toolName) => {
    sound.playClick();
    if (tools.includes(toolName)) {
      setTools(tools.filter((t) => t !== toolName));
    } else {
      setTools([...tools, toolName]);
    }
  };

  const addCustomTool = () => {
    const trimmed = customToolInput.trim();
    if (trimmed && !tools.includes(trimmed)) {
      sound.playClick();
      setTools([...tools, trimmed]);
      setCustomToolInput('');
    }
  };

  // Process step helpers
  const updateProcessStep = (idx, field, val) => {
    const updated = [...processSteps];
    updated[idx][field] = val;
    setProcessSteps(updated);
  };

  const addProcessStep = () => {
    sound.playClick();
    const nextNum = processSteps.length + 1;
    setProcessSteps([
      ...processSteps,
      { phase: `0${nextNum}. 추가 엔지니어링 단계`, description: '' }
    ]);
  };

  const removeProcessStep = (idx) => {
    if (processSteps.length <= 1) return;
    sound.playClick();
    setProcessSteps(processSteps.filter((_, i) => i !== idx));
  };

  // Gallery item helpers
  const updateGalleryItem = (idx, field, val) => {
    const updated = [...gallery];
    updated[idx][field] = val;
    setGallery(updated);
  };

  const addGalleryItem = () => {
    sound.playClick();
    setGallery([
      ...gallery,
      { url: '', caption: '추가 도록 이미지', type: 'render' }
    ]);
  };

  const removeGalleryItem = (idx) => {
    if (gallery.length <= 1) return;
    sound.playClick();
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  // Construct project object
  const buildProjectObject = () => {
    const slug = (id || title || `project-${Date.now()}`)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '') || `project-${Date.now().toString().slice(-4)}`;

    const finalThumbnail = thumbnail.trim() || PRESET_IMAGES[0].url;

    const filteredGallery = gallery
      .filter((g) => g.url.trim())
      .map((g) => ({
        url: g.url.trim(),
        caption: g.caption.trim() || '작품 도록 이미지',
        type: g.type || 'render'
      }));

    if (filteredGallery.length === 0) {
      filteredGallery.push({
        url: finalThumbnail,
        caption: '작품 대표 렌더링',
        type: 'render'
      });
    }

    const eraLabel = era === 'university' ? '대학 학부 시절' : '졸업 후 / 독립 연구';

    return {
      id: slug,
      index: 'NEW',
      title: title.trim() || '무제 디자인공학 작품',
      titleEn: titleEn.trim() || 'Untitled Design Engineering Project',
      subtitle: subtitle.trim() || '형상 미학과 기구 메커니즘의 정밀한 조화',
      year: year.trim() || '2026',
      category: category,
      era: era,
      eraLabel: eraLabel,
      period: period.trim() || '2026.03 - 2026.06',
      role: role.trim() || '기구설계 및 CMF 디렉팅 (개인 100%)',
      awards: awards.trim() || '',
      featured: true,
      thumbnail: finalThumbnail,
      summary: summary.trim() || '본 작품은 사용자의 조형적 경험과 기구역학적 안정성을 융합하여 설계된 디자인공학 프로젝트입니다.',
      specs: {
        dimensions: dimensions.trim() || '240 x 160 x 85 mm',
        materials: materials.trim() || 'CNC Anodized Aluminum 6061, Injection Molded PC-ABS',
        tools: tools.length > 0 ? tools : ['SolidWorks', 'KeyShot'],
        mechanisms: mechanisms.trim() || 'Precision Linkage Mechanism'
      },
      process: processSteps.map((s, idx) => ({
        phase: s.phase.trim() || `0${idx + 1}. 엔지니어링 프로세스`,
        description: s.description.trim() || '해당 단계의 공학적 설계 및 검증 내용이 기술됩니다.'
      })),
      gallery: filteredGallery,
      links: {
        video: videoLink.trim(),
        github: githubLink.trim(),
        cad: ''
      }
    };
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    sound.playClick();
    const proj = buildProjectObject();
    navigator.clipboard.writeText(JSON.stringify(proj, null, 2));
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Submit and save
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      sound.playWarning();
      setActiveTab('basic');
      alert('작품 제목(국문)을 입력해주세요!');
      return;
    }

    setIsSubmitting(true);
    const newProject = buildProjectObject();

    try {
      await onAddProject(newProject);
      sound.playSuccess();
      onClose();
    } catch (err) {
      sound.playWarning();
      alert(`작품 등록 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl my-auto rounded-2xl bg-[#0e1117] border border-[#262c3e] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#131722]/95 border-b border-[#232839] backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Plus size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  새 작품 등록 (Add Work to Archive)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/80 text-blue-300 border border-blue-800/60">
                  Digital Catalog
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-light hidden sm:block">
                ‘디자인공학과 정상연’ 전시 도록 규격에 맞추어 작품 데이터를 등록합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 text-purple-300 border border-purple-800/60 text-xs font-mono transition-all"
              title="예시 템플릿 데이터를 자동으로 채웁니다."
            >
              <Sparkles size={13} className="text-purple-400" />
              <span>예시 템플릿 채우기</span>
            </button>

            <button
              type="button"
              onClick={handleResetForm}
              className="text-gray-400 hover:text-white px-2 py-1 text-xs font-mono transition-colors"
              title="입력 양식 비우기"
            >
              초기화
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#202537] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#1f2434] bg-[#11141e] px-5 sm:px-7 text-xs font-mono overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'basic', label: '1. 기본 정보', icon: FileText },
              { id: 'media', label: '2. 이미지 & 갤러리', icon: ImageIcon },
              { id: 'specs', label: '3. 스펙 & CMF', icon: Layers },
              { id: 'process', label: '4. 프로세스 & 링크', icon: Wrench },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 border-b-2 font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-blue-500 text-blue-400 bg-blue-950/20'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-gray-400">
            <Info size={13} className="text-blue-400" />
            <span>등록 즉시 아카이브에 영구 반영됩니다</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Category & Era selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    분야 (Category) <span className="text-blue-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => {
                          sound.playClick();
                          setCategory(cat);
                        }}
                        className={`px-2.5 py-2 rounded-lg text-xs font-mono transition-all text-left truncate border ${
                          category === cat
                            ? 'bg-blue-600/30 border-blue-500 text-blue-300 font-bold'
                            : 'bg-[#151924] border-[#242a3a] text-gray-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    타임라인 구분 (Era) <span className="text-blue-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEra('postgraduate');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                        era === 'postgraduate'
                          ? 'bg-purple-950/60 border-purple-500 text-purple-300 font-bold'
                          : 'bg-[#151924] border-[#242a3a] text-gray-400 hover:text-white'
                      }`}
                    >
                      <Rocket size={13} className="text-purple-400" />
                      <span>졸업 후 / 독립 연구</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEra('university');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                        era === 'university'
                          ? 'bg-teal-950/60 border-teal-500 text-teal-300 font-bold'
                          : 'bg-[#151924] border-[#242a3a] text-gray-400 hover:text-white'
                      }`}
                    >
                      <GraduationCap size={13} className="text-teal-400" />
                      <span>대학 학부 시절</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 font-mono pt-1">
                    선택한 타임라인에 맞추어 포트폴리오 상단 뱃지가 부여됩니다.
                  </p>
                </div>
              </div>

              {/* Title & TitleEn */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    작품명 (국문) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: AERO-FOLD: 공기역학 기반 휴대용 모듈러 워크벤치"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141824] border border-[#272e42] text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    작품명 (영문) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: AERO-FOLD: Aerodynamic Portable Modular Workbench"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141824] border border-[#272e42] text-white text-sm font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    한 줄 슬로건 / 부제 <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 경량화 트러스 구조와 4절 링크 폴딩 메커니즘을 융합한 현장용 설계 테이블"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141824] border border-[#272e42] text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600 transition-colors"
                  />
                </div>
              </div>

              {/* ID Slug, Year, Period */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    고유 식별자 (ID Slug) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: aero-fold"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    제작 연도 (Year) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2026"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    제작 기간 (Period) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2026.01 - 2026.06"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Role & Awards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    담당 역할 및 기여도 <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 기구설계 및 CMF 디렉팅 (개인 100%)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    수상 및 전시 내역 (선택사항)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 2026 Red Dot Design Concept Winner"
                    value={awards}
                    onChange={(e) => setAwards(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & GALLERY */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Main Thumbnail Area */}
              <div className="p-4 rounded-xl bg-[#131622] border border-[#252b3d] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                      대표 썸네일 이미지 (Cover Thumbnail) <span className="text-blue-400">*</span>
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      PC의 이미지 파일을 직접 업로드하거나 외부 URL을 입력할 수 있습니다.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => thumbFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-md shadow-blue-600/30"
                  >
                    <Upload size={13} />
                    <span>내 PC에서 사진 올리기</span>
                  </button>
                  <input
                    ref={thumbFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Thumbnail Preview */}
                  <div className="md:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-[#272d40] flex items-center justify-center">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-gray-500 text-xs">
                        <ImageIcon size={28} className="mx-auto mb-2 opacity-40" />
                        <span>이미지를 등록해주세요</span>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail URL Input & Sample Select */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 block">
                        이미지 URL 직접 입력
                      </label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-[#242a3a] text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-400 block">
                        또는 추천 디자인공학 샘플 썸네일 선택:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PRESET_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setThumbnail(preset.url);
                            }}
                            className={`p-2 rounded-lg text-left text-[11px] border transition-all truncate ${
                              thumbnail === preset.url
                                ? 'bg-blue-950/60 border-blue-500 text-blue-300 font-bold'
                                : 'bg-[#161a26] border-[#222736] text-gray-400 hover:text-white'
                            }`}
                          >
                            📷 {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery List Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                      도록 갤러리 미디어 (Exhibition Gallery)
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      상세 모달에서 감상할 렌더링, 3D CAD 분해도, 프로토타입 사진을 추가하세요.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181d2a] hover:bg-[#202738] text-blue-400 border border-blue-500/30 text-xs font-mono transition-all"
                  >
                    <Plus size={13} />
                    <span>갤러리 사진 추가</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#121520] border border-[#212638] flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                    >
                      {/* Mini Thumbnail */}
                      <div className="relative w-20 h-14 rounded-lg bg-black/60 border border-[#272d40] shrink-0 overflow-hidden flex items-center justify-center">
                        {item.url ? (
                          <img
                            src={item.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={16} className="text-gray-600" />
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            placeholder="이미지 URL (https://...)"
                            value={item.url}
                            onChange={(e) => updateGalleryItem(idx, 'url', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1118] border border-[#222738] text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="캡션 설명 (예: 기구부 분해도)"
                            value={item.caption}
                            onChange={(e) => updateGalleryItem(idx, 'caption', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1118] border border-[#222738] text-white text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <select
                            value={item.type}
                            onChange={(e) => updateGalleryItem(idx, 'type', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1118] border border-[#222738] text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                          >
                            <option value="render">렌더링 (Render)</option>
                            <option value="cad">3D CAD / 도면</option>
                            <option value="prototype">프로토타입 (Mockup)</option>
                            <option value="mechanism">메커니즘 (Mechanism)</option>
                            <option value="final">최종 결과물 (Final)</option>
                          </select>
                        </div>
                      </div>

                      {/* File upload or delete */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <label className="p-2 rounded-lg bg-[#1a1f2e] text-gray-300 hover:text-white cursor-pointer border border-[#252c3e] transition-colors" title="파일 업로드">
                          <Upload size={14} />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleGalleryUpload(idx, e.target.files?.[0])}
                          />
                        </label>

                        {gallery.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGalleryItem(idx)}
                            className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-800/40 transition-colors"
                            title="삭제"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPECS & CMF */}
          {activeTab === 'specs' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    규격 및 치수 (Dimensions) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 240 x 160 x 85 mm / 중량 450g"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    핵심 메커니즘 (Key Mechanisms)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 4-bar planar linkage, magnetic snap-fit"
                    value={mechanisms}
                    onChange={(e) => setMechanisms(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-gray-300 font-semibold">
                  소재 및 표면가공 (CMF Materials) <span className="text-blue-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="예: CNC Anodized Aluminum 6061-T6 (Matte Black), Frosted Polycarbonate, Silicone Bushing"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                />
              </div>

              {/* Tools selector */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    사용 설계 툴 및 장비 (Tools & Machines) <span className="text-blue-400">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-blue-400">
                    선택됨: {tools.length}개
                  </span>
                </div>

                {/* Preset Tool Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TOOLS.map((t) => {
                    const isSelected = tools.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTool(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-sm'
                            : 'bg-[#151924] text-gray-400 border-[#242a3a] hover:text-white'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {t}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Tool Input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="기타 도구 직접 입력 (예: Keyshot XR, ABAQUS 등)"
                    value={customToolInput}
                    onChange={(e) => setCustomToolInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomTool();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomTool}
                    className="px-3.5 py-2 rounded-xl bg-[#1c2233] hover:bg-[#252d44] text-blue-300 border border-blue-500/30 text-xs font-mono transition-colors"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROCESS & LINKS */}
          {activeTab === 'process' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Summary / Introduction */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-gray-300 font-semibold">
                  작품 개요 및 도록 서문 (Summary Narrative) <span className="text-blue-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="작품의 기획 배경, 해결하고자 한 사용자 및 기구학적 문제, 그리고 도출된 엔지니어링 솔루션을 도록 서문 스타일(2~4문장)로 작성합니다."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs leading-relaxed focus:outline-none focus:border-blue-500 placeholder-gray-600"
                />
              </div>

              {/* Design Engineering Process Steps */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                      디자인 엔지니어링 3단계 프로세스
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      문제 인식부터 CAD 설계, 프로토타입 제작까지의 단계별 스토리라인을 기술합니다.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addProcessStep}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#171c29] text-blue-400 border border-blue-500/30 text-xs font-mono hover:bg-[#20273a] transition-colors"
                  >
                    <Plus size={12} />
                    <span>단계 추가</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {processSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#131622] border border-[#222738] space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={step.phase}
                          onChange={(e) => updateProcessStep(idx, 'phase', e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-[#0e1118] border border-[#242b3c] text-blue-300 text-xs font-mono font-bold w-60 focus:outline-none focus:border-blue-500"
                        />
                        {processSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProcessStep(idx)}
                            className="text-gray-500 hover:text-red-400 p-1 text-xs"
                            title="단계 삭제"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        placeholder="이 단계에서 수행한 구체적인 공학적 분석 및 조형 실험 내용을 적어주세요."
                        value={step.description}
                        onChange={(e) => updateProcessStep(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-[#242b3c] text-white text-xs leading-relaxed focus:outline-none focus:border-blue-500 placeholder-gray-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    시연 영상 링크 (선택사항)
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-300 font-semibold">
                    GitHub / 코드 / CAD 링크 (선택사항)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#272e42] text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Bar */}
          <div className="sticky bottom-0 z-20 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 px-5 sm:px-7 py-4 bg-[#11141e]/95 border-t border-[#212638] flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#171c2a] hover:bg-[#20273c] text-gray-300 hover:text-white border border-[#282f44] text-xs font-mono transition-colors"
                title="입력한 도록 데이터를 JSON 규격으로 클립보드에 복사합니다."
              >
                {copyFeedback ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                <span>{copyFeedback ? 'JSON 복사됨!' : 'JSON 복사'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#171c28] hover:bg-[#222838] text-gray-300 text-xs font-medium transition-colors"
              >
                닫기
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50"
              >
                <Plus size={15} />
                <span>{isSubmitting ? '등록 처리 중...' : '✨ 아카이브 도록에 작품 등록'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
