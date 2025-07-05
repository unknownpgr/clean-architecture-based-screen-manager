# Clean Architecture Learning Project

> **학습 목적**: 클린 아키텍처를 통한 복잡한 시스템 구현 시연

## 📋 프로젝트 개요

이 프로젝트는 **클린 아키텍처(Clean Architecture)**의 개념과 구현을 학습하기 위한 시연용 프로젝트입니다. 실제 프로덕션 환경이 아닌, 복잡한 비즈니스 로직을 클린 아키텍처 패턴으로 구조화하는 방법을 보여줍니다.

### 🎯 학습 목표

- **클린 아키텍처의 계층 분리** 이해
- **의존성 주입(DI)** 패턴 실습
- **Use Case 중심 설계** 경험
- **테스트 가능한 코드 구조** 구현
- **확장 가능한 시스템 설계** 연습

## 🏗️ 아키텍처 구조

```
src/
├── domain/                    # 도메인 계층 (핵심 비즈니스 로직)
│   ├── entities/             # 엔티티 (비즈니스 객체)
│   ├── repositories/         # 리포지토리 인터페이스
│   └── usecases/            # 유스케이스 (비즈니스 규칙)
├── infrastructure/           # 인프라스트럭처 계층 (외부 의존성)
│   ├── controllers/         # 컨트롤러 (HTTP 요청 처리)
│   ├── repositories/        # 리포지토리 구현체
│   ├── routes/             # 라우터 설정
│   ├── webserver/          # 웹서버 설정
│   └── di/                 # 의존성 주입 컨테이너
└── main.ts                 # 애플리케이션 진입점
```

### 📊 계층별 역할

| 계층               | 역할               | 예시                                       |
| ------------------ | ------------------ | ------------------------------------------ |
| **Domain**         | 핵심 비즈니스 로직 | `GetDataUseCase`, `DataItem`               |
| **Infrastructure** | 외부 시스템 연동   | `InMemoryDataRepository`, `DataController` |
| **DI Container**   | 의존성 관리        | `Container` 클래스                         |

## 🚀 시작하기

### 필수 요구사항

- Node.js 16+
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

## 📚 주요 학습 포인트

### 1. 의존성 역전 원칙 (Dependency Inversion Principle)

```typescript
// Domain Layer - 인터페이스 정의
export interface DataRepository {
  findById(id: string): DataItem | undefined;
}

// Infrastructure Layer - 구현체
export class InMemoryDataRepository implements DataRepository {
  findById(id: string): DataItem | undefined {
    // 구현...
  }
}
```

### 2. Use Case 중심 설계

```typescript
// 비즈니스 로직을 Use Case로 캡슐화
export class GetDataUseCase {
  constructor(private dataRepository: DataRepository) {}

  execute(id: string): DataItem | { data: string } {
    const item = this.dataRepository.findById(id);
    // 비즈니스 규칙 적용...
  }
}
```

### 3. 의존성 주입 컨테이너

```typescript
// 모든 의존성을 중앙에서 관리
export class Container {
  private initializeDependencies(): void {
    this.dataRepository = new InMemoryDataRepository();
    this.getDataUseCase = new GetDataUseCase(this.dataRepository);
    this.dataController = new DataController(this.getDataUseCase);
  }
}
```

## 🔧 API 엔드포인트

### 데이터 관련

- `GET /data/:id` - 특정 데이터 조회
- `GET /data?screenId=xxx&name=xxx` - 스크린 데이터 조회
- `GET /datasources` - 데이터 소스 목록 조회

### 연결 관리

- `GET /connections` - 현재 연결 상태 조회
- `GET /connect?screenId=xxx&dataId=xxx&name=xxx` - 스크린 연결

## 🎨 프론트엔드 기능

### 메인 페이지 (`/`)

- 데이터 소스 목록 표시
- 새 스크린 생성
- 실시간 데이터 업데이트

### 연결 관리 페이지 (`/connections.html`)

- 스크린과 데이터 소스 연결 관리
- 연결 상태 모니터링
- 통계 정보 표시

### 데이터 표시 페이지 (`/data.html`)

- 개별 데이터 소스 또는 스크린 데이터 표시
- 실시간 업데이트
- 연결 상태 표시

## 🧪 학습용 시나리오

### 시나리오 1: 새로운 데이터 소스 추가

1. `InMemoryDataSourceRepository`에 새 데이터 소스 추가
2. 프론트엔드 자동 인식 확인
3. 새로운 데이터 소스 연결 테스트

### 시나리오 2: 새로운 Use Case 추가

1. Domain Layer에 새로운 Use Case 정의
2. Infrastructure Layer에 컨트롤러 추가
3. DI 컨테이너에 의존성 등록
4. 라우터에 엔드포인트 추가

### 시나리오 3: 데이터베이스 연동

1. `DataRepository` 인터페이스는 그대로 유지
2. `PostgreSQLDataRepository` 구현체 추가
3. DI 컨테이너에서 구현체만 교체

## 🔍 코드 구조 분석

### 클린 아키텍처의 장점

1. **테스트 용이성**: 각 계층을 독립적으로 테스트 가능
2. **유지보수성**: 비즈니스 로직과 인프라 로직 분리
3. **확장성**: 새로운 기능 추가 시 기존 코드 영향 최소화
4. **가독성**: 각 계층의 책임이 명확히 분리됨

### 실제 프로덕션과의 차이점

| 학습용 프로젝트      | 실제 프로덕션        |
| -------------------- | -------------------- |
| In-Memory 저장소     | PostgreSQL, Redis 등 |
| 단순한 비즈니스 로직 | 복잡한 도메인 규칙   |
| 기본적인 DI 컨테이너 | NestJS, Spring 등    |
| 수동 라우터 설정     | 자동 라우터 생성     |

## 📖 추가 학습 자료

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## 🤝 기여하기

이 프로젝트는 학습 목적으로 설계되었습니다. 다음과 같은 방식으로 학습에 활용하세요:

1. **코드 분석**: 각 계층의 역할과 책임 이해
2. **기능 추가**: 새로운 Use Case나 Repository 구현
3. **아키텍처 변경**: 다른 패턴 적용 실험
4. **테스트 작성**: 각 계층별 단위 테스트 작성

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

---

**학습 목적**: 클린 아키텍처를 통한 복잡한 시스템 설계와 구현 방법을 이해하고 실습하기 위한 프로젝트입니다.
