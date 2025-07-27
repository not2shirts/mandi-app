# Multi-Stage Dockerfile

# Build Stage
FROM eclipse-temurin:17-jdk-jammy as build
WORKDIR /app
COPY pom.xml /app
COPY src /app/src
RUN mvn -f /app/pom.xml clean package -DskipTests

# Final Stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN groupadd -r mygroup && useradd -rm -g mygroup myuser
USER myuser
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
