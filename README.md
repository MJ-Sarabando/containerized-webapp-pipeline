# 🐳 Docker + CI/CD App

Uma aplicação web simples que demonstra competências em **Docker**, **CI/CD**, e **DevOps** usando tecnologias modernas.

![Pipeline Status](https://github.com/MJ-Sarabando/docker-cicd-app/workflows/CI/CD%20Pipeline/badge.svg)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

## 🎯 Objetivo

Este projeto demonstra:
- **Containerização** com Docker e docker-compose
- **Pipeline CI/CD** completo com GitHub Actions
- **Testes automatizados** e verificações de qualidade
- **Boas práticas de segurança** e DevOps
- **Deploy automatizado** (simulado)

## 🏗️ Arquitetura

```
├── app.js                     # Aplicação Node.js/Express
├── package.json               # Dependências e scripts
├── Dockerfile                 # Containerização
├── docker-compose.yml         # Orquestração multi-container
├── .github/workflows/         # Pipeline CI/CD
│   └── ci-cd.yml
├── tests/                     # Testes automatizados
│   └── app.test.js
├── public/                    # Interface web
│   └── index.html
├── nginx.conf                 # Configuração Nginx
└── README.md                  # Esta documentação
```

## 🚀 Quick Start

### Pré-requisitos
- Docker & Docker Compose
- Node.js 18+ (para desenvolvimento local)
- Git

### 1. Clonar o repositório
```bash
git clone https://github.com/MJ-Sarabando/docker-cicd-app.git
cd docker-cicd-app
```

### 2. Executar com Docker Compose
```bash
# Desenvolvimento
docker-compose up --build

# Produção (com Nginx)
docker-compose --profile production up --build -d

# Parar serviços
docker-compose down
```

### 3. Aceder à aplicação
- **Aplicação**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **API Users**: http://localhost:3000/api/users
- **Nginx** (produção): http://localhost:80

## 🛠️ Desenvolvimento Local

### Sem Docker
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

### Com Docker
```bash
# Build da imagem
docker build -t docker-cicd-app .

# Executar container
docker run -p 3000:3000 docker-cicd-app

# Executar testes no container
docker run --rm docker-cicd-app npm test
```

## 🧪 Testes

O projeto inclui uma suite completa de testes:

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
```

### Tipos de testes incluídos:
- **Testes unitários**: Funções utilitárias
- **Testes de integração**: Endpoints da API
- **Testes de performance**: Tempo de resposta
- **Health checks**: Verificação de saúde da aplicação

## 🔄 Pipeline CI/CD

O pipeline GitHub Actions executa automaticamente em:
- **Push** para `main` ou `develop`
- **Pull requests** para `main`
- **Execução manual** (workflow_dispatch)

### Stages do Pipeline:

#### 1. 🧪 Testes e Qualidade
- Instalação de dependências
- Linting (ESLint)
- Execução de testes unitários
- Cobertura de código
- Upload para Codecov

#### 2. 🐳 Build Docker
- Build multi-arquitetura (AMD64/ARM64)
- Push para GitHub Container Registry
- Cache otimizado
- Tagging automático

#### 3. 🔒 Segurança
- Audit de dependências NPM
- Scan de vulnerabilidades (Trivy)
- Upload para GitHub Security

#### 4. 🚀 Deploy (Simulado)
- Deploy apenas em `main`
- Verificação de saúde pós-deploy
- Notificações de sucesso

#### 5. ⏪ Rollback
- Executado em caso de falha
- Reversão automática

## 🐳 Docker

### Dockerfile Features
- **Multi-stage build** para otimização
- **Utilizador non-root** para segurança
- **Health checks** integrados
- **Imagem Alpine** (menor tamanho)
- **Cache de dependências** otimizado

### Docker Compose Services
- **app**: Aplicação principal Node.js
- **redis**: Cache (demonstração multi-container)
- **nginx**: Reverse proxy (perfil produção)

### Comandos úteis:
```bash
# Ver logs da aplicação
docker-compose logs -f app

# Executar comando no container
docker-compose exec app sh

# Verificar health status
docker-compose ps

# Limpar volumes
docker-compose down -v
```

## 🔒 Segurança

### Medidas implementadas:
- **Utilizador non-root** no container
- **Scan de vulnerabilidades** automatizado
- **Audit de dependências** no CI/CD
- **Health checks** para monitorização
- **Secrets management** com GitHub Secrets
- **Multi-stage builds** para reduzir superfície de ataque

### Verificações de segurança:
```bash
# Audit local de dependências
npm audit

# Scan com Trivy (se instalado)
trivy fs .

# Verificar imagem Docker
docker scout cves docker-cicd-app
```

## 📊 Monitorização

### Health Checks
- **Aplicação**: `/api/health`
- **Docker**: Health check integrado
- **Compose**: Health checks para todos os serviços

### Métricas disponíveis:
- Status da aplicação
- Timestamp da última verificação
- Versão da aplicação
- Informações do sistema

## 🌐 Deploy

### GitHub Container Registry
As imagens são automaticamente publicadas em:
```
ghcr.io/MJ_Sarabando/docker-cicd-app:latest
ghcr.io/MJ_Sarabando/docker-cicd-app:main-<sha>
```

### Deploy em produção (exemplo):
```bash
# Pull da imagem mais recente
docker pull ghcr.io/MJ_Sarabando/docker-cicd-app:latest

# Executar em produção
docker run -d \
  --name docker-cicd-app-prod \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/MJ_Sarabando/docker-cicd-app:latest
```

## 🛠️ Configuração

### Variáveis de Ambiente
```bash
# Aplicação
NODE_ENV=production          # Ambiente de execução
PORT=3000                    # Porta da aplicação

# Docker
DOCKER_BUILDKIT=1           # Build kit ativado
COMPOSE_DOCKER_CLI_BUILD=1  # CLI build ativado
```

### GitHub Secrets necessários:
- `GITHUB_TOKEN`: Automático (push para registry)
- `CODECOV_TOKEN`: Token do Codecov (opcional)

## 📝 Scripts Disponíveis

```bash
npm start          # Iniciar aplicação
npm run dev        # Desenvolvimento com nodemon
npm test           # Executar testes
npm run test:watch # Testes em modo watch
npm run test:coverage # Cobertura de código
```

## 🤝 Contribuição

1. Fork o projeto
2. Criar branch para feature (`git checkout -b feature/nova-feature`)
3. Commit das alterações (`git commit -m 'Adicionar nova feature'`)
4. Push para branch (`git push origin feature/nova-feature`)
5. Abrir Pull Request

### Guidelines:
- Seguir convenções de código existentes
- Adicionar testes para novas funcionalidades
- Atualizar documentação quando necessário
- Verificar que o pipeline CI/CD passa

## 📋 Roadmap

- [ ] Integração com base de dados (PostgreSQL)
- [ ] Métricas com Prometheus/Grafana
- [ ] Logging estruturado (Winston)
- [ ] Rate limiting
- [ ] Autenticação JWT
- [ ] Deploy em Kubernetes
- [ ] Testes E2E com Cypress

## 🐛 Troubleshooting

### Problemas comuns:

**Container não inicia:**
```bash
# Verificar logs
docker-compose logs app

# Verificar health status
docker-compose ps
```

**Testes falham:**
```bash
# Limpar cache
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

**Pipeline CI/CD falha:**
- Verificar GitHub Secrets
- Confirmar permissões do repository
- Verificar sintaxe YAML

## 📚 Recursos Úteis

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Docker Security](https://docs.docker.com/engine/security/)

## 📄 Licença

Este projeto está sob a licença MIT. Ver ficheiro [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Maria Joao Sarabando**
- GitHub: https://github.com/MJ-Sarabando
- LinkedIn: https://www.linkedin.com/in/maria-sarabando

---

⭐ **Se este projeto te ajudou, considera dar-lhe uma estrela!** ⭐