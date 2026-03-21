# Front-end Style Guide

## Layout

The designs were created to the following widths:

- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px

> 💡 These are just the design sizes. Ensure content is responsive and meets WCAG requirements by testing the full range of screen sizes from 320px to large screens.

## Colors

> 🎨 아래 색상 값은 피그마 디자인 파일(노드 22:129)에서 직접 추출한 정확한 값입니다.

### Red (빨간색 계열)

| 이름 | HEX | HSL | RGB |
|------|-----|-----|-----|
| Red 500 | `#FF505C` | `hsl(356, 100%, 66%)` | 255, 80, 92 |
| Red 400 | `#FF7B86` | `hsl(355, 100%, 74%)` | 255, 123, 134 |
| Red 50  | `#F9F6F6` | `hsl(0, 20%, 97%)`   | 249, 246, 246 |

### Blue (파란색 계열)

| 이름 | HEX | HSL | RGB |
|------|-----|-----|-----|
| Blue 900 | `#1F3E5A` | `hsl(208, 49%, 24%)` | 31, 62, 90 |

### Gray (회색 계열)

| 이름 | HEX | HSL | RGB |
|------|-----|-----|-----|
| Gray 950 | `#24242C` | `hsl(240, 10%, 16%)` | 36, 36, 44 |
| Gray 600 | `#4C5862` | `hsl(207, 13%, 34%)` | 76, 88, 98 |
| Gray 550 | `#878D92` | `hsl(207, 5%, 55%)`  | 135, 141, 146 |
| Gray 100 | `#E7E7E7` | `hsl(0, 0%, 91%)`    | 231, 231, 231 |

### Purple (보라색 계열)

| 이름 | HEX | HSL | RGB |
|------|-----|-----|-----|
| Purple 950 | `#2D2E40` | `hsl(237, 17%, 21%)` | 45, 46, 64 |
| Purple 900 | `#3E4062` | `hsl(237, 23%, 31%)` | 62, 64, 98 |
| Purple 800 | `#52526F` | `hsl(240, 15%, 38%)` | 82, 82, 111 |

### White / Black

| 이름 | HEX | HSL |
|------|-----|-----|
| White | `#FFFFFF` | `hsl(0, 100%, 100%)` |
| Black | `#000000` | `hsl(0, 0%, 0%)` |

### Gradient (그라디언트)

**Gradient 1 — Body 배경용:**

- 시작: `#2D2E40` → `hsl(237, 17%, 21%)`
- 끝:   `#3F4164` → `hsl(237, 23%, 32%)`
- CSS: `linear-gradient(135deg, #2D2E40 0%, #3F4164 100%)`

**Gradient 2 — Intro / CTA / 모바일 내비게이션용:**

- 시작: `#FF8F71` → `hsl(13, 100%, 72%)`
- 끝:   `#FF3E55` → `hsl(353, 100%, 62%)`
- CSS: `linear-gradient(135deg, #FF8F71 0%, #FF3E55 100%)`

## Typography

> 🔤 아래 타이포그래피 설정은 피그마 디자인 파일(노드 14069:256)에서 직접 추출한 정확한 값입니다.

### Fonts (사용 폰트)

| 폰트 패밀리 | Weights (굵기) | 용도 |
|------------|----------------|------|
| [Overpass](https://fonts.google.com/specimen/Overpass) | 300 (Light), 600 (SemiBold) | 제목, 본문 텍스트 |
| [Ubuntu](https://fonts.google.com/specimen/Ubuntu) | 400 (Regular), 700 (Bold) | 내비게이션, UI 요소 |

---

### Text Presets (텍스트 프리셋)

> 💡 **비유로 이해하기**: 텍스트 프리셋은 마치 Word의 "제목 1", "제목 2", "본문" 스타일처럼, 디자인에서 반복 사용하는 글자 스타일을 미리 저장해 둔 것이에요.

#### Preset 1 — 메인 히어로 제목 (가장 큰 제목)

| 속성 | 값 |
|------|----|
| **Font Family** | Overpass |
| **Font Weight** | 600 (SemiBold) |
| **Font Size** | 64px |
| **Line Height** | 100% (1em) |
| **Letter Spacing** | -2px (-3.125%) |

```css
/* CSS 적용 예시 */
font-family: 'Overpass', sans-serif;
font-weight: 600;
font-size: 64px;
line-height: 1;
letter-spacing: -2px;
```

---

#### Preset 2 — 섹션 제목 (중간 제목)

| 속성 | 값 |
|------|----|
| **Font Family** | Overpass |
| **Font Weight** | 600 (SemiBold) |
| **Font Size** | 40px |
| **Line Height** | 125% (1.25em) |
| **Letter Spacing** | -1.2px (-3%) |

```css
font-family: 'Overpass', sans-serif;
font-weight: 600;
font-size: 40px;
line-height: 1.25;
letter-spacing: -1.2px;
```

---

#### Preset 3 — 소제목 (작은 제목)

| 속성 | 값 |
|------|----|
| **Font Family** | Overpass |
| **Font Weight** | 600 (SemiBold) |
| **Font Size** | 28px |
| **Line Height** | 100% (1em) |
| **Letter Spacing** | 0px |

```css
font-family: 'Overpass', sans-serif;
font-weight: 600;
font-size: 28px;
line-height: 1;
letter-spacing: 0;
```

---

#### Preset 4 — 서브텍스트 (부연 설명)

| 속성 | 값 |
|------|----|
| **Font Family** | Overpass |
| **Font Weight** | 300 (Light) |
| **Font Size** | 20px |
| **Line Height** | 125% (1.25em) |
| **Letter Spacing** | 0px |

```css
font-family: 'Overpass', sans-serif;
font-weight: 300;
font-size: 20px;
line-height: 1.25;
letter-spacing: 0;
```

---

#### Preset 5 — 본문 텍스트 (Body Copy)

| 속성 | 값 |
|------|----|
| **Font Family** | Overpass |
| **Font Weight** | 300 (Light) |
| **Font Size** | 16px |
| **Line Height** | 175% (1.75em) |
| **Letter Spacing** | 0.6px |

```css
font-family: 'Overpass', sans-serif;
font-weight: 300;
font-size: 16px;
line-height: 1.75;
letter-spacing: 0.6px;
```

---

#### Preset 6 (Bold) — UI 요소 강조 텍스트 (내비게이션 등)

| 속성 | 값 |
|------|----|
| **Font Family** | Ubuntu |
| **Font Weight** | 700 (Bold) |
| **Font Size** | 16px |
| **Line Height** | 115% (1.15em) |
| **Letter Spacing** | 0px |

```css
font-family: 'Ubuntu', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 1.15;
letter-spacing: 0;
```

---

#### Preset 6 (Regular) — UI 요소 일반 텍스트 (드롭다운 링크 등)

| 속성 | 값 |
|------|----|
| **Font Family** | Ubuntu |
| **Font Weight** | 400 (Regular) |
| **Font Size** | 16px |
| **Line Height** | 200% (2em) |
| **Letter Spacing** | 0px |

```css
font-family: 'Ubuntu', sans-serif;
font-weight: 400;
font-size: 16px;
line-height: 2;
letter-spacing: 0;
```

---

## Spacing (간격 시스템)

> 📐 아래 스페이싱 값은 피그마 디자인 파일(노드 2056:2002)에서 직접 추출한 정확한 값입니다.

> 💡 **비유로 이해하기**: 스페이싱 시스템은 마치 "눈금자"와 같아요. 8px을 기본 단위(spacing-100)로 삼고, 숫자가 100씩 커질수록 8px씩 더 넓어지는 규칙적인 간격 체계예요. 이 규칙을 지키면 전체 디자인이 일관되고 정돈되어 보여요.

### Spacing Scale (스케일 표)

| 토큰 이름 | 픽셀 값 | 용도 예시 |
|-----------|---------|-----------|
| `spacing-0`    | **0px**  | 간격 없음 (초기화) |
| `spacing-100`  | **8px**  | 아이콘-텍스트 사이, 작은 내부 패딩 |
| `spacing-200`  | **16px** | 버튼 내부 패딩, 태그 간격 |
| `spacing-300`  | **24px** | 카드 내부 패딩, 요소 간 기본 간격 |
| `spacing-400`  | **32px** | 섹션 내 컴포넌트 간격, 그리드 gap |
| `spacing-500`  | **40px** | 내비게이션 높이, 중간 섹션 간격 |
| `spacing-600`  | **48px** | 카드 간 간격, 컨테이너 패딩 |
| `spacing-700`  | **56px** | 헤더 패딩, 섹션 상하 여백 |
| `spacing-800`  | **64px** | 히어로 섹션 패딩, 대형 여백 |
| `spacing-900`  | **72px** | 섹션 간 대형 여백, 페이지 상단 패딩 |
| `spacing-1000` | **80px** | 컨테이너 최대 좌우 패딩 |

### CSS Variables (CSS 변수 선언 예시)

```css
/* :root 안에 선언하여 프로젝트 전체에서 사용 가능 */
:root {
  --spacing-0:    0px;
  --spacing-100:  8px;
  --spacing-200:  16px;
  --spacing-300:  24px;
  --spacing-400:  32px;
  --spacing-500:  40px;
  --spacing-600:  48px;
  --spacing-700:  56px;
  --spacing-800:  64px;
  --spacing-900:  72px;
  --spacing-1000: 80px;
}
```

### 사용 규칙

- **기본 단위**: `8px` (spacing-100) — 모든 간격은 이 값의 배수
- **컴포넌트 내부**: `spacing-200` ~ `spacing-400` (16px ~ 32px)
- **섹션 간 여백**: `spacing-700` ~ `spacing-1000` (56px ~ 80px)
- **페이지 좌우 패딩 (데스크톱)**: `spacing-1000` (80px)
- **페이지 상하 패딩**: `spacing-900` (72px)
