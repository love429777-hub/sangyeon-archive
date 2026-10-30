import React from 'react';
import { Mail } from 'lucide-react';
import profileData from '../data/profile.json';

const currentYear = new Date().getFullYear();

export default function Footer({ onOpenAbout, onOpenHarness }) {
  return (
    <footer className="w-full border-t border-[#1f242d] bg-[#090a0d] py-12 text-xs font-mono text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              디자인공학과 정상연 (Jung Sangyeon)
            </div>
            <div className="text-gray-400 font-light mt-0.5">
              Personal Digital Archive & Exhibition Catalog · 2026
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button onClick={onOpenAbout} className="hover:text-white transition-colors">
              About
            </button>
            <span>/</span>
            <button onClick={onOpenHarness} className="hover:text-blue-400 transition-colors">
              Harness
            </button>
            <span>/</span>
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail size={12} />
              <span>Contact</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[#1a1d26] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-600">
          <div>
            © {currentYear} Sangyeon Jung. All rights reserved.
          </div>
          <div>
            Built with React, Tailwind CSS & Antigravity Agent Harness.
          </div>
        </div>
      </div>
    </footer>
  );
}
