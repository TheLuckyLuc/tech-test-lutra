# Architectural Decision: Service Repository Pattern

## Context

I wanted to look into common design patterns used with Next.js/tRPC, which brought me to the service repository pattern.

I quite liked this approach, as it creates clear separation between business logic from the service and underlying database operations that may be required.

This would prove to be quite scalable, as the service doesn't need to be aware of the underlying database engine, nor its query patterns, allowing the repository to take care of this, also making it simple to update if we were to change database engines at any point.

This pattern should also allow things to be easily testable, being able to mock data at each level throughout this pattern in isolation.
