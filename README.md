# o2o-FE

[![Coverage Status](https://coveralls.io/repos/github/your-username/o2o-FE/badge.svg?branch=main)](https://coveralls.io/github/your-username/o2o-FE?branch=main)

## CI/CD 워크플로우

이 프로젝트는 GitHub Actions를 사용하여 CI/CD 파이프라인을 구현합니다.

### 주요 기능

- PR 생성, 수정, "Ready for Review" 상태 변경 시 자동 테스트 실행
- 테스트 커버리지 60% 미만 시 PR 병합 차단
- 자동 Vercel 프리뷰 배포
- 수동 Vercel 개발/프로덕션 환경 배포 버튼

### 필수 시크릿 설정

GitHub 리포지토리 설정에서 다음 시크릿을 추가해야 합니다:

```
VERCEL_TOKEN: Vercel API 토큰
VERCEL_TEAM_ID: Vercel 조직 ID
VERCEL_PROJECT_ID: Vercel 프로젝트 ID
```

### 수동 배포 방법

1. GitHub 리포지토리의 "Actions" 탭으로 이동
2. "Next.js CI/CD Pipeline" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. 배포 환경 선택 (dev 또는 prod)
5. "Run workflow" 버튼 클릭하여 배포 시작

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
