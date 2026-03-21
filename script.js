/**
 * script.js — Blogr Landing Page 메뉴 인터랙션 처리
 *
 * 담당 기능:
 * 1. 모바일 햄버거 메뉴 열기/닫기
 * 2. 모바일 아코디언 (서브메뉴) 토글
 * 3. 데스크톱 드롭다운 메뉴 토글
 * 4. 외부 클릭 시 드롭다운/모바일메뉴 닫기
 * 5. ESC 키 누를 때 모두 닫기
 * 6. 화면 리사이즈 시 모바일 메뉴 초기화
 *
 * ⚡ 핵심 전략: Tailwind의 'hidden' 클래스를 classList.add/remove로
 *    뗐다붙였다(Toggle) 하는 방식으로 화면 표시를 제어합니다.
 *    비유: 전등 스위치처럼, hidden이 있으면 꺼짐(숨김), 없으면 켜짐(보임)
 */

/* ============================================
   1. DOM 요소 가져오기
   비유: 책의 목차에서 특정 페이지를 찾는 것처럼,
   HTML에서 필요한 요소들을 미리 변수에 저장해둡니다.
============================================ */
const hamburgerBtn = document.getElementById('hamburger-btn'); // 햄버거(≡) 버튼
const closeBtn     = document.getElementById('close-btn');     // 모바일 메뉴 닫기(X) 버튼
const mobileMenu   = document.getElementById('mobile-menu');   // 모바일 메뉴 카드 전체
const overlay      = document.getElementById('overlay');       // 어두운 배경 막


/* ============================================
   2. 유틸리티 함수들
   비유: 자주 쓰는 도구를 공구함에 미리 넣어두는 것처럼,
   반복 사용되는 동작을 함수로 만들어 재사용합니다.
============================================ */

/**
 * 모바일 메뉴를 열거나 닫는 함수
 * @param {boolean} isOpen - true이면 열기, false이면 닫기
 */
function setMobileMenuState(isOpen) {
  if (isOpen) {
    /* --- 메뉴 열기 --- */
    mobileMenu.classList.remove('hidden');  // hidden 제거 → 메뉴 카드 보임
    overlay.classList.remove('hidden');     // hidden 제거 → 어두운 배경막 보임
    overlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');    // 스크린 리더에게 "열렸음" 알리기
    hamburgerBtn.setAttribute('aria-label', '메뉴 닫기');
    document.body.style.overflow = 'hidden';               // 배경 페이지 스크롤 잠금
  } else {
    /* --- 메뉴 닫기 --- */
    mobileMenu.classList.add('hidden');    // hidden 추가 → 메뉴 카드 숨김
    overlay.classList.add('hidden');       // hidden 추가 → 배경막 숨김
    overlay.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');   // 스크린 리더에게 "닫혔음" 알리기
    hamburgerBtn.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = '';                     // 배경 스크롤 잠금 해제
    closeAllMobileSubmenus();                              // 열려있던 서브메뉴도 모두 닫기
  }
}

/**
 * 모바일 메뉴 안의 아코디언 서브메뉴를 모두 닫는 함수
 * 비유: 서랍을 모두 닫는 것처럼, 펼쳐진 항목들을 전부 접습니다.
 */
function closeAllMobileSubmenus() {
  /* #mobile-menu 안의 모든 아코디언 버튼을 찾아서 순서대로 닫기 */
  document.querySelectorAll('#mobile-menu nav button[aria-controls]').forEach(function(btn) {
    const submenu = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', 'false');
    if (submenu) submenu.classList.add('hidden'); // 각 서브메뉴에 hidden 추가 → 숨김
  });
}

/**
 * 데스크톱 드롭다운 메뉴를 모두 닫는 함수
 * 비유: 책상 위의 여러 서류함을 모두 닫는 것처럼
 */
function closeAllDesktopDropdowns() {
  document.querySelectorAll('header nav button[aria-controls^="dd-"]').forEach(function(btn) {
    btn.setAttribute('aria-expanded', 'false');
    const menu = document.getElementById(btn.getAttribute('aria-controls'));
    if (menu) menu.classList.add('hidden'); // 각 드롭다운에 hidden 추가 → 숨김
  });
}


/* ============================================
   3. 이벤트 리스너 연결
   비유: 각 버튼에 "담당 직원"을 붙여두는 것처럼,
   클릭/키보드 이벤트마다 어떻게 반응할지 정해줍니다.
============================================ */

/* [1] 햄버거(≡) 버튼 클릭: 현재 열려있으면 닫고, 닫혀있으면 열기 */
hamburgerBtn.addEventListener('click', function() {
  /* aria-expanded 속성값이 'true'이면 현재 열려있는 상태 */
  const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  setMobileMenuState(!isOpen); /* 현재 상태의 반대로 전환 */
});

/* [2] 닫기(X) 버튼 클릭: 무조건 닫기 */
closeBtn.addEventListener('click', function() {
  setMobileMenuState(false);
});

/* [3] 오버레이(어두운 막) 클릭: 메뉴 닫기
   비유: 모달 바깥 어두운 부분을 클릭하면 모달이 닫히는 것처럼 */
overlay.addEventListener('click', function() {
  setMobileMenuState(false);
});

/* [4] 모바일 아코디언 토글
   비유: 서랍을 열고 닫는 것처럼, 하나를 열면 나머지는 자동으로 닫혀요 */
document.querySelectorAll('#mobile-menu nav button[aria-controls]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const targetId = btn.getAttribute('aria-controls'); /* 이 버튼이 제어할 서브메뉴 ID */
    const submenu  = document.getElementById(targetId);
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';

    closeAllMobileSubmenus(); /* 먼저 모든 서브메뉴 닫기 */

    /* 방금 클릭한 서브메뉴가 닫혀있었으면 → 열기 */
    if (!isOpen && submenu) {
      btn.setAttribute('aria-expanded', 'true');
      submenu.classList.remove('hidden'); /* hidden 제거 → 이 서브메뉴만 펼치기 */
    }
    /* (이미 열려있었으면 closeAllMobileSubmenus()로 이미 닫혔으므로 그냥 둠) */
  });
});

/* [5] 데스크톱 드롭다운 토글
   비유: 선반에서 책을 꺼내는 것처럼, 클릭하면 메뉴가 펼쳐져요 */
document.querySelectorAll('header nav button[aria-controls^="dd-"]').forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    /* stopPropagation: 이벤트가 document까지 전파되지 않도록 차단
       이게 없으면 클릭 즉시 [6]번 로직이 실행되어 드롭다운이 바로 닫혀버림 */
    event.stopPropagation();

    const targetId = btn.getAttribute('aria-controls');
    const menu     = document.getElementById(targetId);
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';

    closeAllDesktopDropdowns(); /* 다른 드롭다운 모두 닫기 */

    /* 방금 클릭한 드롭다운이 닫혀있었으면 → 열기 */
    if (!isOpen && menu) {
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.remove('hidden'); /* hidden 제거 → 이 드롭다운만 열기 */
    }
  });
});

/* [6] 외부 클릭 감지 → 드롭다운 자동 닫기
   비유: 열려있는 창문 밖을 클릭하면 창이 자동으로 닫히는 것처럼요 */
document.addEventListener('click', function(event) {
  /* 클릭된 곳이 header 안의 드롭다운 영역(.relative)인지 확인 */
  if (!event.target.closest('header .relative')) {
    closeAllDesktopDropdowns(); /* 드롭다운 바깥을 클릭했으면 모두 닫기 */
  }
});

/* [7] ESC 키: 모든 메뉴 닫기 (접근성 필수 기능)
   키보드만 쓰는 사용자도 Escape 키로 메뉴를 닫을 수 있어야 해요 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    /* 모바일 메뉴가 열려있으면 닫기 */
    if (hamburgerBtn.getAttribute('aria-expanded') === 'true') {
      setMobileMenuState(false);
      hamburgerBtn.focus(); /* 접근성: 메뉴가 닫힌 후 포커스를 햄버거 버튼으로 돌려주기 */
    }
    /* 데스크톱 드롭다운도 닫기 */
    closeAllDesktopDropdowns();
  }
});

/* [8] 화면 리사이즈 감지: 데스크톱 너비(1024px↑)로 넓어지면 모바일 메뉴 자동 닫기
   비유: 작은 방에서 큰 방으로 이사할 때 임시 칸막이를 치우는 것처럼요 */
window.addEventListener('resize', function() {
  if (window.innerWidth >= 1024) {
    setMobileMenuState(false); /* 데스크톱 레이아웃으로 전환 시 모바일 메뉴 닫기 */
  }
});
