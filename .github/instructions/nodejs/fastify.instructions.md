---
description: Guidelines for Fastify applications using nodejs and Typescript
applyTo: src/**/*.js, src/**/*.ts
---

## Important Process Requirements

- Always use TypeScript with strict mode enabled
- Enable `experimentalDecorators` and `emitDecoratorMetadata` in tsconfig.json for dependency injection
- Import `reflect-metadata` at the top of main.ts
- Use Zod for schema validation and type inference
- Implement proper dependency injection using `fastify-decorators`
- Always validate request/response data with schemas
- Use correlation IDs for request tracing (generate with uuid)
- Configure environment-specific settings using dedicated config files
- ALWAYS present a detailed plan and wait for explicit approval before implementing any code changes
- Do not proceed with implementation until receiving confirmation from the user
- When presenting the plan, provide a step-by-step breakdown of all files to be created or modified
- Ask directly: "Do you approve this plan before I proceed with implementation?"

## Naming Conventions

### Files and Directories

- Use kebab-case for file names: `posts.example.controller.ts`
- Add descriptive suffixes: `.controller.ts`, `.service.ts`, `.middleware.ts`, `.plugin.ts`
- Test files: `*.spec.ts` or `*.test.ts`
- Config files: `app.config.{env}.ts` format
- Place tests in `__tests__` directories within their respective modules

### Classes and Interfaces

- Use PascalCase for classes: `PostController`, `BaseHttpService`
- Use PascalCase for interfaces: `AppConfig`, `ValidationErrorDetail`
- Controllers: End with `Controller` (e.g., `HealthController`)
- Services: End with `Service` (e.g., `PostService`)
- Errors: End with `Error` (e.g., `ValidationError`)

### Variables and Methods

- Use camelCase for variables and methods: `getAllPosts`, `baseUrl`
- Use descriptive names: `createPost` instead of `create`
- Boolean variables: Use `is`, `has`, `can` prefixes when appropriate
- Constants: Use UPPER_SNAKE_CASE for module-level constants

### Schema and Type Names

- Zod schemas: End with `Schema` (e.g., `PostSchema`, `CreatePostSchema`)
- TypeScript types: Use inferred types from Zod schemas with `z.infer<typeof Schema>`
- Response schemas: Include HTTP method context (e.g., `postListResponseSchema`)

## Code Style

### Formatting

- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use single quotes for strings
- Trailing commas in objects and arrays
- Line length: Maximum 85 characters
- Use template literals for string interpolation

### Import Organization

- Group imports: external libraries first, then internal modules
- Use simple-import-sort ESLint plugin for automatic sorting
- Relative imports for local modules: `'../cross-cutting/config'`
- Absolute imports from node_modules: `'fastify'`

### Code Structure

- Use async/await instead of promises with .then()
- Destructure objects when accessing multiple properties
- Use optional chaining (`?.`) when appropriate
- Prefer const over let, avoid var
- Use arrow functions for short callbacks

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── server.ts                  # Server configuration
├── routes.ts                  # Route registration
├── controllers/               # HTTP request handlers
│   ├── __tests__/            # Controller tests
│   └── *.controller.ts
├── service/                   # Business logic services
│   └── *.service.ts
├── middlewares/               # Custom middlewares
│   └── *.middleware.ts
├── plugins/                   # Fastify plugins
│   ├── index.ts              # Plugin registration
│   └── *.plugin.ts
├── schemas/                   # Request/response schemas
│   └── *.schemas.ts
├── types/                     # Type definitions
│   └── *.types.ts
├── interfaces/                # Interface definitions
│   └── *.ts
└── cross-cutting/             # Shared concerns
    ├── config/                # Configuration management
    ├── error-handling/        # Error classes and handling
    ├── logging/               # Logging configuration
    ├── communication/         # HTTP client services
    ├── caching/               # Cache strategies
    └── context/               # Request context management
```

### Organization Principles

- Keep cross-cutting concerns separated
- Place tests close to the code they test
- Use index.ts files for clean imports

## Documentation

### Code Comments

- Use JSDoc for public APIs and complex functions
- Explain "why" not "what" in comments
- Document configuration options and environment variables
- Include examples for complex schemas or services

### Repository Documentation

- Maintain a comprehensive README.md with setup instructions
- Document API endpoints using Fastify Swagger integration
- Keep CHANGELOG.md updated using conventional commits
- Include environment variable documentation
- Provide Docker setup instructions

### API Documentation

- Use Fastify Swagger plugin for automatic API docs
- Define comprehensive schemas for all endpoints
- Include response examples and error codes

## Testing

### Test Structure

- Use Jest as the testing framework
- Use `@swc/jest` for fast TypeScript compilation
- Place tests in `__tests__` directories
- Use descriptive test names: `should respond with 200 OK`

### Test Patterns

```typescript
describe("FeatureName", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createServer();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should perform expected behavior", async () => {
    // Arrange, Act, Assert pattern
  });
});
```

### Testing Guidelines

- Test controllers using `app.inject()` for HTTP testing
- Mock external dependencies using Jest mocks
- Use factory functions for test data creation
- Test both success and error scenarios
- Maintain test coverage thresholds (minimum 80% for branches, functions, lines, statements)

## Dependencies & Setup

### Package Management

- Use yarn as package manager
- Pin dependency versions in package.json
- Separate devDependencies from dependencies
- Use `peerDependencies` for plugin development

### Key Dependencies

- **Runtime**: `fastify`, `fastify-decorators`, `zod`, `axios`
- **Development**: `typescript`, `jest`, `eslint`, `prettier`
- **Utilities**: `uuid`, `pino`, `dotenv`, `qs`

### Import/Export Patterns

- Use ES6 imports/exports
- Export classes and functions as named exports
- Use default exports for main module exports
- Re-export from index.ts files for clean imports

## Error Handling

### Error Architecture

- Extend `BaseError` for all custom errors
- Use specific error classes: `ValidationError`, `CommunicationError`, `ApiError`
- Include error codes and HTTP status codes
- Provide detailed error information for debugging

### Error Types

```typescript
// Custom error classes
export class ValidationError extends BaseError
export class CommunicationError extends BaseError
export class ApiError extends BaseError

// Error structure
interface Error {
  message: string;
  code: string;
  statusCode: StatusCodes;
  validation?: any;
}
```

### Error Handling Patterns

- Use global error handler middleware
- Transform external errors (Axios, Zod) to internal error types
- Log errors with correlation IDs
- Return consistent error response format
- Hide internal error details in production

## Monitoring

### Logging Strategy

- Use Pino logger for structured logging
- Include correlation IDs in all log entries
- Log request/response data selectively
- Use different log levels: debug, info, warn, error
- Configure log serializers for request/response objects

### Log Structure

- Include timestamp, level, message, and correlation_id
- Add trace_id from incoming requests
- Log HTTP method, URL, and status codes
- Use structured logging with JSON format

### Observability

- Integrate New Relic for application monitoring
- Enable New Relic only in dev/staging/production environments
- Configure proper error capturing and reporting
- Include performance metrics and traces

## Performance

### HTTP Client Optimization

- Use keep-alive agents for HTTP connections
- Configure connection pooling with `agentkeepalive`
- Implement request/response interceptors for common headers
- Use appropriate timeouts for external calls

### Caching Strategy

- Implement cache abstraction with multiple strategies (Redis, LRU)
- Use middleware for route-level caching
- Cache frequently accessed data
- Implement cache invalidation strategies

### General Performance

- Use async/await for non-blocking operations
- Implement connection pooling for databases
- Use streaming for large data processing
- Enable gzip compression for responses

## Design Patterns

### Dependency Injection

- Mark services with `@Service()` decorator
- Inject dependencies using `@Inject()` decorator
- Use constructor injection for external dependencies

### Repository/Service Pattern

- Separate business logic (services) from data access
- Use base classes for common functionality (`BaseHttpService`)
- Implement interfaces for external service contracts
- Use factory pattern for cache strategy selection

### Plugin Architecture

- Create reusable plugins for cross-cutting concerns
- Use `fastify-plugin` for plugin registration
- Implement plugin lifecycle hooks properly
- Register plugins before route registration

### Schema-First Development

- Define Zod schemas for all data structures
- Use `z.infer` for type generation
- Validate all input/output with schemas
- Transform schemas to JSON Schema for Swagger documentation

## Node.js/Fastify-Specific Guidance

### Fastify Best Practices

- Register plugins before routes
- Use plugin encapsulation for feature isolation
- Implement proper request lifecycle hooks
- Use Fastify's built-in validation with schemas

### Request/Response Handling

- Use typed request/response interfaces
- Implement proper HTTP status codes
- Use reply decorators for response helpers
- Handle request context with `@fastify/request-context`

### Middleware Patterns

- Implement middleware as Fastify hooks or plugins
- Use `onRequest` hooks for request preprocessing
- Use `preHandler` for route-specific middleware
- Implement global error handling middleware

### Configuration Management

- Use environment-specific configuration files
- Validate configuration with Zod schemas
- Use `@fastify/env` for environment variable management
- Separate configuration from application logic

### Security Considerations

- Enable CORS with `@fastify/cors`
- Use helmet for security headers
- Implement rate limiting
- Validate and sanitize all inputs
- Use secure cookie settings with `@fastify/cookie`
