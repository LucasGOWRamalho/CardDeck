# 💳 Documentação do Sistema CardDeck - Frontend

## 📋 Visão Geral

O **CardDeck** é uma aplicação web para gerenciamento de cartões de crédito e débito, desenvolvida em **Next.js** com **TypeScript**.  
O sistema permite cadastrar cartões, visualizar detalhes, adicionar transações e gerenciar informações financeiras.

---

## 🏗️ Arquitetura do Projeto

```
frontend/
├── src/
│   ├── app/                    # Páginas da aplicação (App Router)
│   │   ├── card/              # Página de cadastro de cartão
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   ├── context/               # Context API
│   ├── lib/                   # Utilitários e APIs
│   └── types/                 # Definições TypeScript
├── tests/                     # Testes unitários
└── public/                    # Arquivos estáticos
```

---

## 🎯 Páginas Principais

### 1. Página Inicial (`/ - page.tsx`)
**Funcionalidades:**
- Dashboard principal com visão geral da carteira  
- Botão para adicionar novos cartões  
- Integração com Wallet para listagem de cartões  
- Navegação para detalhes do cartão

**Componentes Utilizados:**
- `Wallet` — Lista de cartões  
- `AddCardButton` — Botão de adição  
- `CardDetails` — Detalhes do cartão selecionado

---

### 2. Página de Cadastro (`/card - card/page.tsx`)
**Funcionalidades:**
- Formulário multi-step para cadastro de cartões  
- Visualização 3D do cartão com animação de flip  
- Validação de dados em tempo real

**Componentes Utilizados:**
- `Card3D` — Visualização do cartão  
- `CardFormFront` — Formulário da frente  
- `CardFormBack` — Formulário do verso

---

## 🧩 Componentes Principais

### 1. Wallet (`Wallet.tsx`)
Gerencia e exibe a lista de cartões.  
Usa **Framer Motion** para animações 3D.

### 2. CardDetails (`CardDetails.tsx`)
Exibe informações detalhadas do cartão e histórico de transações.

### 3. Card3D (`Card3D.tsx`)
Visualização animada do cartão com flip entre frente e verso.

### 4. Formulários (`CardFormFront.tsx`, `CardFormBack.tsx`)
Validações implementadas para titular, número, validade, CVV e CPF.

### 5. AddTransaction (`AddTransaction.tsx`)
Modal para adicionar transações com validações de valor e data.

### 6. DeleteCardModal (`DeleteCardModal.tsx`)
Confirmação segura para exclusão com verificação dos últimos 4 dígitos.

---

## 🔄 Gerenciamento de Estado

`CardContext.tsx` — controle global dos cartões.

```typescript
interface CardContextType {
  cards: Card[];
  addCard: (cardData) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  loadCards: () => Promise<void>;
  loading: boolean;
  error: string | null;
}
```

---

## 🌐 Integração com API

```typescript
const API_BASE_URL = 'https://carddeck-backend.onrender.com';
```

### Endpoints
- `GET /cards` — Listar cartões  
- `POST /cards` — Criar cartão  
- `DELETE /cards/:id` — Excluir cartão  
- `POST /cards/:id/transactions` — Adicionar transação  
- `GET /cards/:id/transactions` — Listar transações

---

## 🎨 Sistema de Design

**Cores principais:**
- Azul: `from-blue-600 to-indigo-700`
- Âmbar: `from-amber-900 to-amber-700`
- Verde: `bg-green-600`
- Vermelho: `bg-red-600`

**Animações:** Framer Motion  
**Responsividade:** Mobile-first (Tailwind breakpoints)

---

## 🔒 Validações e Segurança

- Validação de número, data, CPF e CVV  
- Confirmação de exclusão com últimos 4 dígitos  
- Feedback visual e retries automáticos em falhas

---

## 🧪 Testabilidade

Exemplo:
```typescript
describe('CardFormFront', () => {
  it('should render all form fields', () => {});
  it('should submit form with valid data', () => {});
});
```

Mocks configurados para:
- Next.js Navigation  
- Framer Motion  
- API Fetch

---

## 🚀 Funcionalidades Avançadas

- Persistência em backend com cache local  
- Animações 3D e busca em tempo real  
- Gestão financeira com limites e histórico  

---

## 📊 Métricas e Performance

- Cobertura de testes: **70%+**
- Tipagem TypeScript: **100%**
- Acessibilidade e SEO otimizados

---

## 🔄 Fluxos de Usuário

### 1. Cadastro de Cartão
```
Página Inicial → AddCardButton → CardPage (FormFront → FormBack) → Confirmação → Página Inicial
```

### 2. Visualização de Detalhes
```
Página Inicial → Wallet → Card Click → CardDetails → Back to Wallet
```

### 3. Adição de Transação
```
CardDetails → AddTransaction → Modal → Validação → Atualização em Tempo Real
```

### 4. Exclusão de Cartão
```
Wallet → Hover Card → Delete → Confirmação → Atualização da Lista
```

---

## 🌍 Como Acessar

🔗 **Versão Online:** [https://card-deck-brown.vercel.app/](https://card-deck-brown.vercel.app/)

---

## 🧭 Como Rodar Localmente

```bash
# Clonar o projeto
git clone https://github.com/seuusuario/carddeck.git

# Entrar na pasta do frontend
cd carddeck
cd frontend

# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.
