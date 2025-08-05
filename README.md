# 🐳 Docker + CI/CD App

A simple web application that demonstrates expertise in **Docker**, **CI/CD**, and **DevOps** using modern technologies.

![Pipeline Status](https://github.com/MJ-Sarabando/docker-cicd-app/workflows/CI/CD%20Pipeline/badge.svg)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

## 🎯 Objective

This project demonstrates:
- **Containerization** with Docker and docker-compose
- **Complete CI/CD pipeline** with GitHub Actions
- **Automated testing** and quality checks
- **Security best practices** and DevOps
- **Automated deployment** (simulated)

## 🏗️ Architecture

```
├── app.js                     # Node.js/Express application
├── package.json               # Dependencies and scripts
├── Dockerfile                 # Containerization
├── docker-compose.yml         # Multi-container orchestration
├── .github/workflows/         # CI/CD pipeline
│   └── ci-cd.yml
├── tests/                     # Automated tests
│   └── app.test.js
├── public/                    # Web interface
│   └── index.html
├── nginx.conf                 # Nginx configuration
└── README.md                  # This documentation
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/MJ-Sarabando/docker-cicd-app.git
cd docker-cicd-app
```

### 2. Run with Docker Compose
```bash
# Development
docker-compose up --build

# Production (with Nginx)
docker-compose --profile production up --build -d

# Stop services
docker-compose down
```

### 3. Access the application
- **Application**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **API Users**: http://localhost:3000/api/users
- **Nginx** (production): http://localhost:80

## 🛠️ Local Development

### Without Docker
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### With Docker
```bash
# Build image
docker build -t docker-cicd-app .

# Run container
docker run -p 3000:3000 docker-cicd-app

# Run tests in container
docker run --rm docker-cicd-app npm test
```

## 🧪 Testing

The project includes a comprehensive test suite:

```bash
# Run all tests
npm test

# Tests in watch mode
npm run test:watch

# Code coverage
npm run test:coverage
```

### Types of tests included:
- **Unit tests**: Utility functions
- **Integration tests**: API endpoints
- **Performance tests**: Response time
- **Health checks**: Application health verification

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline runs automatically on:
- **Push** to `main` or `develop`
- **Pull requests** to `main`
- **Manual execution** (workflow_dispatch)

### Pipeline Stages:

#### 1. 🧪 Testing and Quality
- Dependency installation
- Linting (ESLint)
- Unit test execution
- Code coverage
- Upload to Codecov

#### 2. 🐳 Docker Build
- Multi-architecture build (AMD64/ARM64)
- Push to GitHub Container Registry
- Optimized caching
- Automatic tagging

#### 3. 🔒 Security
- NPM dependency audit
- Vulnerability scanning (Trivy)
- Upload to GitHub Security

#### 4. 🚀 Deploy (Simulated)
- Deploy only on `main`
- Post-deploy health verification
- Success notifications

#### 5. ⏪ Rollback
- Executed on failure
- Automatic rollback

## 🐳 Docker

### Dockerfile Features
- **Multi-stage build** for optimization
- **Non-root user** for security
- **Integrated health checks**
- **Alpine image** (smaller size)
- **Optimized dependency caching**

### Docker Compose Services
- **app**: Main Node.js application
- **redis**: Cache (multi-container demonstration)
- **nginx**: Reverse proxy (production profile)

### Useful commands:
```bash
# View application logs
docker-compose logs -f app

# Execute command in container
docker-compose exec app sh

# Check health status
docker-compose ps

# Clean volumes
docker-compose down -v
```

## 🔒 Security

### Implemented measures:
- **Non-root user** in container
- **Automated vulnerability scanning**
- **Dependency audit** in CI/CD
- **Health checks** for monitoring
- **Secrets management** with GitHub Secrets
- **Multi-stage builds** to reduce attack surface

### Security checks:
```bash
# Local dependency audit
npm audit

# Scan with Trivy (if installed)
trivy fs .

# Check Docker image
docker scout cves docker-cicd-app
```

## 📊 Monitoring

### Health Checks
- **Application**: `/api/health`
- **Docker**: Integrated health check
- **Compose**: Health checks for all services

### Available metrics:
- Application status
- Last check timestamp
- Application version
- System information

## 🌐 Deployment

### GitHub Container Registry
Images are automatically published to:
```
ghcr.io/MJ_Sarabando/docker-cicd-app:latest
ghcr.io/MJ_Sarabando/docker-cicd-app:main-<sha>
```

### Production deployment (example):
```bash
# Pull latest image
docker pull ghcr.io/MJ_Sarabando/docker-cicd-app:latest

# Run in production
docker run -d \
  --name docker-cicd-app-prod \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/MJ_Sarabando/docker-cicd-app:latest
```

## 🛠️ Configuration

### Environment Variables
```bash
# Application
NODE_ENV=production          # Runtime environment
PORT=3000                    # Application port

# Docker
DOCKER_BUILDKIT=1           # Build kit enabled
COMPOSE_DOCKER_CLI_BUILD=1  # CLI build enabled
```

### Required GitHub Secrets:
- `GITHUB_TOKEN`: Automatic (push to registry)
- `CODECOV_TOKEN`: Codecov token (optional)

## 📝 Available Scripts

```bash
npm start          # Start application
npm run dev        # Development with nodemon
npm test           # Run tests
npm run test:watch # Tests in watch mode
npm run test:coverage # Code coverage
```

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

### Guidelines:
- Follow existing code conventions
- Add tests for new functionalities
- Update documentation when necessary
- Ensure CI/CD pipeline passes

## 📋 Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] Metrics with Prometheus/Grafana
- [ ] Structured logging (Winston)
- [ ] Rate limiting
- [ ] JWT authentication
- [ ] Kubernetes deployment
- [ ] E2E tests with Cypress

## 🐛 Troubleshooting

### Common issues:

**Container won't start:**
```bash
# Check logs
docker-compose logs app

# Check health status
docker-compose ps
```

**Tests failing:**
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**CI/CD pipeline fails:**
- Check GitHub Secrets
- Verify repository permissions
- Check YAML syntax

## 📚 Useful Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Docker Security](https://docs.docker.com/engine/security/)

## 📄 License

This project is under the MIT license. See [LICENSE](LICENSE) file for more details.

## 👨‍💻 Author

**Maria Joao Sarabando**
- GitHub: https://github.com/MJ-Sarabando
- LinkedIn: https://www.linkedin.com/in/maria-sarabando

---

⭐ **If this project helped you, consider giving it a star!** ⭐