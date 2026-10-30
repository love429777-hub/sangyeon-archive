import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import InteractiveLab from './components/InteractiveLab';
import CategoryFilters from './components/CategoryFilters';
import ProjectCard from './components/ProjectCard';
import ProjectTableView from './components/ProjectTableView';
import ProjectModal from './components/ProjectModal';
import ProfileModal from './components/ProfileModal';
import HarnessModal from './components/HarnessModal';
import CadInspectorCursor from './components/CadInspectorCursor';
import EasterEggOverdrive from './components/EasterEggOverdrive';
import KineticSculptureBackground from './components/KineticSculptureBackground';
import Footer from './components/Footer';
import { sound } from './utils/audio';

import initialProjects from './data/projects.json';

export default function App() {
  const [projects] = useState(initialProjects);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEra, setSelectedEra] = useState('all'); // 'all' | 'university' | 'postgraduate'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHarnessOpen, setIsHarnessOpen] = useState(false);

  // Fun Interactive States
  const [isCadInspector, setIsCadInspector] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects by category, era, and search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      if (!matchCategory) return false;

      const matchEra =
        selectedEra === 'all' || p.era === selectedEra;

      if (!matchEra) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const titleMatch = p.title?.toLowerCase().includes(q);
      const titleEnMatch = p.titleEn?.toLowerCase().includes(q);
      const subMatch = p.subtitle?.toLowerCase().includes(q);
      const eraMatch = p.eraLabel?.toLowerCase().includes(q);
      const materialMatch = p.specs?.materials?.toLowerCase().includes(q);
      const toolsMatch = p.specs?.tools?.some((t) =>
        t.toLowerCase().includes(q)
      );

      return titleMatch || titleEnMatch || subMatch || eraMatch || materialMatch || toolsMatch;
    });
  }, [projects, selectedCategory, selectedEra, searchQuery]);

  const scrollToArchive = () => {
    const el = document.getElementById('archive-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLab = () => {
    const el = document.getElementById('interactive-lab-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (project) => {
    sound.playClick();
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#e2e8f0] relative selection:bg-blue-600 selection:text-white">
      {/* 3D Kinetic Interlocking Chain & Fluid Wave Background (스크롤 연동 회전 사슬 & 물결 조형) */}
      <KineticSculptureBackground />

      {/* Global CAD Crosshair Caliper Inspector Mode */}
      <CadInspectorCursor isEnabled={isCadInspector} />

      {/* Navigation */}
      <div className="relative z-30">
        <Navbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenHarness={() => setIsHarnessOpen(true)}
          totalProjects={projects.length}
          isCadInspector={isCadInspector}
          setIsCadInspector={setIsCadInspector}
          isSoundOn={isSoundOn}
          setIsSoundOn={setIsSoundOn}
          onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
          onScrollToLab={scrollToLab}
        />
      </div>

      {/* Hero Banner / Manifesto */}
      <div className="relative z-20">
        <HeroBanner
          totalProjects={projects.length}
          onExplore={scrollToArchive}
          onExploreLab={scrollToLab}
        />
      </div>

      {/* Interactive Playground & Sandbox Section (재미요소 4대 인터랙티브 랩) */}
      <div id="interactive-lab-section" className="relative z-20">
        <InteractiveLab />
      </div>

      {/* Main Archive / Digital Catalog Section */}
      <main id="archive-section" className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Category & Era (학부 vs 졸업 후) Filters & Search */}
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            sound.playClick();
            setSelectedCategory(cat);
          }}
          selectedEra={selectedEra}
          onSelectEra={(era) => {
            sound.playClick();
            setSelectedEra(era);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredCount={filteredProjects.length}
          totalCount={projects.length}
        />

        {/* Content View: Grid or Table */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#12151e]/80 backdrop-blur-md rounded-2xl border border-[#202534]">
            <p className="text-gray-400 text-sm">
              일치하는 아카이브 작품이 없습니다.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCategory('All');
                setSelectedEra('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30"
            >
              전체 작품 초기화 보기
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={handleSelectProject}
              />
            ))}
          </div>
        ) : (
          <ProjectTableView
            projects={filteredProjects}
            onSelect={handleSelectProject}
          />
        )}
      </main>

      {/* Footer */}
      <div className="relative z-20">
        <Footer
          onOpenAbout={() => {
            sound.playClick();
            setIsAboutOpen(true);
          }}
          onOpenHarness={() => {
            sound.playClick();
            setIsHarnessOpen(true);
          }}
        />
      </div>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ProfileModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <HarnessModal
        isOpen={isHarnessOpen}
        onClose={() => setIsHarnessOpen(false)}
      />

      {/* Secret Easter Egg Overdrive Modal */}
      <EasterEggOverdrive
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}
