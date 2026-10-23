# 📘 Antigravity 프로젝트 가이드라인 (GEMINI.md)

**프로젝트명**: 디자인공학과 정상연 (Design Engineering · Sangyeon Jung)  
**사이트 성격**: 개인 아카이브 & 디지털 도록 (Personal Digital Archive & Exhibition Catalog)

---

## 1. 프로젝트 개요 및 핵심 원칙
- 본 웹사이트는 디자인공학과 정상연의 조형적 미학과 공학적 메커니즘을 담은 디지털 도록입니다.
- 단순한 포트폴리오를 넘어 미술관 도록(Catalog)의 정갈함과 엔지니어링 스펙 시트(CAD, CMF, FEA, 메커니즘)의 정밀함을 동시에 추구합니다.

---

## 2. 하네스 자동화 파이프라인 (Harness Commands)
모든 에이전트와 개발자는 프로젝트 조작 시 다음 하네스 명령을 우선 활용합니다:
- `npm run harness:add`: 새 작품 스키마 템플릿 생성 및 `projects.json` 등록
- `npm run harness:validate`: 필수 필드, 갤러리 규격, 누락 데이터 유효성 검사
- `npm run harness:stats`: 카테고리별/설계툴별 아카이브 통계 출력
- `npm run dev`: 로컬 프리뷰 서버 기동 (Vite)
- `npm run build`: 프로덕션 번들 빌드

---

## 3. 서브에이전트 역할 (Agent Delegation)
- **`catalog-curator`**: 사용자가 작품 메모, 사진, CAD 파일을 전달했을 때 전시 도록 수준의 서문, 3단계 프로세스, CMF 스펙을 정제하여 등록.
- **`archive-engineer`**: React/Tailwind 기반 컴포넌트, 인터랙션(모달, 라이트박스, 테이블 뷰), 반응형 UI 구현 및 성능 개선.
- **`quality-critic`**: 도록 완성도 검증, `harness:validate` 실행, 웹 접근성 및 시각적 위계 감사.

---

## 4. 데이터 저장소 규격
- 작품 데이터: `src/data/projects.json` (스키마: `harness/schema.json`)
- 프로필/약력: `src/data/profile.json`
- 모든 프로젝트는 반드시 `dimensions`, `materials`, `tools`, `process (최소 2단계 이상)`, `gallery`를 포함해야 함.
