# StudyHub API

Micro API para gerenciamento de referências de estudo, como livros, artigos, sites e outros materiais de apoio, com foco em organização.

## Objetivo

O objetivo deste projeto é disponibilizar uma API simples e consistente para cadastro e gestão de referências de estudo, permitindo:

- criar, consultar, atualizar e remover referências
- avaliar referências com notas de 1 a 5
- buscar referências por categoria, status, tags e nota
- servir como base inicial para evoluções futuras da aplicação.

## Escopo do MVP

Nesta primeira versão, o projeto foca em uma base funcional e leve para uso local, cobrindo:

- CRUD de referências
- filtros de busca
- avaliação por nota
- persistência local com SQLite

Os requisitos detalhados do MVP estão descritos em [requisitos.md](docs/requisitos.md).

## Stack Utilizada

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Nodemon

## Arquitetura do Projeto

A arquitetura escolhida foi a Arquitetura em Camadas pelos seguintes motivos:

- Separação clara de responsabilidades;
- Simplicidade para um MVP;
- Testabilidade;
- Escalabilidade evolutiva;
- Manutenção e legibilidade.

A estrutura inicial prevista para a API é a seguinte:

```text
.
├── docs/
├── prompts/
├── src/
├── prisma/            # Client do Prisma (instância singleton)
│   ├── routes/            # Definição das rotas Express
│   ├── middlewares/        # Middlewares de validação e tratamento de erros
│   ├── controllers/       # Recebe a requisição e devolve a resposta
│   ├── services/          # Regras de negócio
│   ├── repositories/      # Acesso a dados via Prisma
│   ├── schemas/           # Schemas de validação (Zod ou Joi)
│   ├── types/             # Interfaces e tipos TypeScript
│   ├── utils/             # Funções auxiliares
│   └── app.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Como Rodar Localmente

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js 20 ou superior
- npm 10 ou superior

### 1. Clonar o repositório

```bash
git clone https://github.com/naygomes/Study-Hub.git
cd studyHub
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Como o projeto utiliza Prisma com SQLite, gere o banco local com:

```bash
npx prisma migrate dev
```

Se necessário, também é possível abrir o Prisma Studio com:

```bash
npx prisma studio
```

### 4. Rodar a aplicação em modo desenvolvimento

```bash
npm run dev
```

A aplicação deverá iniciar localmente em uma porta definida no projeto, por exemplo:

```text
http://localhost:3000
```

### 5. Rodar a aplicação em modo produção

```bash
npm run build
npm start
```

## Scripts Esperados

Os scripts abaixo são os esperados para o projeto:

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Exemplo de Uso da API

### Criar uma referência

```http
POST /references
Content-Type: application/json
```

```json
{
  "title": "Clean Code",
  "description": "Livro sobre boas práticas de desenvolvimento",
  "author": "Robert C. Martin",
  "url": "https://example.com/clean-code",
  "category": "livro",
  "status": "pendente",
  "tags": ["arquitetura", "boas-praticas"],
  "rating": 5
}
```

### Buscar referências com filtros

```http
GET /references?category=livro&status=pendente&rating=5
```

## Roadmap de Releases

### v0.1.0

- estrutura inicial do projeto
- configuração com Node.js, TypeScript, Express e Jest
- integração com Prisma ORM e SQLite
- setup de ambiente de desenvolvimento com nodemon

### v0.2.0

- implementação do CRUD de referências
- modelagem inicial no Prisma
- validação básica de entrada
- respostas padronizadas da API

### v0.3.0

- filtros por categoria, status, tags e nota
- busca combinada
- melhoria da organização de rotas e serviços

### v0.4.0

- documentação da API
- testes automatizados das rotas principais
- refinamento de tratamento de erros
- preparação para evolução futura da aplicação

## Status do Projeto

Projeto em fase inicial de definição e estruturação do MVP.

## Próximos Passos

- inicializar o projeto Node.js com TypeScript
- configurar Express
- criar schema inicial do Prisma
- modelar a entidade de referência
- implementar rotas e regras de negócio do MVP

## Licença

Este projeto pode ser licenciado futuramente conforme a necessidade do contexto acadêmico.
