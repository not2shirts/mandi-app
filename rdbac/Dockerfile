# -------------------------------
# Stage 1: Build WAR with Maven
# -------------------------------
FROM eclipse-temurin:17-jdk-jammy as build

WORKDIR /app

# Copy only pom.xml first for layer caching
COPY rdbac/pom.xml .

# Resolve dependencies first
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline -B

# Copy full source code
COPY rdbac/src ./src

# Package WAR (skip tests in Docker build)
RUN mvn clean package -DskipTests

# -------------------------------
# Stage 2: Run WAR on embedded Tomcat
# -------------------------------
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy built WAR
COPY --from=build /app/target/*.war app.war

# Optional JVM SSL workaround flags for MongoDB (Render + TLSv1.2)
ENV JAVA_OPTS="-Djdk.tls.client.protocols=TLSv1.2 -Dhttps.protocols=TLSv1.2"

# Optional: Create non-root user
RUN groupadd -r mygroup && useradd -rm -g mygroup myuser
USER myuser

EXPOSE 8080

# Use JAVA_OPTS in entrypoint
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.war"]
