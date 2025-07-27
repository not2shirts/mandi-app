# -------------------------------
# Stage 1: Build WAR with Maven
# -------------------------------
FROM eclipse-temurin:17-jdk-jammy as build

WORKDIR /app
COPY rdbac/pom.xml .
COPY rdbac/src ./src

RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# -------------------------------
# Stage 2: Run WAR on embedded Tomcat
# -------------------------------
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app
COPY --from=build /app/target/*.war app.war

# Optional: Create non-root user
RUN groupadd -r mygroup && useradd -rm -g mygroup myuser
USER myuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.war"]
