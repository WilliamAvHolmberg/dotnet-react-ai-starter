# Api Testing Strategy

## Core Principles
- Test real implementations over mocks
- Focus on critical business flows
- Integration tests over unit tests where possible
- Use in-memory SQLite for DB tests
- Keep tests maintainable and meaningful

## What to Test

### Critical Paths (Must Test)
- User Authentication Flow
  - Login with valid credentials
  - Login with invalid credentials
  - Token generation & validation
  - Password hashing verification
- Data Integrity
  - Email uniqueness
  - Required field validation
  - Data constraints
- Security
  - Password hashing
  - Token validation
  - Authorization rules

### Integration Tests
- Full Feature Flows
  - Complete auth cycle (validation → DB → JWT)
  - API endpoints with real HTTP requests
  - Database constraints in action
- Cross-Feature Interactions
  - Feature dependencies
  - Event handling between features
  - State changes across features

### Request Validation
- Input Validation
  - Malformed emails
  - Empty/invalid passwords
  - Required field validation
  - Length constraints
- Edge Cases
  - Unicode characters
  - Special characters
  - Boundary values

### Skip Testing
- Simple getters/setters
- Framework features (basic EF Core operations)
- Internal implementation details
- Obvious/trivial implementations
- Third-party library functionality

## Testing Approach
1. Start with critical path tests
2. Add integration tests for full flows
3. Add validation tests
4. Add edge cases for known issues

## Tools
- xUnit for test framework
- FluentAssertions for readable assertions
- SQLite in-memory for database tests
- Real HTTP calls for API tests

## Best Practices
1. One assert per test when possible
2. Descriptive test names (Given_When_Then)
3. Shared setup code in test fixtures
4. Clean test data between runs
5. Fast test execution
6. No external dependencies 