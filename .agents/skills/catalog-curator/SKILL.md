---
name: catalog-curator
description: >-
  디자인공학과 정상연의 디지털 도록 및 개인 아카이브에 신규 작품을 등록하거나 기존 작품을 도록 수준의 완성도로 기획/편집/작성할 때 사용하는 스킬입니다.
---

# 📖 Catalog Curator Skill (작품 도록 큐레이션)

이 스킬은 사용자가 작업한 프로젝트(제품 디자인, 기구설계, 인터랙션, 목업 등)를 디지털 도록에 최적화된 형식으로 기록하도록 안내합니다.

## 1. 큐레이션 워크플로우

1. **원천 정보 수집**:
   - 작품의 명칭 (국문/영문)
   - 작업 연도 및 기간
   - 핵심 문제 정의 및 아이디어
   - 사용 도구 (SolidWorks, Rhino, KeyShot, 3D 프린터, 아두이노 등)
   - 재질 및 가공법 (CMF: Anodized Aluminum, CNC, 3D Print, PC 등)
   - 주요 이미지 (렌더링, 도면, 내부 기구, 실물 목업)

2. **도록 서문 및 프로세스 스토리 작성**:
   - 도록 스타일의 간결하면서도 깊이 있는 어조 유지.
   - 단순한 외형 묘사를 넘어 "공학적 메커니즘을 어떻게 조형에 통합했는지" 서술.

3. **데이터 생성 및 등록**:
   - 하네스 명령 실행:
     ```bash
     npm run harness:add -- --id="project-slug" --title="작품명" --titleEn="Title En" --category="Product Design"
     ```
   - 또는 `src/data/projects.json` 파일에 직접 스키마에 맞춰 블록 추가.

4. **검증**:
   - `npm run harness:validate` 실행하여 오류가 없는지 최종 확인.
