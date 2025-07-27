# Production Configuration

## 1. Docker Configuration
```dockerfile
# Dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/rdbac-*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 2. Application Configuration
```yaml
# application-prod.yml
server:
  port: 8080
  shutdown: graceful

spring:
  profiles:
    active: prod
  
  data:
    mongodb:
      uri: ${MONGODB_URI}
      database: ${MONGODB_DATABASE:AccessVault}
  
  mail:
    host: ${MAIL_HOST:smtp.gmail.com}
    port: ${MAIL_PORT:587}
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

  security:
    require-ssl: true

jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION:3600000}
  refresh-expiration: ${JWT_REFRESH_EXPIRATION:604800000}

logging:
  level:
    com.rdbac: INFO
    org.springframework.security: WARN
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level [%X{traceId}] %logger{36} - %msg%n"

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
```

## 3. Docker Compose for Local Development
```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: rbac_mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: AccessVault
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7.2-alpine
    container_name: rbac_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    command: redis-server --requirepass ${REDIS_PASSWORD}

  app:
    build: .
    container_name: rbac_app
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/AccessVault
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      MAIL_USERNAME: ${MAIL_USERNAME}
      MAIL_PASSWORD: ${MAIL_PASSWORD}
    depends_on:
      - mongodb
      - redis
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  mongodb_data:
```

## 4. Global Exception Handler
```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationException(ValidationException ex) {
        log.warn("Validation error: {}", ex.getMessage());
        return ErrorResponse.builder()
            .code("VALIDATION_ERROR")
            .message(ex.getMessage())
            .timestamp(Instant.now())
            .build();
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleAccessDeniedException(AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getMessage());
        return ErrorResponse.builder()
            .code("ACCESS_DENIED")
            .message("Access denied")
            .timestamp(Instant.now())
            .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenericException(Exception ex) {
        log.error("Unexpected error", ex);
        return ErrorResponse.builder()
            .code("INTERNAL_ERROR")
            .message("An unexpected error occurred")
            .timestamp(Instant.now())
            .build();
    }
}
```
