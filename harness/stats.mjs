import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'src', 'data', 'projects.json');

console.log('📊 [디자인공학과 정상연] 디지털 도록 아카이브 현황 리포트\n');

if (!fs.existsSync(dataFile)) {
  console.log('아직 등록된 프로젝트가 없습니다.');
  process.exit(0);
}

const projects = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
console.log(`총 등록 작품 수: ${projects.length}개\n`);

// 카테고리별 통계
const categories = {};
const toolsCount = {};
let totalImages = 0;

projects.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
  if (Array.isArray(p.gallery)) {
    totalImages += p.gallery.length;
  }
  if (p.specs && Array.isArray(p.specs.tools)) {
    p.specs.tools.forEach(tool => {
      toolsCount[tool] = (toolsCount[tool] || 0) + 1;
    });
  }
});

console.log('📌 [카테고리별 분포]');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`  - ${cat.padEnd(25)}: ${count}개`);
});

console.log(`\n🖼️ 총 아카이브 도록 이미지: ${totalImages}장 (프로젝트당 평균 ${(totalImages / (projects.length || 1)).toFixed(1)}장)`);

console.log('\n🛠️ [주요 사용 설계 도구 & 기술 스택 Top]');
Object.entries(toolsCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([tool, count]) => {
    console.log(`  - ${tool.padEnd(20)}: ${count}회 활용`);
  });

console.log('\n--------------------------------------------------');
