const request = require('supertest');
const { app, soma, validarEmail } = require('../app');

describe('🧪 Testes da Aplicação', () => {
  
  // Testes de funções utilitárias
  describe('Funções Utilitárias', () => {
    
    test('soma deve somar dois números corretamente', () => {
      expect(soma(2, 3)).toBe(5);
      expect(soma(-1, 1)).toBe(0);
      expect(soma(0, 0)).toBe(0);
    });

    test('validarEmail deve validar emails corretamente', () => {
      expect(validarEmail('teste@exemplo.com')).toBe(true);
      expect(validarEmail('usuario@dominio.pt')).toBe(true);
      expect(validarEmail('email-invalido')).toBe(false);
      expect(validarEmail('sem@dominio')).toBe(false);
      expect(validarEmail('')).toBe(false);
    });
  });

  // Testes das rotas da API
  describe('Rotas da API', () => {
    
    test('GET / deve retornar página principal', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });

    test('GET /api/health deve retornar status OK', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });

    test('GET /api/users deve retornar lista de utilizadores', async () => {
      const response = await request(app).get('/api/users');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3);
      
      // Verificar estrutura do primeiro utilizador
      const firstUser = response.body[0];
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('email');
    });

    test('Rota inexistente deve retornar 404', async () => {
      const response = await request(app).get('/api/rota-inexistente');
      expect(response.status).toBe(404);
    });
  });

  // Testes de integração
  describe('Testes de Integração', () => {
    
    test('API deve responder com JSON válido', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.headers['content-type']).toMatch(/json/);
      expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    test('Timestamp na health check deve ser válido', async () => {
      const response = await request(app).get('/api/health');
      const timestamp = new Date(response.body.timestamp);
      
      expect(timestamp).toBeInstanceOf(Date);
      expect(isNaN(timestamp.getTime())).toBe(false);
    });
  });

  // Testes de performance básicos
  describe('Testes de Performance', () => {
    
    test('API health deve responder rapidamente', async () => {
      const start = Date.now();
      const response = await request(app).get('/api/health');
      const duration = Date.now() - start;
      
      expect(response.status).toBe(200);
      expect(duration).toBeLessThan(1000); // Menos de 1 segundo
    });

    test('API users deve responder rapidamente', async () => {
      const start = Date.now();
      const response = await request(app).get('/api/users');
      const duration = Date.now() - start;
      
      expect(response.status).toBe(200);
      expect(duration).toBeLessThan(1000); // Menos de 1 segundo
    });
  });
});