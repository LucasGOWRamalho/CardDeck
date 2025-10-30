# 🧪 Documentação de Testes - Sistema de Gerenciamento de Cartões

## 📋 Visão Geral

Este documento descreve a estrutura e implementação dos testes unitários para o sistema de gerenciamento de cartões, incluindo:

- Componentes React
- Contexto da aplicação
- APIs internas

---

## 🏗️ Estrutura de Arquivos

```
tests/
├── __mocks__/
│   ├── framer-motion.js
│   └── next-navigation.js
├── unit/
│   ├── components/
│   │   ├── AddCardButton.test.tsx
│   │   ├── AddTransaction.test.tsx
│   │   ├── CardBack.test.tsx
│   │   ├── CardFormBack.test.tsx
│   │   ├── CardFormFront.test.tsx
│   │   ├── CardFront.test.tsx
│   │   └── Wallet.test.tsx
│   ├── context/
│   │   └── CardContext.test.tsx
│   └── lib/
│       └── api.test.ts
├── jest.config.js
├── jest.setup.js
└── [imagem da estrutura]
```

---

## ⚙️ Passo a Passo de Instalação e Configuração

### 1️⃣ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- Projeto React (Next.js ou Vite)

Verifique as versões com:

```bash
node -v
npm -v
```

### 2️⃣ Instalar Dependências de Teste

```bash
cd carddeck
cd frontend
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest jest-environment-jsdom
```

Se estiver usando TypeScript:

```bash
npm install --save-dev ts-jest @types/jest
```

### 3️⃣ Configuração do Jest (`jest.config.js`)

```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### 4️⃣ Configuração Global (`jest.setup.js`)

```js
import '@testing-library/jest-dom';

// Mock do Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock do Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
}));
```

---

## 🧩 Estrutura dos Testes

### 1. `AddCardButton.test.tsx`
- Testa o botão de adicionar cartão
- Verifica:
  - Renderização com ícone
  - Exibição de tooltip
  - Estilização CSS

### 2. `CardFront.test.tsx`
- Testa o componente de frente do cartão
- Verifica:
  - Renderização com dados fornecidos
  - Valores padrão
  - Formatação do número do cartão

### 3. `CardBack.test.tsx`
- Testa o verso do cartão
- Verifica:
  - Renderização de CPF e data de nascimento
  - Formatação e valores padrão

### 4. `CardFormFront.test.tsx`
- Testa o formulário da frente
- Verifica:
  - Campos obrigatórios (nome, número, banco, bandeira)
  - Navegação para próxima etapa

### 5. `CardFormBack.test.tsx`
- Testa o formulário do verso
- Verifica:
  - Campos: validade, CVV, CPF
  - Integração com contexto
  - Submissão correta

### 6. `AddTransaction.test.tsx`
- Testa o modal de adicionar transação
- Verifica:
  - Renderização e campos
  - Ações de envio e cancelamento

### 7. `Wallet.test.tsx`
- Testa o componente de carteira
- Verifica:
  - Contagem de cartões
  - Comportamento de toggle
  - Listagem correta

---

## 🧠 Testes de Contexto (`CardContext.test.tsx`)

Testa operações CRUD e estados de carregamento:

```ts
const mockCards: Card[] = [
  {
    id: '1',
    holderName: 'João Silva',
    number: '1234567812345678',
    validThru: '12/25',
    cvv: '123',
    brand: 'Visa',
    bank: 'Banco Teste',
    balance: 1000,
    creditLimit: 5000,
    availableLimit: 5000,
    transactions: []
  },
];
```

---

## 🌐 Testes de API (`api.test.ts`)

Testa endpoints e respostas mockadas:

```ts
const mockResponse = (data: any, ok = true) => ({
  ok,
  json: async () => data,
});
```

---

## 🎯 Padrões de Teste

### 1. Mocking Consistente
- APIs externas mockadas com Jest
- Contextos providos via wrapper
- Dados padronizados

### 2. Cleanup Automático
```ts
afterEach(() => {
  jest.clearAllMocks();
});
```

### 3. Testes Assíncronos
```ts
await act(async () => {
  await result.current.loadCards();
});
```

### 4. Verificações de Renderização
- Presença de elementos
- Textos e placeholders
- Chamadas de callback

### 5. Cobertura de Casos
- Dados válidos e inválidos
- Estados de loading e erro
- Interações do usuário

---

## 📊 Métricas de Qualidade

| Métrica     | Valor mínimo |
|--------------|--------------|
| Branches     | 70% |
| Functions    | 70% |
| Lines        | 70% |
| Statements   | 70% |

Ambiente: **JSDOM**  
Ferramentas: **Jest + Testing Library**

---

## 🚀 Como Executar os Testes

### Rodar todos os testes
```bash
npm test
```

### Rodar com cobertura
```bash
npm run test -- --coverage
```

### Rodar um teste específico
```bash
npm test -- CardFront.test.tsx
```

---

## 🔄 Fluxo de Desenvolvimento

1. **Desenvolvimento** → Implementar funcionalidade  
2. **Criação de Testes** → Adicionar testes unitários  
3. **Validação** → Executar suite de testes  
4. **Cobertura** → Verificar métricas  
5. **Refatoração** → Ajustar e manter atualizado
