/**
 * @file script.js — Blogr Landing Page 메뉴 인터랙션 전체 제어
 *
 * ──────────────────────────────────────────────────────────────
 * 【담당 기능 목록】
 *  1. 모바일 햄버거 메뉴 열기/닫기
 *  2. 모바일 아코디언(서브메뉴) 토글
 *  3. 데스크톱 드롭다운 메뉴 토글
 *  4. 외부 클릭 시 드롭다운 자동 닫기
 *  5. ESC 키로 모든 메뉴 닫기 (키보드 접근성 필수)
 *  6. 화면 리사이즈 시 모바일 메뉴 자동 초기화
 * ──────────────────────────────────────────────────────────────
 *
 * 【UI 상태 제어 핵심 원리 — Why Tailwind 'hidden' 클래스?】
 *  이 프로젝트는 별도의 CSS 파일 없이, Tailwind의 'hidden' 클래스
 *  (= display: none) 를 JavaScript의 classList.add/remove 로
 *  붙였다 띄었다 하는 것만으로 모든 UI 상태를 제어합니다.
 *
 *  비유: 전등 스위치처럼, 'hidden' 클래스가 있으면 꺼짐(숨김),
 *        없으면 켜짐(보임). CSS 파일을 건드릴 필요가 전혀 없어요.
 *
 * 【이벤트 위임(Event Delegation) 핵심 원리】
 *  각 버튼마다 이벤트를 따로 붙이는 대신, 상위 컨테이너 하나에만
 *  이벤트를 연결하고 event.target.closest()로 실제 클릭된 버튼을
 *  판별합니다. 이 방식은 이벤트 리스너 수를 줄여 성능을 최적화하고,
 *  나중에 메뉴 항목이 추가되어도 JS를 수정할 필요가 없게 합니다.
 *
 *  비유: 사무실마다 담당자를 두는 대신, 로비 데스크 한 명이
 *        방문자의 목적지를 파악해 안내하는 것과 같아요.
 */

/* ================================================================
   1. 상수 (Constants)
   ──────────────────────────────────────────────────────────────
   【Why 상수로 분리?】
   'aria-expanded', 'hidden' 같은 문자열을 코드 곳곳에 직접 쓰면
   (= 매직 스트링, Magic String) 오타 시 에러를 찾기 매우 어렵습니다.
   상수로 한 곳에 모아두면 오타를 IDE가 잡아주고, 나중에 값이
   바뀌어도 이 한 줄만 수정하면 전체 코드에 반영됩니다.
   비유: 회사 전화번호를 포스트잇에 한 번만 적어두고, 필요할 때마다
         그 포스트잇을 참고하는 것과 같아요.
================================================================ */

/** @constant {string} ARIA_EXPANDED - 메뉴 열림/닫힘 상태를 스크린 리더에 알리는 WAI-ARIA 속성 이름 */
const ARIA_EXPANDED = 'aria-expanded';

/** @constant {string} ARIA_CONTROLS - 버튼이 제어하는 대상 요소의 ID를 가리키는 WAI-ARIA 속성 이름 */
const ARIA_CONTROLS = 'aria-controls';

/**
 * @constant {string} CLASS_HIDDEN - Tailwind의 숨김 유틸리티 클래스 (= display: none)
 * UI의 표시/숨김 상태를 오직 이 클래스의 추가/제거만으로 제어합니다.
 */
const CLASS_HIDDEN = 'hidden';


/* ================================================================
   2. DOM 요소 참조 (DOM References)
   ──────────────────────────────────────────────────────────────
   【Why 상단에 모아서 선언?】
   getElementById는 DOM을 탐색하는 비용이 드는 작업입니다.
   함수 안에서 매번 호출하는 대신, 페이지 로드 시 딱 한 번만
   실행하고 변수에 저장해두면 이후 탐색 비용이 0이 됩니다.
   비유: 자주 쓰는 공구를 매번 창고에서 꺼내는 대신, 책상 위에
         꺼내놓고 쓰는 것과 같아요.
================================================================ */

/** @type {HTMLButtonElement} - 모바일 화면의 햄버거(≡) 토글 버튼 */
const hamburgerBtn  = document.getElementById('hamburger-btn');

/** @type {HTMLDivElement} - 모바일 메뉴 카드 전체 컨테이너 (role="dialog") */
const mobileMenu    = document.getElementById('mobile-menu');

/**
 * 【이중 아이콘 구조 — Why img.src 교체 방식을 버렸나?】
 * 기존 방식: JS가 img.src를 'icon-hamburger.svg' ↔ 'icon-close.svg' 로 직접 바꿈
 *   → 파일 경로가 JS 안에 숨어있어 유지보수가 어렵고, src 변경 시 이미지 깜빡임 발생
 *
 * 개선 방식: 두 <img> 태그를 HTML에 모두 선언해 두고, JS는 'hidden' 클래스만 토글
 *   → 이미지 경로 관리는 HTML이, 상태 제어는 JS가 담당하여 역할이 명확히 분리됨
 *   → 파일 경로 오타를 HTML에서 바로 확인 가능, 깜빡임 없음
 *
 * @type {HTMLImageElement}
 */
const iconHamburger = document.getElementById('icon-hamburger'); // 햄버거(≡) — 메뉴 닫힘 상태에서 표시
const iconClose     = document.getElementById('icon-close');     // 닫기(X) — 메뉴 열림 상태에서 표시


/* ================================================================
   3. 유틸리티 함수 (Utility Functions)
   ──────────────────────────────────────────────────────────────
   【Why 함수로 분리?】
   "모바일 메뉴 닫기" 동작은 햄버거 클릭, ESC 키, 화면 리사이즈 등
   여러 곳에서 발생합니다. 이 동작을 함수 하나로 만들어두면
   코드 중복이 없어지고, 수정이 필요할 때 이 함수 한 군데만 고치면
   모든 경우에 자동 반영됩니다. (DRY 원칙: Don't Repeat Yourself)
================================================================ */

/**
 * 모바일 메뉴 카드의 열림/닫힘 상태를 한 번에 설정하는 함수.
 *
 * 이 함수 하나가 메뉴와 관련된 모든 시각적 상태를 책임집니다:
 * - 메뉴 카드 표시/숨김
 * - 햄버거/닫기 아이콘 전환
 * - aria-expanded 속성 업데이트 (스크린 리더 접근성)
 * - aria-label 텍스트 업데이트
 * - 배경 스크롤 잠금/해제
 *
 * @param {boolean} isOpen - true: 메뉴 열기, false: 메뉴 닫기
 * @returns {void}
 */
function setMobileMenuState(isOpen) {
  if (isOpen) {
    /* ── 메뉴 열기 ── */
    mobileMenu.classList.remove(CLASS_HIDDEN);          // 'hidden' 제거 → display:none 해제 → 메뉴 카드 보임
    iconHamburger.classList.add(CLASS_HIDDEN);          // 햄버거(≡) 아이콘 숨기기
    iconClose.classList.remove(CLASS_HIDDEN);           // 닫기(X) 아이콘 표시하기
    hamburgerBtn.setAttribute(ARIA_EXPANDED, 'true');   // [A11y] 스크린 리더에게 "이 버튼이 제어하는 메뉴가 열렸습니다" 알림
    hamburgerBtn.setAttribute('aria-label', '메뉴 닫기'); // [A11y] 버튼의 현재 동작 설명을 업데이트
    document.body.style.overflow = 'hidden';            // 메뉴 열린 동안 배경 페이지 스크롤 잠금 (UX 개선)
  } else {
    /* ── 메뉴 닫기 ── */
    mobileMenu.classList.add(CLASS_HIDDEN);             // 'hidden' 추가 → display:none 적용 → 메뉴 카드 숨김
    iconHamburger.classList.remove(CLASS_HIDDEN);       // 햄버거(≡) 아이콘 다시 표시
    iconClose.classList.add(CLASS_HIDDEN);              // 닫기(X) 아이콘 숨기기
    hamburgerBtn.setAttribute(ARIA_EXPANDED, 'false');  // [A11y] 스크린 리더에게 "메뉴가 닫혔습니다" 알림
    hamburgerBtn.setAttribute('aria-label', '메뉴 열기'); // [A11y] 버튼의 현재 동작 설명을 원상복구
    document.body.style.overflow = '';                  // 배경 스크롤 잠금 해제 (빈 문자열 = CSS 기본값으로 리셋)
    closeAllMobileSubmenus();                           // 메뉴 닫기 전 열려있던 서브메뉴도 함께 접기
  }
}

/**
 * 모바일 메뉴 내부의 아코디언 서브메뉴를 전부 닫는 함수.
 *
 * 【Why 모두 닫는 방식?】
 * 한 아코디언을 열기 전 전체를 닫는 "아코디언 패턴"을 구현하기 위해,
 * 열기 로직을 실행하기 직전에 이 함수를 항상 먼저 호출합니다.
 * 이렇게 하면 "하나만 열리고 나머지는 닫히는" 동작을 간결하게 구현할 수 있습니다.
 *
 * @returns {void}
 */
function closeAllMobileSubmenus() {
  /* #mobile-menu 안의 aria-controls 속성을 가진 버튼 모두를 순회 */
  document.querySelectorAll(`#mobile-menu nav button[${ARIA_CONTROLS}]`).forEach(function(btn) {
    const submenuId = btn.getAttribute(ARIA_CONTROLS);  // 버튼이 가리키는 서브메뉴의 id 값
    const submenu   = document.getElementById(submenuId);
    btn.setAttribute(ARIA_EXPANDED, 'false');           // [A11y] 이 버튼의 서브메뉴가 "닫혔음"을 스크린 리더에 알림
    if (submenu) submenu.classList.add(CLASS_HIDDEN);   // 서브메뉴 목록에 'hidden' 추가 → 화면에서 숨김
  });
}

/**
 * 데스크톱 헤더의 드롭다운 메뉴를 전부 닫는 함수.
 *
 * 【Why 전용 함수로 분리?】
 * 드롭다운 닫기는 ① 다른 드롭다운 클릭, ② 외부 영역 클릭,
 * ③ ESC 키 누름 등 3가지 상황에서 호출됩니다.
 * 함수로 묶어두면 "드롭다운 닫는 방법"이 바뀌어도 이 함수 하나만 수정하면 됩니다.
 *
 * @returns {void}
 */
function closeAllDesktopDropdowns() {
  /* header 내부에서 aria-controls 값이 "dd-"로 시작하는 버튼을 모두 선택 */
  document.querySelectorAll(`header nav button[${ARIA_CONTROLS}^="dd-"]`).forEach(function(btn) {
    const menuId = btn.getAttribute(ARIA_CONTROLS);
    const menu   = document.getElementById(menuId);
    btn.setAttribute(ARIA_EXPANDED, 'false');           // [A11y] 이 드롭다운이 "닫혔음"을 스크린 리더에 알림
    if (menu) menu.classList.add(CLASS_HIDDEN);         // 드롭다운 목록에 'hidden' 추가 → 화면에서 숨김
  });
}


/* ================================================================
   4. 이벤트 리스너 (Event Listeners)
   ──────────────────────────────────────────────────────────────
   【이벤트 위임(Event Delegation) 전략】
   버튼 하나하나에 addEventListener를 붙이는 대신,
   상위 컨테이너에 하나만 붙이고 event.target.closest()로
   "실제로 클릭된 버튼이 맞는가?"를 판별합니다.

   장점:
   ① 이벤트 리스너 수 감소 → 메모리 사용량 최적화
   ② 나중에 메뉴 항목이 추가/삭제되어도 JS 코드 수정 불필요
   ③ 코드가 짧고 선언적이어서 읽기 쉬움
================================================================ */

/**
 * [이벤트 1] 햄버거 버튼 클릭 → 현재 상태의 반대(토글)로 전환
 *
 * aria-expanded 속성 값을 읽어 현재 상태를 판별한 후,
 * setMobileMenuState()에 반대 값을 전달하여 상태를 전환합니다.
 */
hamburgerBtn.addEventListener('click', function() {
  const isOpen = hamburgerBtn.getAttribute(ARIA_EXPANDED) === 'true'; // 문자열 'true'와 비교 (속성값은 항상 문자열)
  setMobileMenuState(!isOpen); // 열려있으면 닫고, 닫혀있으면 열기
});

/**
 * [이벤트 2] 모바일 아코디언 토글 — 이벤트 위임(Event Delegation) 패턴
 *
 * 【Why 이벤트 위임?】
 * Product / Company / Connect 버튼 3개에 각각 이벤트를 붙이는 대신,
 * 부모인 #mobile-menu에 이벤트 리스너 하나만 연결합니다.
 * 클릭이 발생하면 event.target.closest()로 "aria-controls 속성을 가진
 * 버튼이 클릭됐는가?"를 판별하여 처리합니다.
 *
 * 【아코디언 동작 원리】
 * ① 클릭된 버튼의 현재 열림 상태를 기억
 * ② closeAllMobileSubmenus()로 모든 서브메뉴를 먼저 닫기
 * ③ 기억한 상태가 "닫혀있었다면" 해당 서브메뉴만 다시 열기
 *    (이미 열려있었다면 ②에서 이미 닫혔으므로 그냥 둠 → 자연스러운 토글)
 */
mobileMenu.addEventListener('click', function(event) {
  /* closest(): 클릭된 요소(또는 그 조상 중) aria-controls 속성을 가진 button을 찾음 */
  /* 예: 버튼 안의 화살표 <img>를 클릭해도 부모 <button>을 정확히 잡아냄 */
  const btn = event.target.closest(`button[${ARIA_CONTROLS}]`);
  if (!btn) return; // 버튼 영역이 아닌 곳(여백, 링크 등) 클릭 시 조기 종료

  const targetId = btn.getAttribute(ARIA_CONTROLS); // 버튼이 제어하는 서브메뉴의 id (예: 'mob-product')
  const submenu  = document.getElementById(targetId);
  const isOpen   = btn.getAttribute(ARIA_EXPANDED) === 'true'; // 클릭 전 현재 상태 기억

  closeAllMobileSubmenus(); // 먼저 모든 서브메뉴를 닫아 아코디언 패턴 구현

  /* 클릭 전 상태가 "닫힘"이었을 때만 해당 서브메뉴를 열기 */
  if (!isOpen && submenu) {
    btn.setAttribute(ARIA_EXPANDED, 'true');        // [A11y] 스크린 리더에게 "이 서브메뉴가 열렸습니다" 알림
    submenu.classList.remove(CLASS_HIDDEN);         // 'hidden' 제거 → 서브메뉴 화면에 표시
  }
});

/**
 * [이벤트 3] 데스크톱 드롭다운 토글 — 이벤트 위임(Event Delegation) 패턴
 *
 * 【Why role="menubar" 컨테이너에 연결?】
 * Product / Company / Connect 드롭다운 버튼 3개에 각각 이벤트를 붙이는 대신,
 * aria 표준에 따라 role="menubar" 컨테이너 하나에만 연결합니다.
 * "dd-"로 시작하는 aria-controls 속성을 가진 버튼만 처리하도록 필터링합니다.
 *
 * 【event.stopPropagation()이 왜 필요한가?】
 * 이벤트는 버튼 → menubar → header → body → document 순으로 버블업(bubbling)됩니다.
 * stopPropagation()이 없으면, 드롭다운 버튼 클릭 직후 document의 [이벤트 4]가
 * 실행되어 드롭다운이 열리자마자 즉시 닫혀버리는 버그가 생깁니다.
 * 비유: 내 방 안의 일을 복도 보안카메라(document)가 감지하지 못하도록 차단하는 것
 */
document.querySelector('header [role="menubar"]').addEventListener('click', function(event) {
  /* "dd-"로 시작하는 aria-controls를 가진 버튼인지 확인 (드롭다운 토글 버튼) */
  const btn = event.target.closest(`button[${ARIA_CONTROLS}^="dd-"]`);
  if (!btn) return; // 드롭다운 토글 버튼이 아니면 조기 종료

  event.stopPropagation(); // 이벤트 버블링 차단 — [이벤트 4] 외부 클릭 감지가 동시에 실행되는 것을 방지

  const targetId = btn.getAttribute(ARIA_CONTROLS); // 열 드롭다운의 id (예: 'dd-product')
  const menu     = document.getElementById(targetId);
  const isOpen   = btn.getAttribute(ARIA_EXPANDED) === 'true'; // 클릭 전 현재 열림 상태 기억

  closeAllDesktopDropdowns(); // 다른 드롭다운이 열려있을 경우 먼저 모두 닫기

  /* 클릭 전 상태가 "닫힘"이었을 때만 해당 드롭다운을 열기 */
  if (!isOpen && menu) {
    btn.setAttribute(ARIA_EXPANDED, 'true');        // [A11y] 스크린 리더에게 "드롭다운이 열렸습니다" 알림
    menu.classList.remove(CLASS_HIDDEN);            // 'hidden' 제거 → 드롭다운 목록 화면에 표시
  }
});

/**
 * [이벤트 4] 외부 영역 클릭 감지 → 드롭다운 자동 닫기
 *
 * 【Why document에 연결?】
 * 드롭다운 '밖'을 감지하려면 페이지 전체(document)를 감시해야 합니다.
 * 클릭된 요소가 'header .relative'(드롭다운 래퍼) 안에 속하지 않으면
 * 외부 클릭으로 판단하고 모든 드롭다운을 닫습니다.
 *
 * 【[이벤트 3]의 stopPropagation()과의 관계】
 * 드롭다운 버튼 클릭 시 [이벤트 3]에서 stopPropagation()이 호출되므로,
 * 이 document 리스너는 그 클릭 이벤트를 전달받지 못합니다.
 * 덕분에 드롭다운 버튼 클릭 → 열기 → 즉시 닫히는 버그가 방지됩니다.
 */
document.addEventListener('click', function(event) {
  /* 클릭된 요소(또는 그 조상)가 'header .relative' 안에 있는지 확인 */
  if (!event.target.closest('header .relative')) {
    closeAllDesktopDropdowns(); // 드롭다운 영역 바깥 클릭 시 모두 닫기
  }
});

/**
 * [이벤트 5] ESC 키 누름 → 열린 모든 메뉴/드롭다운 닫기
 *
 * 【Why ESC 키 처리가 접근성 필수인가?】
 * WAI-ARIA Authoring Practices(접근성 표준 가이드)에 따르면,
 * 키보드만으로 페이지를 탐색하는 사용자(시각 장애인, 운동 장애인)가
 * ESC 키로 열린 메뉴를 닫을 수 있어야 합니다.
 * 닫힌 후에는 메뉴를 열었던 버튼으로 포커스를 돌려주어
 * 키보드 탐색 흐름이 끊기지 않도록 합니다.
 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    /* 모바일 메뉴가 열려있을 경우 닫기 */
    if (hamburgerBtn.getAttribute(ARIA_EXPANDED) === 'true') {
      setMobileMenuState(false);
      hamburgerBtn.focus(); // [A11y] 포커스를 메뉴 트리거(햄버거 버튼)로 복귀시켜 키보드 탐색 흐름 유지
    }
    closeAllDesktopDropdowns(); // 데스크톱 드롭다운도 함께 닫기
  }
});

/**
 * [이벤트 6] 화면 리사이즈 → 데스크톱 너비(1024px↑) 전환 시 모바일 메뉴 자동 초기화
 *
 * 【Why 리사이즈 감지가 필요한가?】
 * 사용자가 모바일 메뉴를 열어둔 채로 브라우저 창을 넓히면,
 * 데스크톱 레이아웃으로 전환되었는데도 모바일 메뉴가 화면에 남아있는
 * 레이아웃 오류가 발생합니다. 1024px 이상이 되는 순간 메뉴를 자동으로
 * 초기화하여 이 문제를 방어합니다.
 * 비유: 작은 방에 임시로 설치한 칸막이를, 큰 방으로 이사할 때 자동으로 치우는 것
 */
window.addEventListener('resize', function() {
  /* Tailwind의 lg: 브레이크포인트(1024px)와 동일한 기준값으로 판별 */
  if (window.innerWidth >= 1024) {
    setMobileMenuState(false); // 모바일 메뉴 및 아이콘 상태를 초기 상태로 완전 리셋
  }
});
