import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryFilters from './components/CategoryFilters';
import ProjectCard from './components/ProjectCard';
import ProjectTableView from './components/ProjectTableView';
import ProjectModal from './components/ProjectModal';
import ProfileModal from './components/ProfileModal';
import HarnessModal from './components/HarnessModal';
import Footer from './components/Footer';

import initialProjects from './data/projects.json';

export default function App() {
  const [projects] = useState(initialProjects);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHarnessOpen, setIsHarnessOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const titleMatch = p.title?.toLowerCase().includes(q);
      const titleEnMatch = p.titleEn?.toLowerCase().includes(q);
      const subMatch = p.subtitle?.toLowerCase().includes(q);
      const materialMatch = p.specs?.materials?.toLowerCase().includes(q);
      const toolsMatch = p.specs?.tools?.some((t) =>
        t.toLowerCase().includes(q)
      );

      return titleMatch || titleEnMatch || subMatch || materialMatch || toolsMatch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const scrollToArchive = () => {
    const el = document.getElementById('archive-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#e2e8f0]">
      {/* Navigation */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHarness={() => setIsHarnessOpen(true)}
        totalProjects={projects.length}
      />

      {/* Hero Banner / Manifesto */}
      <HeroBanner
        totalProjects={projects.length}
        onExplore={scrollToArchive}
      />

      {/* Main Archive / Digital Catalog Section */}
      <main id="archive-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Category Filters & Search */}
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredCount={filteredProjects.length}
          totalCount={projects.length}
        />

        {/* Content View: Grid or Table */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#12151e] rounded-2xl border border-[#202534]">
            <p className="text-gray-400 text-sm">
              일치하는 아카이브 작품이 없습니다.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors"
            >
              전체 작품 보기
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <ProjectTableView
            projects={filteredProjects}
            onSelect={setSelectedProject}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHarness={() => setIsHarnessOpen(true)}
      />

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
    </div>
  );
}
