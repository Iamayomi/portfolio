---
name: nestjs-use-case
description: Create a new NestJS use case following the feel-server clean architecture pattern with execute(dto), ResponseBuilder, UseCaseLogger, and error handling
---

# NestJS Use Case Creation

Creates a new use case file following the feel-server clean architecture conventions.

## Prerequisites

Read an existing use case first to confirm the current pattern:
- `src/domain/<domain>/use-cases/*.use-case.ts` — reference examples
- `src/common/index.ts` — available imports from `@/common`

## Procedure

### 1. Create the use case file

Path: `src/domain/<domain>/use-cases/<name>.use-case.ts`

Template:

```typescript
import { Injectable } from "@nestjs/common";
import {
  createInternalError,
  createNotFoundError,       // only if looking up entities
  RequestContextUtil,
  ResponseBuilder,
  UseCaseLogger,
} from "@/common";
import { SomeRepository } from "@/infrastructure";
import { SomeDto } from "@/presentation/<domain>";

@Injectable()
export class <PascalName>UseCase {
  private readonly logger = new UseCaseLogger(<PascalName>UseCase.name);

  constructor(
    private readonly someRepo: SomeRepository,
    // other dependencies...
  ) {}

  async execute(dto: SomeDto) {
    const correlationId = RequestContextUtil.getCorrelationId();

    try {
      // Business logic here

      return ResponseBuilder.success<<ResponseInterface>>({
        // response data...
      });
    } catch (error) {
      if (error.message?.includes("not found")) {
        throw createNotFoundError("Resource not found", correlationId);
      }
      this.logger.error("Operation failed", correlationId, error);
      throw createInternalError("Operation failed", correlationId);
    }
  }
}
```

### 2. Define the response interface

Add to the domain's interface file: `src/domain/<domain>/interfaces/<domain>.interface.ts`

```typescript
export interface <PascalName>Response {
  // data-only fields — no statusCode/message/wrapper
  // Use camelCase to match Drizzle ORM column names
}
```

### 3. Create the DTO (if not already exists)

Path: `src/presentation/<domain>/dtos/<name>.dto.ts`

```typescript
import { IsString, IsEnum, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SomeEnum } from "@/common";

export class <PascalName>Dto {
  @ApiProperty({ description: "..." })
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z0-9_.]+$/)
  field_name: string;

  // userId is set by the controller, NOT on the DTO
}
```

### 4. Wire the use case into the module

Edit `src/domain/<domain>/<domain>.module.ts`:
- Import the new use case from `./use-cases`
- Add to `providers` array
- Add to `exports` array

### 5. Add the controller endpoint

Edit `src/presentation/<domain>/controllers/<domain>.controller.ts`:
- Import the new use case
- Import the DTO
- Add endpoint method with decorators:

```typescript
@Post("endpoint-name")
@HttpCode(HttpStatus.OK)
@UseGuards(BearerTokenGuard)
@UseInterceptors(HttpCorrelationInterceptor)
@ApiOperation({
  summary: "...",
  description: "Full flow description...",
})
@ApiResponse({
  status: 200,
  description: "...",
  schema: { example: { statusCode: 200, message: "...", data: {} } },
})
async endpointName(
  @Body() dto: <DtoName>,
  @Req() request: FastifyRequest,
) {
  const user = request.user;
  dto.user_id = user.userId;  // set userId on DTO
  return this.<useCase>.execute(dto);
}
```

### 6. Export from barrel files

- `src/domain/<domain>/use-cases/index.ts` — add `export * from "./<name>.use-case"`
- `src/presentation/<domain>/dtos/index.ts` — add export if new DTO
- `src/presentation/<domain>/index.ts` — add export if new DTO
- `src/common/index.ts` — only if new shared utilities added

### 7. Update domain module barrel

`src/domain/<domain>/index.ts` — add `export * from "./use-cases"` if not already present

## Rules (from MEMORY.md)

- Use cases accept single DTO parameter: `execute(dto)` not `execute(userId, dto)`
- **DTOs contain userId** — controllers set `dto.user_id = user.userId` before calling use cases
- **Use `ResponseBuilder.success<XxxResponse>()`** with generic type parameter
- **Use `ResponseBuilder.error<XxxResponse>()`** with generic type parameter
- **No explicit `Promise<T>` return types** on execute methods — let TypeScript infer
- **Response interfaces are data-only** — no statusCode/message/wrapper properties
- **Domain interfaces use camelCase** — match Drizzle ORM column names
- **Use enums from `src/common/enums/`** — never string literals
- **NEVER use string literals for enum values** in DTOs or use cases
- Use `switch`/`if` over nested ternary operators
- **No services layer** — controllers call use cases directly
- Use `class-validator` decorators with `@IsEnum(EnumType)` referencing actual enums from `@/common`
- Senior-level DTO patterns: `@Length`, `@Matches`, `@IsUUID`, `@ArrayMinSize`, `@Validate`
- Comprehensive Swagger docs: `@ApiOperation` with full flow, `@ApiResponse` with example schema

## Validation

After creating the use case:
1. Run `npx tsc --noEmit 2>&1 | head -20` to check for TypeScript errors
2. Verify the barrel exports compile: `npx tsc --noEmit`
3. Check that `npx nest build` succeeds
