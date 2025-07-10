FROM eclipse-temurin:21-jdk-jammy as builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd -r financeapp && useradd -r -g financeapp financeapp

COPY --from=builder /app/target/*.jar app.jar

RUN chown -R financeapp:financeapp /app

USER financeapp

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]