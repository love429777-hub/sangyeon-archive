---
name: catalog-validator
description: >-
  아카이브 도록 데이터의 무결성 검증, 누락 필드 탐지, 미디어 규격 점검을 실행할 때 사용하는 스킬입니다.
---

# 🔍 Catalog Validator Skill (도록 데이터 및 품질 검증)

디지털 도록에 누락된 필드가 없도록 하네스 검증 도구를 실행하고 보고서를 생성합니다.

## 실행 절차

1. 터미널에서 하네스 검증기 실행:
   ```bash
   npm run harness:validate
   ```
2. 아카이브 통계 및 현황 확인:
   ```bash
   npm run harness:stats
   ```
3. 에러 발생 시 처리 가이드:
   - `id missing / duplicate`: slug 영문 소문자와 하이픈 확인
   - `specs fields missing`: dimensions, materials, tools 배열 보충
   - `process steps`: 3단계 (문제 - 기구/형상설계 - 프로토타입/CMF) 보완
