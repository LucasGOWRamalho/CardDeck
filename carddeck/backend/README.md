# 📘 Documentação do Backend - CardDeck

## 🌐 Link do Deploy
[https://carddeck-backend.onrender.com](https://carddeck-backend.onrender.com)

---

## 🧩 Visão Geral
O **CardDeck Backend** é responsável pelo gerenciamento completo de cartões e transações financeiras, oferecendo uma API RESTful desenvolvida com **NestJS** e **TypeScript**.

A aplicação inclui módulos para controle de cartões, criação de transações, e consultas de saldo e limite.

---

## ⚙️ Tecnologias Utilizadas
- **NestJS** – Framework Node.js para backend escalável e modular  
- **TypeScript** – Tipagem estática e segurança no desenvolvimento  
- **UUID** – Geração de identificadores únicos  
- **Jest** – Testes unitários  
- **Render** – Hospedagem do backend  

---

## 🧱 Estrutura do Projeto

```
src/
├── app.controller.ts        # Controlador principal
├── app.module.ts            # Módulo raiz do aplicativo
├── app.service.ts           # Serviço principal
├── cards/
│   ├── cards.controller.ts  # Controlador do módulo de cartões
│   ├── cards.module.ts      # Módulo de cartões
│   ├── cards.service.ts     # Serviço de cartões
│   ├── card.entity.ts       # Entidade de cartão
│   └── dto/
│       └── create-card.dto.ts # DTO de criação de cartão
└── main.ts                  # Ponto de entrada da aplicação
```

---

## 🚀 Instalação e Execução

### 1️⃣ Clonar o Projeto
```bash
git clone <url-do-repositório>
cd carddeck/backend
```

### 2️⃣ Instalar Dependências
```bash
npm install
npm install uuid@8.3.2
npm install --save-dev @types/uuid@8.3.4
```

### 3️⃣ Rodar o Servidor
```bash
npm run start:dev
```
A API estará disponível em:  
👉 **http://localhost:3000**  
ou no ambiente de produção:  
👉 **https://carddeck-backend.onrender.com**

---

## 🧠 Endpoints Principais

### **GET /**  
Retorna mensagem padrão de status.  
**Resposta:**
```json
{ "message": "Hello World!" }
```

---

### **POST /cards**
Cria um novo cartão.  
**Body:**
```json
{
  "holderName": "João Silva",
  "brand": "Visa",
  "creditLimit": 1000
}
```
**Resposta:**
```json
{
  "id": "a1b2c3d4",
  "holderName": "João Silva",
  "brand": "Visa",
  "creditLimit": 1000,
  "availableLimit": 1000,
  "transactions": []
}
```

---

### **GET /cards**
Lista todos os cartões criados.  

---

### **GET /cards/:id**
Retorna um cartão específico com base no ID.  

---

### **DELETE /cards/:id**
Remove um cartão específico.  

---

### **POST /cards/:id/transactions**
Adiciona uma transação (crédito ou débito).  
**Body:**
```json
{
  "type": "credit",
  "amount": 100
}
```
**Resposta:**
```json
{
  "message": "Transação registrada com sucesso!",
  "card": { ... }
}
```

---

### **GET /cards/:id/transactions**
Lista todas as transações de um cartão específico.  

---

## 🧮 Entidades Principais

### CardEntity (`card.entity.ts`)
Representa um cartão e suas transações.

**Propriedades:**
- `id: string`
- `holderName: string`
- `brand: string`
- `creditLimit: number`
- `availableLimit: number`
- `transactions: Transaction[]`

---

## 🧰 DTOs

### CreateCardDto (`create-card.dto.ts`)
Define o formato de dados para criação de um cartão.

**Campos obrigatórios:**
- `holderName: string`
- `brand: string`
- `creditLimit: number`

---

## 🧪 Testes
A suíte de testes está documentada separadamente em:  
📄 `testes-backend-carddeck.md`  

Para rodar os testes:
```bash
npm test
```

---

## 🏁 Deploy
O backend está hospedado no **Render**, acessível em:  
🔗 [https://carddeck-backend.onrender.com](https://carddeck-backend.onrender.com)

---

## 👨‍💻 Autor
**CardDeck API** – Desenvolvido com NestJS e TypeScript.
