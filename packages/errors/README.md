# 🚨 도메인별 에러 처리 시스템

NestJS 스타일의 구조화된 에러 처리 시스템으로 개선되었습니다.

## 🎯 주요 개선사항

### 기존 방식

```typescript
// ❌ 타입 안전성 없음, 에러 코드 없음
throw new Error("주문을 찾을 수 없습니다.");
```

### 새로운 방식  

```typescript
// ✅ 타입 안전, 에러 코드, HTTP 상태 코드 자동 설정
throw OrderError.notFound(); // 404, "O001", "주문을 찾을 수 없습니다."
```

## 🔥 사용법

```typescript
import { OrderError, PaymentError, StoreError } from '@packages/errors';

// 도메인별 에러 생성
throw OrderError.notFound();
throw PaymentError.failed(); 
throw StoreError.closed();

// 에러 핸들링
try {
  // 비즈니스 로직
} catch (error) {
  if (error instanceof OrderError) {
    console.log(error.code);        // "O001"
    console.log(error.statusCode);  // 404
    console.log(error.message);     // "주문을 찾을 수 없습니다."
  }
}
```

## 📋 도메인별 에러 클래스

- **CommonError**: 공통 에러 (유효성 검증, 서버 오류)
- **OrderError**: 주문 관련 에러  
- **PaymentError**: 결제 관련 에러
- **StoreError**: 매장 관련 에러
- **CustomerError**: 고객 관련 에러

각 클래스는 정적 메서드로 특정 에러를 생성할 수 있습니다.
