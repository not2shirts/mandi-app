# Stage 1 - Use Java 21 to build
FROM eclipse-temurin:21-jdk-jammy as build
WORKDIR /app
COPY rdbac/pom.xml /app/
COPY rdbac/src /app/src
COPY rdbac/mvnw /app/
COPY rdbac/.mvn /app/.mvn

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2 - Run with Java 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN groupadd -r mygroup && useradd -rm -g mygroup myuser
USER myuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
