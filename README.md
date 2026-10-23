# 🏛️ 디자인공학과 정상연 | 개인 아카이브 & 디지털 도록
> **Personal Digital Archive & Exhibition Catalog of Sangyeon Jung (Design Engineering)**

---

## 🌟 프로젝트 개요
**‘디자인공학과 정상연’**은 조형적 심미성과 기구역학적 정밀함을 융합한 작품들을 세상에 알리기 위한 개인 아카이브 겸 디지털 도록(Exhibition Catalog) 웹사이트입니다.

- **갤러리 도록 뷰 (Exhibition Mode)**: 카탈로그 넘버링(`№ 01`), CMF 소재 정보, 디자인 프로세스 스토리텔링.
- **엔지니어링 인덱스 뷰 (Specs Mode)**: 치수, 재질, CAD 도구, 핵심 메커니즘을 한눈에 파악하는 기술 스펙 시트.
- **AI 에이전트 & 하네스 체계**: 신규 작품 등록, 스키마 검증, 큐레이션을 자동화하는 엔지니어링 파이프라인 탑재.

---

## 🤖 전담 서브에이전트 체계 (Subagents)

1. **`catalog-curator`**: 작품 아이디어와 사진을 바탕으로 미술관 도록 수준의 해설 에세이와 CMF/공학 스펙을 작성.
2. **`archive-engineer`**: 현대적인 반응형 프론트엔드 UI, 인터랙션 및 성능 최적화 구현.
3. **`quality-critic`**: 스키마 데이터 무결성 및 시각적 위계, 모바일 최적화 검수.

---

## ⚡ 하네스 실행 명령어 (Harness CLI)

```bash
# 로컬 개발 서버 실행
npm run dev

# 새 프로젝트 스캐폴딩 생성
npm run harness:add -- --id="project-slug" --title="작품명" --category="Product Design"

# 도록 데이터 유효성 및 무결성 검증
npm run harness:validate

# 아카이브 통계 및 현황 리포트 출력
npm run harness:stats

# 프로덕션 빌드
npm run build
```

---

## 📁 주요 디렉토리 구조

```
├── .agents/
│   └── skills/                  # 에이전트 스킬 (catalog-curator, validator, design-system)
├── harness/
│   ├── schema.json              # 도록 프로젝트 JSON 스키마
│   ├── add-project.mjs          # 신규 작품 추가 하네스 스크립트
│   ├── validate.mjs             # 데이터 무결성 검증기
│   └── stats.mjs                # 아카이브 현황 리포터
├── src/
│   ├── data/
│   │   ├── projects.json        # 도록 작품 데이터베이스
│   │   └── profile.json         # 정상연 디자이너 프로필 및 약력
│   ├── components/              # 도록 갤러리, 모달, 스펙 시트 컴포넌트
│   ├── App.jsx                  # 메인 뷰 컨트롤러
│   └── index.css                # 도록 미학 스타일시트 (Tailwind v4)
├── AGENTS.md                    # 에이전트 및 하네스 공식 규격서
└── GEMINI.md                    # 에이전트 상시 룰북
```
