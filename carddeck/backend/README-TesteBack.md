# 🧪 Documentação dos Testes Unitários - Backend CardDeck

## 🌐 Link do Backend
[https://carddeck-backend.onrender.com](https://carddeck-backend.onrender.com)

## ⚙️ Pré-Requisitos para Rodar

```bash
cd carddeck
cd backend
npm install uuid@8.3.2
npm install --save-dev @types/uuid@8.3.4
```

---

## 📋 Índice
1. [Visão Geral](#-visão-geral)  
2. [Estrutura de Testes](#-estrutura-de-testes)  
3. [Testes por Módulo](#-testes-por-módulo)  
4. [Como Executar](#-como-executar)  
5. [Cobertura de Testes](#-cobertura-de-testes)  
6. [Padrões e Boas Práticas](#-padrões-e-boas-práticas)  
7. [Configuração Técnica](#-configuração-técnica)  

---

## 🎯 Visão Geral
O backend do **CardDeck** possui uma suíte completa de testes unitários que garante a qualidade e confiabilidade do sistema de gerenciamento de cartões e transações.

### Tecnologias Utilizadas
- **Jest:** Framework de testes  
- **NestJS Testing:** Utilitários específicos do NestJS  
- **TypeScript:** Linguagem base  

---

## 🏗️ Estrutura de Testes

```
src/
├── app.controller.spec.ts          # Testes do controlador principal
├── app.service.spec.ts             # Testes do serviço principal
├── cards/
│   ├── cards.controller.spec.ts    # Testes do controlador de cartões
│   └── cards.service.spec.ts       # Testes do serviço de cartões
```

---

## 📊 Testes por Módulo

### 1. AppController (`app.controller.spec.ts`)
**Objetivo:** Testar o endpoint raiz da aplicação.

**Casos de Teste**
- ✅ Deve retornar "Hello World!" quando chamado  
- ✅ Deve chamar o método `getHello` do AppService  

**Cobertura**
- Controlador principal  
- Injeção de dependências  
- Mock de serviços  

**Código Principal**
```typescript
describe('root', () => {
  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
    expect(appService.getHello).toHaveBeenCalled();
  });
});
```

---

### 2. AppService (`app.service.spec.ts`)
**Objetivo:** Testar a lógica de negócio do serviço principal.

**Casos de Teste**
- ✅ Deve estar definido  
- ✅ Deve retornar "Hello World!"  
- ✅ Deve sempre retornar a mesma mensagem  
- ✅ Deve retornar tipo string  

**Cobertura**
- Métodos do serviço  
- Consistência de retornos  
- Tipagem TypeScript  

**Código Principal**
```typescript
describe('getHello', () => {
  it('should return "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });
  
  it('should always return the same message', () => {
    const result1 = service.getHello();
    const result2 = service.getHello();
    const result3 = service.getHello();
  });
});
```

---

### 3. CardsController (`cards.controller.spec.ts`)
**Objetivo:** Testar todos os endpoints da API de cartões.

**Funcionalidades Testadas**
- ✅ Criação de cartões (Visa e Elo)
- ✅ Listagem de cartões
- ✅ Busca por ID
- ✅ Remoção de cartões
- ✅ Adição de transações (crédito e débito)
- ✅ Listagem de transações

**Mock Setup**
```typescript
const mockCardsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  addTransaction: jest.fn(),
  getTransactions: jest.fn()
};
```

---

### 4. CardsService (`cards.service.spec.ts`)
**Objetivo:** Testar a lógica de negócio e manipulação de dados dos cartões.

**Funcionalidades Testadas**
- ✅ Criação de cartões com propriedades corretas  
- ✅ Geração de IDs únicos  
- ✅ Gestão de múltiplos cartões  
- ✅ Busca e remoção de cartões  
- ✅ Transações de crédito e débito  
- ✅ Atualização de limites e saldos  
- ✅ Gestão de transações  

---

## 🚀 Como Executar

### Comandos Disponíveis
```bash
npm test
npm run test:watch
npm run test:cov
npm test -- cards.controller.spec.ts
npm test -- cards.controller.spec.ts -t "should return multiple transactions"
```

---

## 📈 Cobertura de Testes

**Métricas Alcançadas**
- AppController: **100%**
- AppService: **100%**
- CardsController: **~95%**
- CardsService: **~90%**

---

## 🏆 Padrões e Boas Práticas

### Arrange-Act-Assert
```typescript
it('should add credit transaction', () => {
  const card = service.create(createCardDto);
  const transactionData = { ... };
  const result = service.addTransaction(card.id, transactionData);
  expect(result.transactions).toHaveLength(1);
  expect(result.availableLimit).toBe(900);
});
```

---

## 🔧 Configuração Técnica

### Jest Configuration
```javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\.spec\.ts$',
  transform: {
    '^.+\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
```

### Dependências de Desenvolvimento
```json
{
  "@types/jest": "^29.0.0",
  "jest": "^29.0.0",
  "ts-jest": "^29.0.0"
}
```
