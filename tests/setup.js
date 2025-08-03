// Setup global para testes
console.log('🧪 Configurando ambiente de testes...');

// Configurar variáveis de ambiente para testes
process.env.NODE_ENV = 'test';
process.env.PORT = '0'; // Porta aleatória para testes

// Timeout global para operações assíncronas
jest.setTimeout(10000);

// Mock de console.log para testes mais limpos (opcional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

// Setup antes de cada teste
beforeEach(() => {
  // Reset de mocks se necessário
  jest.clearAllMocks();
});

// Cleanup após cada teste
afterEach(() => {
  // Cleanup de recursos se necessário
});

// Setup global antes de todos os testes
beforeAll(async () => {
  console.log('🚀 Iniciando suite de testes...');
});

// Cleanup global após todos os testes
afterAll(async () => {
  console.log('✅ Testes concluídos!');
});

// Matchers customizados (opcional)
expect.extend({
  toBeValidEmail(received) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);
    
    if (pass) {
      return {
        message: () => `esperava que ${received} não fosse um email válido`,
        pass: true,
      };
    } else {
      return {
        message: () => `esperava que ${received} fosse um email válido`,
        pass: false,
      };
    }
  },
});

// Configurações globais para fetch (se usar fetch nos testes)
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}