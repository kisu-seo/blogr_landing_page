# Blogr — Tailwind CSS Style Guide

> 💡 이 가이드는 순수 CSS 작성 방식을 완전히 폐기하고,
> 현재 프로젝트에 설정된 **Tailwind CSS Config** 기반으로 전면 재작성되었습니다.
> 모든 클래스는 코드에 바로 복사해서 쓸 수 있는 실전용 예시입니다.

---

## 반응형 Breakpoint

| 접두사 | 최소 너비 | 대상 기기 |
|--------|-----------|-----------|
| (없음) | 0px~      | 모바일 (기본값) |
| `md:`  | 768px~    | 태블릿 |
| `lg:`  | 1024px~   | 데스크톱 |

> 💡 **Mobile-First 원칙**: 기본 클래스는 항상 모바일에 맞추고,
> 더 넓은 화면은 `md:`, `lg:` 접두사로 덮어씁니다.

---

## 색상 시스템 (Colors)

> 🎨 모든 색상은 `tailwind.config`의 `theme.extend.colors`에 등록되어 있습니다.

### Red (빨간색 계열)

| 토큰 이름 | HEX | 사용 클래스 예시 |
|-----------|-----|-----------------|
| Red 500 (주 강조색) | `#FF505C` | `text-brand-red`, `bg-brand-red`, `border-brand-red` |
| Red 400 (호버 상태) | `#FF7B86` | `hover:bg-brand-red-lt`, `text-brand-red-lt` |
| Red 50 (연한 배경)  | `#F9F6F6` | `bg-brand-red-pale` |

### Blue (파란색 계열)

| 토큰 이름 | HEX | 사용 클래스 예시 |
|-----------|-----|-----------------|
| Blue 900 | `#1F3E5A` | `text-brand-blue`, `bg-brand-blue` |

### Gray (회색 계열)

| 토큰 이름 | HEX | 사용 클래스 예시 |
|-----------|-----|-----------------|
| Gray 950 (푸터 배경) | `#24242C` | `bg-gray-950` |
| Gray 600 (본문 텍스트) | `#4C5862` | `text-gray-brand` |
| Gray 550 (보조 텍스트) | `#878D92` | `text-gray-mid` |
| Gray 100 (구분선, 연한 배경) | `#E7E7E7` | `bg-gray-soft`, `border-gray-soft` |

### Purple (보라색 계열)

| 토큰 이름 | HEX | 사용 클래스 예시 |
|-----------|-----|-----------------|
| Purple 950 (그라디언트 시작) | `#2D2E40` | `bg-purple-950` |
| Purple 900 (그라디언트 끝) | `#3E4062` | `bg-purple-900` |
| Purple 800 | `#52526F` | `bg-purple-800` |

### Gradient (그라디언트)

> ⚠️ Tailwind CDN에서는 그라디언트를 `style=""` 인라인 속성으로 적용합니다.

**Gradient 1 — 인프라 섹션 배경 (보라 계열)**
```html
<!-- CSS: linear-gradient(135deg, #2D2E40 0%, #3F4164 100%) -->
<!-- .infra-bg 커스텀 클래스로 처리 (style.css 내부 정의) -->
<section class="infra-bg ...">
```

**Gradient 2 — 히어로·CTA·Sign Up 버튼 (오렌지→레드)**
```html
<!-- CSS: linear-gradient(135deg, #FF8F71 0%, #FF3E55 100%) -->
<!-- 모바일 Sign Up 버튼 적용 예시 -->
<a href="#" style="background: linear-gradient(135deg, #FF8F71 0%, #FF3E55 100%);">Sign Up</a>
```

---

## 폰트 시스템 (Typography)

> 🔤 `tailwind.config`의 `theme.extend.fontFamily`에 등록되어 있습니다.

| 폰트 | 클래스 | 굵기 | 용도 |
|------|--------|------|------|
| Overpass | `font-overpass` | `font-light`(300), `font-semibold`(600) | 제목, 본문 |
| Ubuntu | `font-ubuntu` | `font-normal`(400), `font-bold`(700) | 내비게이션, 버튼 |

---

## 텍스트 프리셋 (Text Presets)

> 💡 **비유**: 프리셋은 Word의 "제목 1", "본문" 스타일처럼,
> 반복 사용하는 글자 스타일을 미리 조합해 둔 것입니다.
> 아래 클래스 조합을 그대로 복사해서 사용하세요.

### Preset 1 — 메인 히어로 제목

```html
<h1 class="font-overpass font-semibold text-[64px] leading-none tracking-[-2px]">
  제목 텍스트
</h1>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Overpass SemiBold | `font-overpass font-semibold` |
| Size | 64px | `text-[64px]` |
| Line Height | 100% | `leading-none` |
| Letter Spacing | -2px | `tracking-[-2px]` |

---

### Preset 2 — 섹션 제목

```html
<h2 class="font-overpass font-semibold text-[40px] leading-[1.25] tracking-[-1.2px]">
  섹션 제목
</h2>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Overpass SemiBold | `font-overpass font-semibold` |
| Size | 40px | `text-[40px]` |
| Line Height | 125% | `leading-[1.25]` |
| Letter Spacing | -1.2px | `tracking-[-1.2px]` |

---

### Preset 3 — 소제목

```html
<h3 class="font-overpass font-semibold text-[28px] leading-tight tracking-normal">
  소제목
</h3>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Overpass SemiBold | `font-overpass font-semibold` |
| Size | 28px | `text-[28px]` |
| Line Height | 100% | `leading-tight` |
| Letter Spacing | 0px | `tracking-normal` |

---

### Preset 4 — 서브텍스트 (부연 설명)

```html
<p class="font-overpass font-light text-xl leading-[1.25]">
  부연 설명 텍스트
</p>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Overpass Light | `font-overpass font-light` |
| Size | 20px | `text-xl` |
| Line Height | 125% | `leading-[1.25]` |
| Letter Spacing | 0px | `tracking-normal` |

---

### Preset 5 — 본문 텍스트 (Body Copy)

```html
<p class="font-overpass font-light text-base leading-[1.75] tracking-[0.5px]">
  본문 텍스트
</p>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Overpass Light | `font-overpass font-light` |
| Size | 16px | `text-base` |
| Line Height | 175% | `leading-[1.75]` |
| Letter Spacing | 0.5px | `tracking-[0.5px]` |

---

### Preset 6 (Bold) — UI 강조 텍스트 (버튼, 내비 제목)

```html
<span class="font-ubuntu font-bold text-base leading-[1.15]">
  UI 텍스트
</span>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Ubuntu Bold | `font-ubuntu font-bold` |
| Size | 16px | `text-base` |
| Line Height | 115% | `leading-[1.15]` |

---

### Preset 6 (Regular) — UI 일반 텍스트 (드롭다운 링크)

```html
<a class="font-ubuntu font-normal text-base leading-[2]">
  드롭다운 링크
</a>
```

| 속성 | 값 | Tailwind 클래스 |
|------|-----|----------------|
| Font | Ubuntu Regular | `font-ubuntu font-normal` |
| Size | 16px | `text-base` |
| Line Height | 200% | `leading-[2]` |

---

## 스페이싱 시스템 (Spacing)

> 📐 `tailwind.config`의 `theme.extend.spacing`에 등록되어 있습니다.
> **8px 단위 시스템**: 모든 간격은 8px의 배수입니다.

| 토큰 | px 값 | 사용 예시 |
|------|-------|-----------|
| `sp-100` | 8px  | `p-sp-100`, `gap-sp-100`, `mb-sp-100` |
| `sp-200` | 16px | `px-sp-200`, `py-sp-200`, `gap-sp-200` |
| `sp-300` | 24px | `p-sp-300`, `my-sp-300`, `gap-sp-300` |
| `sp-400` | 32px | `mb-sp-400`, `gap-sp-400`, `pt-sp-400` |
| `sp-500` | 40px | `py-sp-500`, `gap-sp-500` |
| `sp-600` | 48px | `gap-sp-600`, `py-sp-600` |
| `sp-700` | 56px | `pt-sp-700`, `mb-sp-700` |
| `sp-800` | 64px | `gap-sp-800`, `py-sp-800` |
| `sp-900` | 72px | `py-sp-900` (푸터 상하 패딩) |
| `sp-1000` | 80px | `px-sp-1000` (데스크톱 좌우 패딩) |

---

## 기타 디자인 토큰 (Other Tokens)

### Border Radius

| 토큰 | 값 | 사용 예시 |
|------|----|-----------|
| `rounded-100px` | 100px | `rounded-bl-100px`, `rounded-tr-100px` (섹션 모서리) |
| `rounded-full` | 9999px | `rounded-full` (버튼, 알약형) |

### Box Shadow

| 토큰 | 설명 | 사용 예시 |
|------|------|-----------|
| `shadow-dropdown` | 드롭다운 그림자 | `shadow-dropdown` (모바일 메뉴 카드, 드롭다운 목록) |

### Max Width

| 토큰 | 값 | 사용 예시 |
|------|----|-----------|
| `max-w-container` | 1110px | `max-w-container mx-auto` (컨텐츠 최대 너비) |

---

## 컴포넌트 스니펫 (Component Snippets)

### 주 버튼 (Primary Button)
```html
<!-- 흰 배경 + 빨간 글씨, 호버 시 투명 배경 -->
<a href="#"
  class="flex items-center justify-center w-[137px] h-[48px] rounded-full border-2 border-white
         font-ubuntu font-bold text-base text-brand-red bg-white
         hover:bg-transparent hover:text-white transition-all duration-300">
  Start for Free
</a>
```

### 보조 버튼 (Secondary Button)
```html
<!-- 투명 배경, 호버 시 흰 배경 + 빨간 글씨 -->
<a href="#"
  class="flex items-center justify-center w-[137px] h-[48px] rounded-full border-2 border-white
         font-ubuntu font-bold text-base text-white bg-transparent
         hover:bg-white hover:text-brand-red transition-all duration-300">
  Learn More
</a>
```

### Sign Up 버튼 (Header — Desktop)
```html
<!-- 흰 배경 + 빨간 글씨, 호버 시 연한 빨강 배경 -->
<a href="#"
  class="rounded-full px-9 py-3
         font-ubuntu font-bold text-base text-brand-red bg-white
         hover:bg-brand-red-lt hover:text-white transition-all duration-300">
  Sign Up
</a>
```

### 드롭다운 버튼 (Desktop Nav)
```html
<button
  class="flex items-center gap-2 py-1
         font-ubuntu font-normal text-base text-white/85
         hover:text-white hover:underline transition-all duration-300"
  aria-expanded="false" aria-haspopup="true">
  Product
  <img src="images/icon-arrow-light.svg" alt="" aria-hidden="true" class="arrow-rotate w-[10px]" />
</button>
```

### 푸터 링크 그룹
```html
<nav aria-label="Product 링크" class="lg:w-[255px]">
  <h3 class="mb-sp-400 font-ubuntu font-bold text-base text-white">Product</h3>
  <ul class="flex flex-col gap-sp-100">
    <li>
      <a href="#"
        class="font-ubuntu font-normal text-base leading-[2] text-white/75
               hover:text-white hover:underline transition-all duration-300">Overview</a>
    </li>
  </ul>
</nav>
```
