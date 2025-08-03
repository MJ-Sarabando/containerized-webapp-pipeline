# Multi-stage build para otimizar imagem final
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências (incluindo dev dependencies para build)
RUN npm ci --only=production && npm cache clean --force

# Imagem final
FROM node:18-alpine

# Criar utilizador não-root por segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências da fase de build
COPY --from=builder /app/node_modules ./node_modules

# Copiar código da aplicação
COPY --chown=nodejs:nodejs . .

# Criar diretório público se não existir
RUN mkdir -p public && chown -R nodejs:nodejs /app

# Mudar para utilizador não-root
USER nodejs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { \
        if (res.statusCode === 200) { \
            console.log('Health check passed'); \
            process.exit(0); \
        } else { \
            console.log('Health check failed'); \
            process.exit(1); \
        } \
    }).on('error', () => { \
        console.log('Health check error'); \
        process.exit(1); \
    })"

# Comando para iniciar aplicação
CMD ["npm", "start"]