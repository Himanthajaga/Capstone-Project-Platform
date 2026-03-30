# Platform - Enterprise Cloud Application (ECA) Infrastructure Layer

The Platform layer contains all the essential infrastructure components for the Enterprise Cloud Application (ECA) microservices architecture. This includes the API Gateway, Configuration Server, and Service Registry.

## Student Information

| Field          | Value |
|----------------|---|
| Student Name   | J.G Himantha |
| Student Number | 2301692032 |
| Slack Handle   | Himantha j |
| Module         | ITS 2130 Enterprise Cloud Application |
| Program        | GDSE @ IJSE |
| GCP Project ID | capstone-project-490416 |

## About

This project is part of the **Enterprise Cloud Application (ECA)** module in the Higher Diploma in Software Engineering (GDSE) program at the Institute of Software Engineering (IJSE). It comprises the critical infrastructure components that enable microservice orchestration, configuration management, and API routing for the entire capstone project.

## Project Description

The Platform layer consists of three core components that work together to provide a scalable, resilient microservices infrastructure:

1. **Api-Gateway** - A reactive API Gateway built with Spring Cloud Gateway (WebFlux) serving as the single entry point for all client requests
2. **Config-Server** - Spring Cloud Configuration Server for centralized configuration management across all microservices
3. **Service-Registry** (Eureka) - Spring Cloud Netflix Eureka Server for service registration and discovery

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Java | 25 | Programming Language |
| Spring Boot | 4.0.3 | Framework for building microservices |
| Spring Cloud | 2025.1.0 | Microservices patterns and tools |
| Spring Cloud Gateway (WebFlux) | Latest | Reactive API routing and filtering |
| Spring Cloud Netflix Eureka | Part of Cloud | Service discovery and registration |
| Spring Cloud Config | Part of Cloud | Centralized configuration management |
| Spring Boot Actuator | Included | Health checks and monitoring endpoints |
| PostgreSQL | 15+ | Relational database (platform uses 12500) |
| GCP (Google Cloud Platform) | - | Cloud deployment platform |

## Platform Components Overview

### 1. Config-Server (Port: 9000)

**Purpose:** Centralized configuration management for all microservices

- Fetches application configurations from a remote Git repository
- Provides configurations dynamically to all microservices
- Enables configuration changes without redeployment
- All services depend on this being running first

**Key Features:**
- REST API for configuration retrieval
- Git repository backend for version control
- Profile-based configuration (dev, prod, staging)

### 2. Service-Registry (Eureka) (Port: 9001)

**Purpose:** Service registration and discovery

- All microservices register themselves upon startup
- Enables dynamic service discovery
- Provides health monitoring for registered instances
- Eureka Dashboard UI available at `http://localhost:9001`http://34.126.186.15:9001/,<br/>http://34.124.176.187:9001/,<br/>http://34.158.34.135:9001/

**Key Features:**
- Automatic service registration/deregistration
- Load balancing across service instances
- Health check monitoring
- Web dashboard for visibility

### 3. Api-Gateway (Port: 7000)

**Purpose:** Single entry point for all API requests

- Routes requests to appropriate microservices based on path patterns
- Implements cross-cutting concerns (CORS, authentication, logging)
- Load balances across multiple instances of each service
- Uses Spring Cloud Gateway with reactive (WebFlux) architecture

**Routing Configuration:**
- `/api/v1/students/**` → STUDENT-SERVICE
- `/api/v1/programs/**` → PROGRAM-SERVICE
- `/api/v1/enrollments/**` → ENROLLMENT-SERVICE

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   Client Applications                    │
│              (Frontend, Mobile, Third-party)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   API Gateway (7000)   │
        │  Spring Cloud Gateway  │
        └──────────┬─────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   ┌────▼─────────┐  ┌────────▼───────┐
   │ Service      │  │ Config Server  │
   │ Registry     │  │ (Port: 9000)   │
   │ (Port: 9001) │  └────────────────┘
   └────┬─────────┘
        │
    ┌───┼───────────────────┐
    │   │                   │
┌───▼─┐ ┌───▼─────┐  ┌──────▼──┐
│ S1  │ │ S2      │  │ S3      │
│Port │ │ Port    │  │ Port    │
│8000 │ │ 8001    │  │ 8002    │
└─────┘ └─────────┘  └─────────┘
```

## Setup / Getting Started Instructions

### Prerequisites

- **Java 25** installed
- **Maven 3.9+** installed (or use bundled `./mvnw`)
- **PostgreSQL 15+** running on port `12500` with database `eca`
- **Git** for version control
- GCP account (for cloud deployment)

### Clone the Repository with Submodules

```bash
# Clone with all submodules
git clone --recursive https://github.com/Himanthajaga/Capstone-Project-Fully-with-GCP.git

# Or if already cloned, initialize submodules
cd Capstone-Project
git submodule update --init --recursive
```

### Startup Order (Critical)

**IMPORTANT:** Components must be started in this specific order:

1. **Config-Server** (Port: 9000)
   ```bash
   cd Platform/Config-Server
   ./mvnw spring-boot:run
   ```

2. **Service-Registry** (Port: 9001)
   ```bash
   cd Platform/platform-registry
   ./mvnw spring-boot:run
   ```

3. **Api-Gateway** (Port: 7000)
   ```bash
   cd Platform/Api-gateway
   ./mvnw spring-boot:run
   ```

### Build All Platform Components

```bash
# Build entire Platform
cd Platform
mvn clean install

# Or build individually
cd Platform/Config-Server && mvn clean install
cd ../platform-registry && mvn clean install
cd ../Api-gateway && mvn clean install
```

### Access Points

| Component | URL | Port |
|---|---|---|
| Config-Server | http://localhost:9000 | 9000 |
| Service-Registry (Eureka) | http://localhost:9001 | 9001 |
| Api-Gateway | http://localhost:7000 | 7000 |
| Actuator Health | http://localhost:{port}/actuator/health | Various |

### Verify Platform is Running

```bash
# Check Config-Server health
curl http://localhost:9000/actuator/health

# Check Service-Registry health
curl http://localhost:9001/actuator/health

# Check Api-Gateway health
curl http://localhost:7000/actuator/health

# View registered services in Eureka
curl http://localhost:9001/eureka/apps
```

## Database Configuration

PostgreSQL Configuration for Platform services:

```
Host: localhost
Port: 12500
Database: eca
Username: (configured in Config-Server)
Password: (configured in Config-Server)
```

## Monitoring and Logs

### View Logs

```bash
# Platform logs directory
tail -f logs/api-gateway-out.log
tail -f logs/config-server-out.log
tail -f logs/platform-registry-out.log
```

### Actuator Endpoints (Available on all components)

- `/actuator/health` - Health status
- `/actuator/metrics` - Application metrics
- `/actuator/env` - Environment properties
- `/actuator/beans` - Spring beans information

## PM2 Process Management

The platform uses PM2 for process management and auto-restart capabilities:

```bash
# View PM2 status
pm2 status

# Monitor running processes
pm2 monit

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

## GCP Deployment

### Deploy to Google Cloud Platform

```bash
# Build Docker images for Platform components
./mvnw clean install

# Deploy to GCP using gcloud CLI
gcloud app deploy

# Or use GCP Console for VM deployment
```

### GCP Project Details

- **Project ID:** capstone-project-490416
- **Region:** asia-southeast1 (Singapore)
- **Zones:** asia-southeast1-a, asia-southeast1-b, asia-southeast1-c
- **Auto-scaling:** Configured for high availability

## Troubleshooting

### Config-Server Won't Start

```
Issue: Port 9000 already in use
Solution: Kill existing process or use different port
lsof -i :9000
kill -9 <PID>
```

### Service-Registry Shows No Instances

```
Issue: Services not registering
Solution: 
1. Check Config-Server is running
2. Verify network connectivity
3. Check service logs for errors
```

### Api-Gateway Can't Route Requests

```
Issue: 503 Service Unavailable
Solution:
1. Ensure Service-Registry is running
2. Check that downstream services are registered
3. Verify routing configuration in Config-Server
```

### Database Connection Issues

```
Issue: PostgreSQL connection timeout
Solution:
1. Verify PostgreSQL is running on port 12500
2. Check database 'eca' exists
3. Verify credentials in Config-Server configuration
```

## Testing the Platform

### Using curl

```bash
# Test Config-Server
curl http://localhost:9000/

# Test Service-Registry
curl http://localhost:9001/eureka/apps

# Test Api-Gateway (routes to registered services)
curl http://localhost:7000/api/v1/students
```

### Using Postman

A comprehensive Postman collection is available for testing:
- [ECA Platform Collection](https://www.postman.com/ijse-eca-5768309/workspace/eca-69-70/collection)

## Documentation

- **Architecture Documentation:** See [architecture.md](../docs/architecture.md)
- **Individual Component READMEs:**
  - [Config-Server README](./Config-Server/README.md)
  - [Service-Registry README](./platform-registry/README.md)
  - [Api-Gateway README](./Api-gateway/README.md)

## Contributing

This project is a capstone project for IJSE students. Modifications should follow the project requirements and academic guidelines.

## Support & Questions

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Refer to individual component README files
3. Review the [Architecture Documentation](../docs/architecture.md)
4. Contact via Slack workspace (IJSE ECA Community)

## License

This project is part of the IJSE curriculum and is intended for educational purposes only.

---

**Last Updated:** March 2026
**Module:** ITS 2130 - Enterprise Cloud Application
**Status:** Production Ready

