# 🏛️ 프로젝트 에이전트 & 하네스 규격서 (AGENTS.md)
**프로젝트명**: 디자인공학과 정상연 (Design Engineering · Sangyeon Jung)  
**유형**: 개인 아카이브 & 디지털 도록 (Personal Digital Archive & Catalog)

---

## 1. 프로젝트 비전 및 정체성 (Identity)

본 웹사이트는 **'디자인공학과 정상연'**의 작품들을 기록하고 세상에 알리기 위한 **개인 아카이브 겸 디지털 도록(Digital Exhibition Catalog)**입니다.

- **핵심 가치**: 
  - **Aesthetic Rigor (조형적 완성도)**: 단순한 결과물 나열이 아닌, 전시 도록(Exhibition Catalog)처럼 절제되고 세련된 시각적 연출.
  - **Engineering Depth (공학적 깊이)**: 3D CAD/기구설계, 메커니즘, 구조 해석, 재료(CMF), 프로토타이핑, 양산 고려 등 디자인공학도만의 엔지니어링 프로세스 상세 기록.
  - **Storytelling (문제해결 서사)**: '문제 인식(Problem) → 리서치 및 발상(Concept) → 설계 및 공학 검증(Engineering) → 제작 및 완성(Prototype/Final)'의 명확한 흐름.

---

## 2. 서브에이전트 역할 정의 (Agent Roles)

본 아카이브 시스템은 3가지 특화 에이전트가 협업하여 운영됩니다.

| 에이전트 명 | 전문 분야 | 주요 임무 |
| :--- | :--- | :--- |
| **`catalog-curator`** | 아카이브 큐레이터 | • 사용자 입력(아이디어, 메모, 사진)을 바탕으로 도록 텍스트(국/영문) 작성<br>• CMF, 규격, 설계 도구, 메커니즘 등 공학적 스펙 정제<br>• `harness/add-project.mjs` 또는 `src/data/projects.json`에 정규 데이터 등록 |
| **`archive-engineer`** | 프론트엔드 엔지니어 | • 모던하고 반응형인 디지털 도록 웹 인터페이스 개발 및 유지보수<br>• 갤러리 그리드/리스트 뷰, 카테고리 필터, 상세 모달, 라이트박스 구현<br>• 성능 최적화(Lighthouse), WebP 이미지 처리, 인터랙션 모션 구현 |
| **`quality-critic`** | 디자인 & QA 크리틱 | • `npm run harness:validate` 실행으로 데이터 무결성 및 누락 검증<br>• 전시 도록으로서의 시각적 위계(타이포그래피, 여백, 일관성) 비평<br>• 모바일/태블릿 반응형 검사 및 웹 접근성 감사 |

---

## 3. 에이전트 하네스 도구 체계 (Harness Tooling)

하네스는 에이전트와 사용자가 실수 없이 아카이브 데이터를 다룰 수 있도록 돕는 자동화 파이프라인입니다.

### 실행 명령어 (npm scripts)
- `npm run harness:add` : 대화형 또는 인자 기반으로 새 작품(도록 항목)을 생성
- `npm run harness:validate` : 등록된 모든 작품의 필수 필드, 이미지 경로, 유효성 검사
- `npm run harness:stats` : 현재 아카이브의 카테고리별 통계 및 현황 요약 출력

---

## 4. 작품 도록 데이터 스키마 (Project Schema)

각 작품은 `src/data/projects.json`에 아래와 같은 엄격한 형식으로 보관됩니다:

```json
{
  "id": "project-slug",
  "index": "01",
  "title": "작품 국문명",
  "titleEn": "Project English Title",
  "subtitle": "한 줄 요약 슬로건",
  "year": "2026",
  "category": "Product Design" | "Engineering & Mechanism" | "UX & Interaction" | "Concept & Research",
  "period": "2026.03 - 2026.06",
  "role": "기구설계 및 CMF 디렉팅 (개인 100%)",
  "awards": "선택사항 (수상 내역 또는 전시 내역)",
  "thumbnail": "/images/projects/project-slug/thumb.jpg",
  "summary": "작품에 대한 도록 서문 스타일의 개요 설명 (2~3문장)",
  "specs": {
    "dimensions": "120 x 85 x 210 mm",
    "materials": "Anodized Aluminum 6061, Frosted Polycarbonate, Silicone",
    "tools": ["SolidWorks", "KeyShot", "Rhino 3D", "FDM 3D Printing", "Arduino"],
    "mechanisms": "4-bar linkage, Magnetic snap-fit"
  },
  "process": [
    {
      "phase": "01. Problem & Insight",
      "description": "기존 제품의 사용성 및 기구적 한계 분석..."
    },
    {
      "phase": "02. Form & Mechanism Design",
      "description": "CAD 모델링 및 작동 메커니즘 시뮬레이션..."
    },
    {
      "phase": "03. Prototyping & CMF",
      "description": "3D 프린팅 프로토타입 제작 및 표면 후가공 테스팅..."
    }
  ],
  "gallery": [
    { "url": "/images/projects/project-slug/1.jpg", "caption": "정면 렌더링 뷰", "type": "render" },
    { "url": "/images/projects/project-slug/2.jpg", "caption": "기구부 분해도 (Exploded View)", "type": "engineering" }
  ],
  "links": {
    "video": "https://...",
    "github": "https://...",
    "cad": ""
  }
}
```

---

## 5. 디자인 시스템 및 시각 톤앤매너

1. **컬러 팔레트**:
   - Background: Pure White (`#FFFFFF`) or Deep Minimalist Charcoal (`#0F1115`)
   - Text: High Contrast Pitch Black (`#111827`) & Refined Slate (`#64748B`)
   - Accent: Engineering Industrial Accent (e.g., International Klein Blue `#1D4ED8` or Precision Orange `#EA580C`)
2. **타이포그래피**:
   - 국문: Pretendard / Noto Sans KR (단정하고 현대적인 산세리프)
   - 영문 및 인덱스: Inter, Geist, JetBrains Mono (기술적 정밀함을 주는 모노스페이스 숫자)
3. **인터랙션**:
   - 도록의 페이지를 넘기는 듯한 부드러운 전환과 정교한 호버/포커스 반응.
