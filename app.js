const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir ficheiros estáticos
app.use(express.static('public'));
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API simples para demonstrar funcionalidade
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'João Silva', email: 'joao@exemplo.com' },
        { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com' },
        { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com' }
    ];
    res.json(users);
});

// Função para somar (para demonstrar testes)
function soma(a, b) {
    return a + b;
}

// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Exportar para testes
module.exports = { app, soma, validarEmail };

// Iniciar servidor apenas se não estivermos em modo de teste
if (require.main === module) {
    app.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Servidor a correr em http://localhost:${port}`);
        console.log(`📊 Health check: http://localhost:${port}/api/health`);
        console.log(`👥 API Users: http://localhost:${port}/api/users`);
    });
}