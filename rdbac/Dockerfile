# Stage 1 - Build Spring Boot app
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

# Copy only backend files from rdbac folder
COPY rdbac/pom.xml /app/
COPY rdbac/src /app/src
COPY rdbac/mvnw /app/
COPY rdbac/.mvn /app/.mvn

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2 - Run Spring Boot app
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

RUN groupadd -r mygroup && useradd -rm -g mygroup myuser
USER myuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
