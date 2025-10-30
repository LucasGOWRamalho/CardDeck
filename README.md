# 📚 Documentação Completa - Sistema CardDeck

## 🎯 Visão Geral do Projeto
O **CardDeck** é um sistema completo de gerenciamento de cartões de crédito/débito que permite aos usuários:

✅ Cadastrar e visualizar cartões com interface 3D animada  
✅ Gerenciar transações financeiras (crédito e débito)  
✅ Controlar limites e saldos em tempo real  
✅ Acompanhar histórico de movimentações  

---

## 🏗️ Arquitetura do Sistema

### Frontend (Next.js + TypeScript)
🔗 **Deploy:** [https://card-deck-brown.vercel.app/](https://card-deck-brown.vercel.app/)

#### O que faz:
- Interface moderna com animações 3D usando **Framer Motion**
- Formulários multi-step para cadastro de cartões
- Visualização em tempo real dos dados financeiros
- Gestão de estado global com **Context API**
- Design responsivo com **Tailwind CSS**

#### Tecnologias principais:
- ⚛️ Next.js 16.0.1 + React 19.2.0  
- 🎨 Tailwind CSS 4  
- 🔄 Framer Motion (animações)  
- 📝 TypeScript  
- 🧪 Jest + Testing Library  

---

### Backend (NestJS + TypeScript)
🔗 **Deploy:** [https://carddeck-backend.onrender.com](https://carddeck-backend.onrender.com)

#### O que faz:
- API RESTful para gestão completa de cartões e transações
- CRUD completo de cartões (criar, listar, buscar, deletar)
- Sistema de transações financeiras com controle de limites
- Validações de negócio e consistência de dados

#### Tecnologias principais:
- 🏗️ NestJS 11.0.1  
- 📝 TypeScript  
- 🆔 UUID para identificadores únicos  
- 🧪 Jest para testes unitários  
- ☁️ Render (hospedagem)  

---

## 📥 O que Baixar e Instalar

### Pré-requisitos
- Node.js 18+  
- npm ou yarn  
- Git  

### Para o Frontend (Next.js)
```bash
# Clonar o projeto
git clone https://github.com/LucasGOWRamalho/CardDeck.git
cd carddeck/frontend

# Instalar dependências
npm install

# Instalar dependências de teste (se necessário)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Executar em desenvolvimento
npm run dev
```

### Para o Backend (NestJS)
```bash
# Navegar para backend
cd carddeck/backend

# Instalar dependências
npm install

# Instalar UUID (necessário)
npm install uuid@8.3.2
npm install --save-dev @types/uuid@8.3.4

# Executar em desenvolvimento
npm run start:dev
```

---

## 🚀 Funcionalidades Principais

### Frontend
🎴 Dashboard Interativo - Visão geral da carteira de cartões  
📝 Cadastro de Cartões - Formulário com validação em tempo real  
🔄 Visualização 3D - Animação de flip entre frente e verso do cartão  
💳 Gestão de Transações - Adição de crédito/débito com atualização automática  
🗑️ Exclusão Segura - Confirmação com verificação de dados  

### Backend
🃏 CRUD de Cartões - Criar, listar, buscar e excluir cartões  
💰 Sistema de Transações - Registrar movimentações financeiras  
📊 Controle de Limites - Cálculo automático de limite disponível  
🔐 Validações - Verificações de consistência e regras de negócio  

---

## 🔄 Fluxo de Funcionamento
```text
Usuário → Frontend (Next.js) → API Requests → Backend (NestJS) → Resposta → Atualização UI
```

### Exemplo - Cadastro de Cartão:
1. Usuário preenche formulário no frontend  
2. Frontend valida dados localmente  
3. Request POST para `/cards` no backend  
4. Backend cria cartão com ID único  
5. Frontend recebe resposta e atualiza interface  
6. Cartão aparece na carteira com animação  

---

## 🧪 Testes e Qualidade

### Frontend
```bash
cd frontend
npm test              # Executar testes
npm run test:coverage 
```
**Cobertura:** +70% (branches, functions, lines, statements)

### Backend
```bash
cd backend
npm test
```
**Cobertura:** +90% nos serviços principais

---

## 🌐 Endpoints da API (Backend)
| Método | Endpoint | Descrição |
|--------|-----------|-----------|
| GET | / | Status da API |
| POST | /cards | Criar cartão |
| GET | /cards | Listar todos cartões |
| GET | /cards/:id | Buscar cartão específico |
| DELETE | /cards/:id | Excluir cartão |
| POST | /cards/:id/transactions | Adicionar transação |
| GET | /cards/:id/transactions | Listar transações |

---

## 🛠️ Estrutura de Desenvolvimento

### Frontend
```text
frontend/
├── src/app/                 # Páginas (App Router)
├── src/components/          # Componentes reutilizáveis
├── src/context/             # Gerenciamento de estado
├── src/lib/                 # APIs e utilitários
└── tests/                   # Suíte de testes
```

### Backend
```text
backend/
├── src/cards/               # Módulo de cartões
├── entities/                # Entidades do sistema
├── dto/                     # Objetos de transferência
└── *.spec.ts                # Testes unitários
```

---

## 📞 Links de Produção
🌐 **Frontend:** [https://card-deck-brown.vercel.app/](https://card-deck-brown.vercel.app/)  
🔧 **Backend:** [https://carddeck-backend.onrender.com](https://carddeck-backend.onrender.com)
