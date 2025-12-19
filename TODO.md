# e스포츠 캘린더 웹사이트 — TODO

## 목표
- 리그 오브 레전드(LoL), 발로란트(Valorant), 오버워치(Overwatch) 대회 일정을 보기 쉬운 웹앱으로 제공한다.
- 메인 페이지에 캘린더, 오늘의 경기, 게임별 필터 기능을 제공한다.
- 각 게임 전용 페이지에서 과거/미래 일정, 진행 중인 대회 및 결과, 대회 진행 방식을 설명한다.

## 페이지 구성
- 메인 페이지(`index.html`)
  - 웹페이지 제목과 게임 페이지 이동 버튼(LoL/Valorant/Overwatch)
  - 월간 캘린더에 일자별 이벤트 표시
  - 사이드바: 오늘의 경기 목록
  - 필터: 선택한 게임의 일정만 표시
- 게임 페이지(`pages/lol.html`, `pages/valorant.html`, `pages/overwatch.html`)
  - 좌측: 과거 및 미래 대회 일정 목록
  - 우측: 현재 진행 중인 대회 및 최근 결과
  - 하단: 해당 게임의 대회 진행 방식 설명

## 데이터
- 초기 데이터는 `assets/js/data.js`에 정적인 JSON 유사 구조로 저장한다.
- 이벤트 필드: id, title, game, startDate, endDate, location, status(past/current/upcoming/future)
- 경기 필드: id, game, date, time, teams, tournament

## 주요 기능
- 현재 달 기준 캘린더 렌더링 및 날짜별 이벤트 표시
- 게임별 필터(LoL/Valorant/Overwatch)로 캘린더와 오늘의 경기 동시 필터링
- 오늘의 경기 사이드바에서 금일 매치만 표시
- 메인 ↔ 각 게임 페이지 간 간단한 네비게이션

## UI/UX 가이드
- 반응형 그리드 레이아웃: 메인(캘린더 + 사이드바), 게임 페이지(2열)
- 게임/상태 배지로 식별성 강화
- 버튼/필터에 대해 키보드 포커스, 대비 확보

## 마일스톤
1. 프로젝트 구조와 기본 파일 스캐폴딩
2. 메인 페이지 레이아웃/스타일/플레이스홀더 구현
3. 캘린더 컴포넌트 및 이벤트 필터링 구현
4. 게임 페이지(목록/결과/포맷 섹션) 구현
5. 샘플 데이터 작성 및 뷰 연결
6. 스타일 다듬기 및 반응형 최적화
7. README 추가 및 사용 방법 정리
8. 페이지 스모크 테스트(네비게이션/상호작용 확인)

## 완료 기준(AC)
- 메인 페이지에 샘플 데이터 기반의 캘린더/필터/오늘의 경기 표시
- 게임 버튼 클릭 시 각 게임 페이지로 정상 이동
- 게임 페이지에 과거/미래 일정, 진행 중 대회 및 결과, 진행 방식 텍스트가 표시
- 필터 토글 시 캘린더/오늘의 경기 표시가 해당 게임만으로 반영

## 체크리스트 (디자인/접근성 QA)
- 타이포그래피: Inter + Noto Sans KR 로드, 본문 16px, 제목 계층(헤더 > 카드 제목 > 본문)
- 컬러 토큰: 라이트 톤 배경 그라데이션, 메인 액센트 1개, 중립 2~3개 적용
- 레이아웃: 데스크탑 그리드(캘린더:사이드바 ≈ 1.7:1), 모바일(≤768px) 단일 열 스택
- 카드: 12~16px 라운딩, 얕은 그림자, 헤더/본문 시각 구분, 충분한 내부 패딩
- 버튼/내비: hover/active 마이크로 인터랙션(0.12~0.2s), focus-visible 아웃라인
- 필터/배지: 체크박스 숨김 + 배지 토글 스타일(checked 상태 대비/가독성 확보)
- 캘린더: 셀/이벤트 hover 시 살짝 상승, 게임별 색상 배경 톤인/톤아웃
- 애니메이션: prefers-reduced-motion 대응(애니메이션 비활성)
- 대비/접근성: 텍스트 대비, 키보드 탭 이동 경로, 스크린리더 친화적 구조 유지
- 반응형 QA: 375px~430px 모바일, 768px 태블릿, >=1200px 데스크탑에서 깨짐 없음

---

## 2025-12-19 작업 로그 및 계획

### 달력 자동 생성 개선 (현재 달 기준, 오늘 강조)
- 구현: 메인 달력이 사용자의 로컬 시간 기준으로 현재 달을 자동 렌더링하도록 보강했고, 오늘 날짜를 강조 표시함.
- 파일 변경
  - [assets/js/main.js](assets/js/main.js#L1-L999):
    - 달 상단에 `YYYY년 M월` 표시하는 `monthbar` 추가
    - 요일 표기를 한글(`일~토`)로 현지화
    - 달력 시작 요일 정렬을 위해 선행 공백 셀(`.day.blank`) 삽입
    - 오늘 날짜 셀에 `.today` 클래스 부여 및 스크린리더용 `aria-label` 추가
  - [assets/css/styles.css](assets/css/styles.css#L1-L999):
    - `.day.blank`, `.day.today` 스타일 추가
    - `.monthbar` 스타일 추가
- 수동 조작 없이 페이지 로드시 2025년 12월 기준 달력을 생성하고 19일을 강조함.

### 남은 작업
- 월 이동(이전/다음 달) 내비게이션 버튼 추가 여부 결정 및 구현
### 2025-12-19 업데이트: 월 내비게이션 추가
- 기능: 이전/다음/오늘 버튼으로 월 전환, 필터 변경 시 현재 표시 중인 월 유지
- 파일 변경
  - [assets/js/main.js](assets/js/main.js#L1-L999): `renderCalendar()`가 `state(year, month)`를 받아 해당 월 렌더, 버튼 이벤트로 상태 갱신 후 재렌더
  - [assets/css/styles.css](assets/css/styles.css#L1-L999): `.monthbar`, `.monthlabel`, `.monthnav`, `.nav-btn` 스타일 추가/조정
- 접근성: 버튼에 `aria-label` 부여, 월 라벨 영역 `aria-live` 유지
- 확인 포인트: 오늘 버튼 클릭 시 현재 달로 복귀, 오늘 날짜 강조 표시 정상 동작

### 2025-12-19 업데이트: 표시 범위와 UI 정렬 변경
### 2025-12-19 업데이트: 게임 페이지 헤더 로고 적용
- 2025-12-19 업데이트: 게임 페이지 히어로 로고 강조
  - 요구사항: 히어로 섹션에서 "대회 일정과 결과" 문구 제거, 로고 크게 노출
  - 파일 변경: [pages/lol.html](pages/lol.html), [pages/valorant.html](pages/valorant.html), [pages/overwatch.html](pages/overwatch.html) — 헤더의 보조 문구 제거
  - 스타일 변경: [assets/css/styles.css](assets/css/styles.css) — `[data-game] .brand-logo { height: 96px; }`로 게임 페이지 로고 확대
- 요구사항: 각 게임 페이지에서 게임 이름 텍스트 대신 해당 게임 로고 표시
- 구현: 자체 제작 SVG 로고(브랜드 색상 활용, 텍스트 마크) 추가 후 헤더에 이미지로 교체, 접근성을 위해 `alt`와 `sr-only` 텍스트 병행
- 파일 추가: 
  - [assets/img/lol.svg](assets/img/lol.svg)
  - [assets/img/valorant.svg](assets/img/valorant.svg)
  - [assets/img/overwatch.svg](assets/img/overwatch.svg)
- 파일 변경:
  - [pages/lol.html](pages/lol.html): `<h1>`에 로고 이미지 삽입
  - [pages/valorant.html](pages/valorant.html): `<h1>`에 로고 이미지 삽입
  - [pages/overwatch.html](pages/overwatch.html): `<h1>`에 로고 이미지 삽입
  - [assets/css/styles.css](assets/css/styles.css): `.brand-logo`, `.sr-only`, `.header h1.brand` 스타일 추가
- 비고: 초기에 커스텀 SVG 마크를 사용했으나, 사용자 제공 공식/준공식 로고로 교체함
- 2025-12-19 업데이트: 사용자 제공 로고로 경로 교체
  - [pages/lol.html](pages/lol.html): `../images/lol-logo-rendered-hi-res.png`
  - [pages/valorant.html](pages/valorant.html): `../images/V_Logotype_Red.png`
  - [pages/overwatch.html](pages/overwatch.html): `../images/overwatch-seeklogo.png`
  - [assets/css/styles.css](assets/css/styles.css): 래스터 로고 대응을 위해 `.brand-logo { object-fit: contain; }` 추가
- 범위 제한: 올해 1월 ~ 내년 12월까지만 내비게이션 가능. 경계에서는 이전/다음 버튼 비활성화
- UI 정렬: 월/년도 라벨을 좌측, 내비게이션 버튼을 우측으로 배치(자리 교체)
- 파일 변경
  - [assets/js/main.js](assets/js/main.js#L1-L999): 경계 계산 및 버튼 비활성화 처리, 라벨-버튼 순서 교체
  - [assets/css/styles.css](assets/css/styles.css#L1-L999): 비활성 버튼 스타일(`.nav-btn[disabled]`) 추가
- 주 시작 요일(월요일 시작) 옵션 제공 여부 검토
- 이벤트 툴팁/모달(대회명, 장소, 기간) UX 추가
- 키보드 내비게이션(←→↑↓로 날짜 이동) 및 포커스 스타일 보강

### 제안: 웹페이지 개선 아이디어
- 성능
  - 이미지/폰트 프리로드 및 리소스 힌트(`preconnect`, `preload`)로 FCP 개선
  - 정적 데이터에 ETag/캐시 헤더 가이드(정적 호스팅 시 설정)
- UX
  - 달 전환(이전/다음)과 오늘로 돌아오기 버튼
  - 이벤트 카테고리 색상 전설(legend) 고정 영역 추가
  - 날짜 셀 더블클릭 시 해당 날짜 상세로 이동하는 경로 제공
- 접근성(i18n/a11y)
  - 다국어 토글(ko/en)과 `lang` 전환 시 요일/날짜 포맷 동기화
  - 스크린리더용 라이브 영역(달 전환 시 월/연도 읽어주기)
  - 색상 대비 체크 및 고대비 모드 토글
- 기능
  - `.ics` 내보내기(선택 이벤트를 캘린더로 추가)
  - 타임존 표시(사용자/대회 지역 기준 전환)
  - 검색/필터 확장(대회명, 지역, 상태)
- 배포/운영
  - GitHub Pages 배포 스크립트
  - 간단한 CI(링트/정적 분석) 추가

### 2025-12-19 업데이트: 푸터 문의 이메일 추가
- [index.html](index.html) 하단 푸터에 문의 이메일 추가: `문의: seiheon1020@hansei.ac.kr` (mailto 링크 포함)
- 목적: 사용자가 문의 채널을 쉽게 찾도록 가시성 및 접근성 향상

### 2025-12-19 업데이트: mailto 링크 제거
- 요청에 따라 푸터의 mailto 링크를 제거하고 순수 텍스트로 표기
- 변경 파일: [index.html](index.html)
- 표기: © 2025 Esports Calendar · 문의: seiheon1020@hansei.ac.kr

### 2025-12-19 업데이트: 데이터 구조 교체 및 메인 렌더 리팩터링
- 데이터: [assets/js/data.js](assets/js/data.js)를 `const data = { tournaments: [...] }` 구조로 전면 교체
- 렌더: [assets/js/main.js](assets/js/main.js)
  - 캘린더(좌측): 현재 월 기준 날짜별 그룹 리스트로 렌더, 각 대회 항목에 `data-tid` 부여(클릭 가능)
  - 오늘 경기(우측): `renderRightPanel()`로 대체 — 라이브 우선, 없으면 오늘, 없으면 가까운 미래 대회 경기 표시
  - 필터: LoL/VAL/OW 체크박스에 따라 좌/우 모두 필터링, 선택된 대회가 필터 아웃되면 선택 해제
  - 선택: 좌측 대회 클릭 시 우측을 해당 대회 경기로 교체, 좌측 항목 강조(`.selected`)
- 스타일: [assets/css/styles.css](assets/css/styles.css)에 `.badge.live` 추가
### 2025-12-19 업데이트: 대회/경기 일정 동작 구현
- 요구사항:
  - 좌측 카드: "대회 일정"(과거/현재/미래 포함) 목록
  - 우측 카드: "경기 일정" 상세(시간, 팀, 스코어, 상태 등)
  - 기본 화면: 라이브 경기가 있으면 우선 표시, 없으면 최신/현재 대회의 경기 표시
  - 클릭 시 선택된 대회의 경기 목록으로 우측 갱신, 좌측 항목 선택 강조
- 구현:
  - [pages/*.html](pages) — 섹션 제목을 "대회 일정"/"경기 일정"으로 변경, 우측 컨테이너 id를 `game-matches`로 통일
  - [assets/js/data.js](assets/js/data.js) — `MATCHES`에 `status`(live/completed/upcoming), `score` 필드 추가 및 샘플 데이터 확장(2025-12-19 포함)
  - [assets/js/main.js](assets/js/main.js) — `renderGamePage(game)` 내 좌측 클릭 핸들러와 기본 표시 로직(라이브 우선, 그 외 현재/기본 대회) 구현
  - [assets/css/styles.css](assets/css/styles.css) — `.list .item.selected` 스타일로 선택 강조(배경/테두리)
- 확인 포인트:
  - 좌측 클릭 시 우측 경기 카드가 해당 대회 경기로 업데이트
  - 라이브가 있을 때 기본으로 실시간 경기 표시
  - 선택 강조 스타일 적용 및 접근성/키보드 포커스 경로 문제 없음

### 2025-12-19 업데이트: 메인 페이지 레이아웃 복원 + 캘린더/데이터 동기화
- 요구사항: 메인 페이지를 초기 모습(텍스트 헤더, 그리드 캘린더)으로 되돌리고, 캘린더 내용이 실제 데이터와 일치하도록 수정
- 구현 요약:
  - 캘린더(좌측): 다시 월간 그리드 형태로 렌더. `data.tournaments`의 `startDate~endDate` 범위를 사용해 각 날짜 셀에 해당 대회명을 이벤트로 표시. 게임 필터(lol/val/ow) 적용 유지
  - 오늘 경기(우측): 금일(`YYYY-MM-DD`)의 경기만 리스트로 표시. 라이브 경기를 상단 정렬, 상태/스코어/단계와 게임 배지 출력
  - 헤더/히어로: 메인 페이지는 텍스트 제목/부제 형태를 유지(로고 히어로는 각 게임별 페이지 전용)
- 파일 변경:
  - [assets/js/main.js](assets/js/main.js):
    - `renderCalendar()`를 월간 그리드 렌더로 환원(요일 헤더/선행 공백/오늘 강조 포함)
    - `renderTodayMatches()` 신규 추가 — `data.tournaments`에서 금일 경기를 집계하여 리스트 렌더
    - `setupMainPage()`에서 좌측/우측 각각 `renderCalendar()`/`renderTodayMatches()` 호출로 연결
- 확인 포인트:
  - 필터 토글 시 캘린더와 오늘 경기 모두 선택된 게임만 반영
  - 현재/다음년도 범위 내에서 월 내비게이션 동작 및 오늘 버튼 정상
  - 2025-12-19 기준 캘린더와 오늘 경기 패널이 `assets/js/data.js`와 일치

