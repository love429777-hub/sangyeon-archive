import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'src', 'data', 'projects.json');

// 명령줄 인자 파싱: node harness/add-project.mjs --title="작품명" --id="work-slug" ...
const args = process.argv.slice(2);
const options = {};
args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, ...vals] = arg.slice(2).split('=');
    options[key] = vals.join('=');
  }
});

let projects = [];
if (fs.existsSync(dataFile)) {
  try {
    projects = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch (e) {
    projects = [];
  }
}

const nextIndexNum = projects.length + 1;
const indexStr = String(nextIndexNum).padStart(2, '0');
const defaultId = options.id || `project-${Date.now().toString().slice(-4)}`;

const newProject = {
  id: defaultId,
  index: indexStr,
  title: options.title || `새 디자인 프로젝트 ${indexStr}`,
  titleEn: options.titleEn || `New Design Engineering Project ${indexStr}`,
  subtitle: options.subtitle || '형상 미학과 기구 메커니즘의 정밀한 조화',
  year: options.year || String(new Date().getFullYear()),
  category: options.category || 'Product Design',
  period: options.period || `${new Date().getFullYear()}.03 - ${new Date().getFullYear()}.06`,
  role: options.role || '기구설계 및 CMF 디렉팅 (개인 100%)',
  awards: options.awards || '',
  featured: options.featured === 'true' || true,
  thumbnail: options.thumbnail || `https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80`,
  summary: options.summary || '본 작품은 사용자의 행동 패턴과 기구적 안정성을 결합하여 설계된 디자인공학 프로젝트입니다.',
  specs: {
    dimensions: options.dimensions || '240 x 160 x 85 mm',
    materials: options.materials || 'CNC Anodized Aluminum 6061, Injection Molded PC-ABS',
    tools: options.tools ? options.tools.split(',') : ['SolidWorks', 'Rhino 3D', 'KeyShot', '3D Printing'],
    mechanisms: options.mechanisms || 'Cam & Follower Linkage Mechanism'
  },
  process: [
    {
      phase: '01. Problem & User Research',
      description: '기존 사용 환경의 불편점 분석 및 사용성 데이터 추출.'
    },
    {
      phase: '02. CAD & Mechanism Engineering',
      description: '3D 파라메트릭 모델링 및 공차 분석, 작동 간섭 시뮬레이션.'
    },
    {
      phase: '03. Prototyping & CMF Refinement',
      description: '작동 목업 제작, 3D 프린팅 공차 검증 및 CMF 마감 사양 확정.'
    }
  ],
  gallery: [
    {
      url: options.thumbnail || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      caption: '전체 외관 렌더링 뷰',
      type: 'render'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      caption: '내부 기구 구조 및 메커니즘 시뮬레이션',
      type: 'mechanism'
    }
  ],
  links: {
    video: options.video || '',
    github: options.github || '',
    cad: options.cad || ''
  }
};

// 중복 ID 방지
const existingIdx = projects.findIndex(p => p.id === newProject.id);
if (existingIdx >= 0) {
  projects[existingIdx] = newProject;
  console.log(`🔄 [Harness] 기존 프로젝트 "${newProject.id}"가 성공적으로 업데이트되었습니다.`);
} else {
  projects.push(newProject);
  console.log(`✨ [Harness] 새 도록 프로젝트 #${indexStr} ("${newProject.title}")가 추가되었습니다.`);
}

fs.mkdirSync(path.dirname(dataFile), { recursive: true });
fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2), 'utf8');

console.log(`📁 저장 경로: ${dataFile}`);
console.log(`🚀 검증을 위해 'npm run harness:validate'를 실행하세요.\n`);
