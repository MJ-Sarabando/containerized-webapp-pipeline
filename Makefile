# Makefile para Docker + CI/CD App
.PHONY: help build run test clean deploy logs

# Variáveis
APP_NAME = docker-cicd-app
DOCKER_IMAGE = $(APP_NAME):latest
DOCKER_COMPOSE = docker-compose

# Comando padrão
help: ## Mostrar esta ajuda
	@echo "Comandos disponíveis:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Desenvolvimento
install: ## Instalar dependências
	npm install

dev: ## Executar em modo desenvolvimento
	npm run dev

test: ## Executar testes
	npm test

test-watch: ## Executar testes em modo watch
	npm run test:watch

test-coverage: ## Executar testes com cobertura
	npm run test:coverage

# Docker
build: ## Build da imagem Docker
	docker build -t $(DOCKER_IMAGE) .

run: ## Executar container Docker
	docker run -p 3000:3000 --name $(APP_NAME) $(DOCKER_IMAGE)

# Docker Compose
up: ## Subir serviços com docker-compose
	$(DOCKER_COMPOSE) up --build

up-prod: ## Subir em modo produção (com Nginx)
	$(DOCKER_COMPOSE) --profile production up --build -d

down: ## Parar serviços docker-compose
	$(DOCKER_COMPOSE) down

logs: ## Ver logs dos serviços
	$(DOCKER_COMPOSE) logs -f

# Manutenção
clean: ## Limpar containers e imagens
	docker container prune -f
	docker image prune -f
	docker volume prune -f

clean-all: ## Limpeza completa do Docker
	docker system prune -af --volumes

# Desenvolvimento e Debug
shell: ## Abrir shell no container da app
	$(DOCKER_COMPOSE) exec app sh

redis-cli: ## Conectar ao Redis CLI
	$(DOCKER_COMPOSE) exec redis redis-cli

# Testes Docker
test-docker: ## Executar testes no container
	docker run --rm $(DOCKER_IMAGE) npm test

# Deploy e CI/CD
lint: ## Executar linting
	npx eslint . --ext .js --ignore-pattern node_modules/ || true

security-audit: ## Audit de segurança
	npm audit --audit-level=moderate

# Verificação de saúde
health: ## Verificar saúde da aplicação
	curl -f http://localhost:3000/api/health || echo "Aplicação não está a responder"

# Métricas e Monitorização
ps: ## Ver status dos containers
	$(DOCKER_COMPOSE) ps

stats: ## Ver estatísticas dos containers
	docker stats

# Quick deploy local
deploy-local: clean build up ## Deploy local completo

# Backup (se tiveres dados)
backup: ## Backup de volumes
	docker run --rm -v docker-cicd-app_redis-data:/data -v $(PWD):/backup alpine tar czf /backup/redis-backup.tar.gz -C /data .

# Restore backup
restore: ## Restaurar backup
	docker run --rm -v docker-cicd-app_redis-data:/data -v $(PWD):/backup alpine tar xzf /backup/redis-backup.tar.gz -C /data

# Informação do sistema
info: ## Informação do Docker
	@echo "=== Docker Info ==="
	docker --version
	docker-compose --version
	@echo ""
	@echo "=== Imagens Locais ==="
	docker images | grep $(APP_NAME) || echo "Nenhuma imagem encontrada"
	@echo ""
	@echo "=== Containers Ativos ==="
	docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"