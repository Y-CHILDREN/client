<h1 align="center">
</h1>

<h1 align="center">
  <a href="https://jtrip.store/login" style="color:#3ACC97"> Trip J </a>
</h1>

<h3 align="center">여행을 J처럼!</h3>

<p align="center">

  <img alt="Stars" src="https://img.shields.io/github/stars/Y-CHILDREN/client?style=social">
  
  <a href="https://github.com/Y-CHILDREN/client">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Y-CHILDREN/client">
  </a>
  
  <a href="https://github.com/Y-CHILDREN">
    <img alt="made by Y-CHILDREN" src="https://img.shields.io/badge/made%20by-Y--CHILDREN-blueviolet">
  </a>
</p>

<h4 align="center"> 
	 Status: Work in Progress
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> •  
</p>

## About

**Trip J**는 여행 일정 계획을 시각적으로 쉽게 생성하고 관리할 수 있도록 돕는 웹 애플리케이션입니다.

---

## How it works

이 프로젝트는 다음과 같은 두 부분으로 나뉩니다:

1. Backend (**server** repository)
2. Frontend (현재 repository)

> 이 repository는 **프론트엔드** 전용이며, 백엔드가 실행 중일 때 정상 작동합니다.

### 1. repository clone

$ git clone https://github.com/Y-CHILDREN/client.git

### 2. 프로젝트 폴더 이동

$ cd client

### 3. 의존성 설치

$ pnpm install

### 4. 개발 서버 실행

$ pnpm run dev

기본적으로 http://localhost:5173 에서 앱이 실행됩니다.

## Tech Stack

### 🧠 Language & Type Safety

| 기술                                              | 설명                                   | 배지                                                                                                                                         |
| ------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [**TypeScript**](https://www.typescriptlang.org/) | 정적 타입을 지원하는 JavaScript 슈퍼셋 | [![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)](https://www.typescriptlang.org/) |

### 🧩 **Frontend Framework & Libraries**

| 기술                                                    | 설명                     | 배지                                                                                                                                                       |
| ------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**React**](https://reactjs.org/)                       | UI 라이브러리            | [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)](https://reactjs.org/)                                         |
| [**React Router Dom**](https://reactrouter.com/)        | 클라이언트 사이드 라우팅 | [![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=reactrouter&logoColor=white&style=flat)](https://reactrouter.com/)               |
| [**Axios**](https://axios-http.com/)                    | HTTP 클라이언트          | [![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white&style=flat)](https://axios-http.com/)                                      |
| [**Zustand**](https://github.com/pmndrs/zustand)        | 상태 관리                | [![Zustand](https://img.shields.io/badge/-Zustand-000000?logo=zustand&logoColor=white&style=flat)](https://github.com/pmndrs/zustand)                      |
| [**TanStack Query**](https://tanstack.com/query/latest) | 데이터 패칭 라이브러리   | [![TanStack](https://img.shields.io/badge/-TanStack%20Query-FF4154?logo=reactquery&logoColor=white&style=flat)](https://tanstack.com/query/latest)         |
| [**React Hook Form**](https://react-hook-form.com/)     | 폼 관리 라이브러리       | [![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white&style=flat)](https://react-hook-form.com/) |
| [**Zod**](https://github.com/colinhacks/zod)            | 타입 검증 & 스키마 정의  | [![Zod](https://img.shields.io/badge/-Zod-0B0B0B?style=flat&logoColor=white)](https://github.com/colinhacks/zod)                                           |

### 🎨 **Styling**

| 기술                                         | 설명                         | 배지                                                                                                                                         |
| -------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [**Tailwind CSS**](https://tailwindcss.com/) | 유틸리티 기반 CSS 프레임워크 | [![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat)](https://tailwindcss.com/) |
| [**MUI (Material UI)**](https://mui.com/)    | React 컴포넌트 프레임워크    | [![MUI](https://img.shields.io/badge/-MUI-007FFF?logo=mui&logoColor=white&style=flat)](https://mui.com/)                                     |

### 🧪 **Development & Testing**

| 기술                                       | 설명                        | 배지                                                                                                                                |
| ------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [**Storybook**](https://storybook.js.org/) | UI 컴포넌트 개발 도구       | [![Storybook](https://img.shields.io/badge/-Storybook-FF4785?logo=storybook&logoColor=white&style=flat)](https://storybook.js.org/) |
| [**Vitest**](https://vitest.dev/)          | Vite 기반 테스팅 프레임워크 | [![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white&style=flat)](https://vitest.dev/)                |

> See the file [package.json](https://github.com/Y-CHILDREN/client/blob/main/package.json)

---

### 🧱 **Architecture**

| 설계 방식              | 설명                                                                   |
| ---------------------- | ---------------------------------------------------------------------- |
| **Clean Architecture** | 클린 아키텍처 기반 설계로, 관심사의 분리와 테스트 용이성을 고려한 구조 |

<p align="center">
  <img src="/public/CleanArchitecture.jpg" width="600"/>
</p>
