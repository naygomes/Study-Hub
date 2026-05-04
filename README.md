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
- yarn 1.22 ou superior

### 1. Clonar o repositório

```bash
git clone https://github.com/naygomes/Study-Hub.git
cd studyHub
```

### 2. Instalar as dependências

```bash
yarn install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com base no .env.example:

```bash
cp .env.example .env
```

Preencha o arquivo .env com os valores abaixo:

```bash
PORT=3000
DATABASE_URL="file:./dev.db"
```

### 4. Configurar o banco de dados

Como o projeto utiliza Prisma com SQLite, gere o banco local com:

```bash
yarn prisma:prod
```

Para popular o banco com um seed básico:

```bash
yarn prisma:seed
```

Se necessário, também é possível abrir o Prisma Studio com:

```bash
yarn prisma:studio
```

### 5. Rodar a aplicação em modo desenvolvimento

```bash
yarn dev
```

### 6. Rodar a aplicação em modo produção

```bash
yarn build
yarn start
```

A API ficará disponível em:

```text
http://localhost:3000/api/v1/references
```

## Como executar testes unitários

```bash
yarn test
```

Para visualizar a cobertura de testes:

```bash
yarn test:coverage
```

## Scripts Esperados

Os scripts abaixo são os esperados para o projeto:

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node -r tsconfig-paths/register src/app.ts",
    "build": "tsc && tsc-alias",
    "start": "node dist/src/app.js",
    "prisma:dev": "prisma migrate dev",
    "prisma:prod": "prisma migrate deploy",
    "prisma:seed": "prisma db seed",
    "prisma:studio": "prisma studio",
    "test": "jest",
    "test:coverage": "jest --coverage"
  }
}
```

## Exemplo de Uso da API

### Criar uma referência

```http
POST /api/v1/references
Content-Type: application/json
```

```json
{
  "title": "Clean Code",
  "description": "Livro sobre boas práticas de desenvolvimento",
  "author": "Robert C. Martin",
  "url": "https://example.com/clean-code",
  "category": "livro",
  "status": "pending",
  "tags": ["arquitetura", "boas-praticas"],
  "rating": 5
}
```

### Buscar referências com filtros

```http
GET  /api/v1/references?category=livro&status=pending
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
- validação de entrada
- respostas padronizadas da API
- tratamento de erros
- filtros por categoria, status e tag
- busca combinada

### v0.3.0

- melhoria da organização de rotas e serviços
- ajustes finos nas camadas da arquitetura
- documentação da API

### v0.4.0

- testes automatizados das rotas principais
- preparação para evolução futura da aplicação

## Status do Projeto

Projeto em fase inicial de definição e estruturação do MVP.

## Próximos Passos

- Escrita de testes unitários automatizados com Jest;
- Adicionar paginação na rota GET /references;
- Criar rota de atualização de status;
- Hospedar API em um Docker container;
- Criar interface frontend para consumir a API.

## Uso de IA durante o desenvolvimento

A Inteligência Artificial foi utilizada de forma transversal em todas as etapas do ciclo de vida deste projeto, desde o levantamento de requisitos até a codificação, testes e refatoração. Como apoio principal, foi utilizado o GitHub Copilot integrado à IDE VS Code, ferramenta que se mostrou relevante por reunir recursos que aumentam a produtividade e a qualidade do desenvolvimento, como sugestões de código em tempo real, suporte ao envio de arquivos ao chat para ampliação de contexto, uso de diferentes modelos de linguagem e geração automática de mensagens de commit com base nas alterações realizadas.

Em relação aos modelos utilizados, o GPT-5.4 foi empregado nas etapas de requisitos e documentação, contribuindo para a estruturação textual e organização das definições do projeto. O Claude Opus 4.6 foi utilizado na definição da arquitetura, auxiliando na análise e proposição de uma estrutura simples, limpa e escalável para o MVP. Já o Claude Sonnet 4.6 foi adotado nas demais etapas do desenvolvimento, especialmente na codificação, elaboração de testes e atividades de refatoração. Dessa forma, a IA atuou como apoio contínuo ao processo de desenvolvimento, contribuindo para maior agilidade, consistência e qualidade técnica nas entregas.

## Licença

Este projeto pode ser licenciado futuramente conforme a necessidade do contexto acadêmico.
