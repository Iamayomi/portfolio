---
name: nestjs-module-wiring
description: Wire a new NestJS domain module with use cases, infrastructure imports, and controller registration following feel-server conventions
---

# NestJS Module Wiring

Creates or updates NestJS modules following the feel-server clean architecture module pattern.

## Module Hierarchy

```
DomainModule
├── AuthModule
├── UserModule
├── UserProfileModule
├── AdminModule (imports use cases from UserModule)
└── ... (new domain modules)

PresentationModule
├── AuthController (+ OAuthController)
├── UserController
├── ProfileController
├── AdminController
└── ... (new controllers)

InfrastructureModule
├── DatabaseModule
├── CacheModule
├── SecurityModule (JWT, Session, Guards)
└── UtilsModule
```

## Procedure: New Domain Module

### 1. Create the domain module file

Path: `src/domain/<domain>/<domain>.module.ts`

```typescript
import { Module } from "@nestjs/common";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import {
  <UseCase1>,
  <UseCase2>,
} from "./use-cases";

@Module({
  imports: [InfrastructureModule],
  providers: [
    <UseCase1>,
    <UseCase2>,
  ],
  exports: [
    <UseCase1>,
    <UseCase2>,
  ],
})
export class <PascalName>Module {}
```

### 2. Create the use cases barrel

Path: `src/domain/<domain>/use-cases/index.ts`

```typescript
export * from "./<use-case-1>.use-case";
export * from "./<use-case-2>.use-case";
```

### 3. Create the domain barrel

Path: `src/domain/<domain>/index.ts`

```typescript
export * from "./use-cases";
```

### 4. Register in DomainModule

Edit `src/domain/domain.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { AdminModule } from "./admin/admin.module";
import { <New>Module } from "./<domain>/<domain>.module";

@Module({
  imports: [
    InfrastructureModule,
    AuthModule,
    UserModule,
    UserProfileModule,
    AdminModule,
    <New>Module,   // <-- add here
  ],
  exports: [
    AuthModule,
    UserModule,
    UserProfileModule,
    AdminModule,
    <New>Module,   // <-- and here
  ],
})
export class DomainModule {}
```

### 5. Create the controller

Path: `src/presentation/<domain>/controllers/<domain>.controller.ts`

Follow the controller endpoint creation pattern from the `nestjs-use-case` skill.

### 6. Register in PresentationModule

Edit `src/presentation/presentation.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { DomainModule } from "@/domain/domain.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { AuthController } from "./auth/controllers/auth.controller";
import { <New>Controller } from "./<domain>/controllers/<domain>.controller";

@Module({
  imports: [DomainModule, InfrastructureModule],
  controllers: [
    AuthController,
    <New>Controller,  // <-- add here
  ],
})
export class PresentationModule {}
```

### 7. Create the DTOs barrel

Path: `src/presentation/<domain>/dtos/index.ts`

```typescript
export * from "./<dto-1>.dto";
export * from "./<dto-2>.dto";
```

### 8. Create the presentation barrel

Path: `src/presentation/<domain>/index.ts`

```typescript
export * from "./dtos";
```

## Rules (from MEMORY.md)

- **No services layer** — controllers call use cases directly
- **InfrastructureModule** is imported by all domain modules (provides repos, security, cache)
- **AdminModule** imports use cases from `@/domain/user/use-cases` (not from admin folder)
- **Admin use cases live in user folder** — Admin folder only has AdminModule
- **`database/index.ts`** must not re-export non-existent modules
- **Infrastructure repos must NOT import domain entities** — breaks circular dependency
- **`useExisting` provider fails for imported module classes** — use direct class injection
- **SWC barrel re-export can cause duplicate identifier declarations** — break cycles by removing unnecessary re-exports

## Validation

After wiring:
1. Run `npx tsc --noEmit 2>&1 | head -20` for TypeScript errors
2. Run `npx nest build` to verify compilation
3. Run `node dist/main.js` to verify app boots (check for "Nest can't resolve dependencies" errors)
