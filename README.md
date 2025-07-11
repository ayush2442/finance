# Azure Container Instance CI/CD Deployment Project

This project implements a CI/CD pipeline using **Azure DevOps** to build, test, and deploy a **Spring Boot application** into **Azure Container Instances (ACI)** with support for **container image scanning**, **monitoring**, and **zero-downtime deployment**.

---
## 🔗 Azure DevOps Project
[![Azure DevOps Project](https://img.shields.io/badge/View-Azure_DevOps_Project-blue?logo=azuredevops&style=for-the-badge)](https://dev.azure.com/22BDO10038/finance)

## 🛠 Build Status
[![Build Status](https://dev.azure.com/22BDO10038/finance/_apis/build/status/finance-ci?branchName=main)](https://dev.azure.com/22BDO10038/finance/_build/latest?definitionId=1&branchName=main)

---
## 📋 Project Documentation

This repository includes comprehensive documentation to understand the project architecture and implementation:

### 📁 Documentation Files
- **[High Level Design Diagram](https://github.com/ayush2442/finance/blob/e9a0d33547c610d1b23917ea498aaca57bb935d0/High%20level%20financeapp.drawio.pdf)** - Overview of the system architecture and component interactions
- **[Low Level Design Diagram](https://github.com/ayush2442/finance/blob/e9a0d33547c610d1b23917ea498aaca57bb935d0/Low%20level%20financeapp.drawio.pdf)** - Detailed technical design and implementation specifics
- **[Final Project Documentation](https://github.com/ayush2442/finance/blob/e9a0d33547c610d1b23917ea498aaca57bb935d0/Final%20Documentation.pdf)** - Complete project documentation with deployment and outcome

*Note: All documentation files are available in the root directory of this repository.*

---
## 🧰 Prerequisites

### Tools

- Azure CLI (v2.50+)
- Docker (v24+)
- Java JDK 21
- Maven (v4.0+)
- Git
- Node.js (for API testing)

### Azure Resources

- Azure Container Registry (Basic SKU)
- Azure Container Instance
- Application Insights
- Azure DevOps Project + Service Connection

---

## ⚙️ Setup

### 1. Clone and Prepare

```bash
git clone https://github.com/finance-company/finance-app-aci.git
cd finance-app-aci
chmod +x scripts/*.sh
```

### 2. Environment Variables
Copy and edit the .env.template:
```bash
cp .env.template .env
nano .env
source .env
```

### 3. Deploy Infrastructure
```bash
./scripts/deploy-infrastructure.sh
```
---

## 🚀 CI/CD Pipeline
The pipeline (azure-pipelines.yml) automates:

1. Build: Maven package, unit tests, SonarCloud, Docker build

2. Security: Image scanned via Trivy

3. Push: Image pushed to Azure Container Registry

4. Deploy: ACI container created/replaced

5. Test: Integration and health checks

6. Monitor: Integrated with Application Insights

---

## 🧪 Testing Strategy

### Unit Tests (Java - JUnit)
- Health check and controller-level tests under src/test

### Integration Tests (Node.js - Axios + Mocha)
tests/integration/api-tests.js includes:

- /actuator/health

- /api/finance/status

### Load Tests
tests/performance/load-test.js sends concurrent requests and captures response time.

---

## 🐳 Docker (Multi-stage Build)

```bash
FROM maven:3.9-openjdk-21-slim AS builder
WORKDIR /app
COPY pom.xml . && RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

FROM openjdk:21-jre-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```
---

## 📈 Monitoring
Application Insights is integrated for:

- Request metrics

- Health check visibility

- Custom dashboards

---

## 🔐 Security

- Non-root containers

- Environment variables passed securely

- Trivy image scan before deployment

- Secrets stored in Azure DevOps Library

---

## 📬 API Endpoints

- GET /actuator/health

- GET /api/finance/status

---

## 📊 Success Metrics

* **Build Success Rate**: >95%
* **Deployment Time**: <5 minutes
* **Test Coverage**: >80%
* **Application Uptime**: >99%
* **Response Time**: <2 seconds
