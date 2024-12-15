module.exports = {
  // Configurações para transformar o código JSX e TSX corretamente
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Transforma JS/TSX com Babel
  },
  // Mapeamento de módulos para mock de dependências
  moduleNameMapper: {
    '^react-router-dom$': require.resolve('react-router-dom'),
  },
  // Diretórios de configuração de testes
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // Ajusta o tempo de espera para as simulações e mocks
  testTimeout: 30000,
  // Usa o react-testing-library para todos os testes
  testEnvironment: 'jsdom',
  // Configura a cobertura de testes
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  // Configura a exibição de erro do Jest
  verbose: true,
};
