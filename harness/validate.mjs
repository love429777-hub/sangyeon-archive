import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'src', 'data', 'projects.json');

console.log('🔍 [Harness Validator] 디지털 도록 아카이브 데이터 무결성 검증을 시작합니다...\n');

if (!fs.existsSync(dataFile)) {
  console.error(`❌ [오류] 데이터 파일을 찾을 수 없습니다: ${dataFile}`);
  process.exit(1);
}

let projects;
try {
  const content = fs.readFileSync(dataFile, 'utf8');
  projects = JSON.parse(content);
} catch (err) {
  console.error(`❌ [JSON 파싱 오류]: ${err.message}`);
  process.exit(1);
}

if (!Array.isArray(projects)) {
  console.error('❌ [스키마 오류] projects.json의 최상위는 배열(Array)이어야 합니다.');
  process.exit(1);
}

const requiredFields = [
  'id', 'index', 'title', 'titleEn', 'subtitle', 'year',
  'category', 'period', 'role', 'thumbnail', 'summary',
  'specs', 'process', 'gallery'
];

const validCategories = [
  'Product Design',
  'Mechanism & Engineering',
  'Interaction & UX',
  'Sustainable & Concept'
];

let errors = 0;
let warnings = 0;
const idSet = new Set();

projects.forEach((proj, idx) => {
  const label = `작품 #${idx + 1} (${proj.title || proj.id || 'Unknown'})`;

  // ID 중복 검사
  if (!proj.id) {
    console.error(`❌ [${label}] 'id' 필드가 누락되었습니다.`);
    errors++;
  } else if (idSet.has(proj.id)) {
    console.error(`❌ [${label}] 중복된 ID가 발견되었습니다: "${proj.id}"`);
    errors++;
  } else {
    idSet.add(proj.id);
  }

  // 필수 필드 검사
  for (const field of requiredFields) {
    if (proj[field] === undefined || proj[field] === null || proj[field] === '') {
      console.error(`❌ [${label}] 필수 필드 '${field}'가 비어있거나 누락되었습니다.`);
      errors++;
    }
  }

  // 카테고리 검사
  if (proj.category && !validCategories.includes(proj.category)) {
    console.warn(`⚠️ [${label}] 허용되지 않은 카테고리: "${proj.category}". 허용값: ${validCategories.join(', ')}`);
    warnings++;
  }

  // 스펙 구조 검사
  if (proj.specs) {
    if (!proj.specs.dimensions) {
      console.warn(`⚠️ [${label}] specs.dimensions (규격/사이즈)가 입력되지 않았습니다.`);
      warnings++;
    }
    if (!proj.specs.materials) {
      console.warn(`⚠️ [${label}] specs.materials (소재/재질)가 입력되지 않았습니다.`);
      warnings++;
    }
    if (!Array.isArray(proj.specs.tools) || proj.specs.tools.length === 0) {
      console.warn(`⚠️ [${label}] specs.tools (사용 설계 툴/장비) 목록이 비어있습니다.`);
      warnings++;
    }
  }

  // 프로세스 배열 검사
  if (Array.isArray(proj.process)) {
    if (proj.process.length < 2) {
      console.warn(`⚠️ [${label}] 디자인공학 프로세스 단계가 ${proj.process.length}개로 너무 적습니다. (권장: 3단계 이상)`);
      warnings++;
    }
  }

  // 갤러리 검사
  if (Array.isArray(proj.gallery)) {
    if (proj.gallery.length === 0) {
      console.warn(`⚠️ [${label}] 갤러리 이미지가 없습니다.`);
      warnings++;
    }
  }
});

console.log('--------------------------------------------------');
if (errors === 0 && warnings === 0) {
  console.log(`✅ [성공] 총 ${projects.length}개의 도록 프로젝트가 완벽한 규격으로 검증되었습니다!`);
  process.exit(0);
} else if (errors === 0) {
  console.log(`✨ [통과] 오류는 없습니다. ${warnings}개의 권장 개선 사항(Warning)이 있습니다.`);
  process.exit(0);
} else {
  console.error(`💥 [실패] 총 ${errors}개의 치명적 오류와 ${warnings}개의 경고가 발견되었습니다.`);
  process.exit(1);
}
