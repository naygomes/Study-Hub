# Prompts para Copilot utilizando o modelo Claude Sonnet 4.6

## Prompt 1 - .gitignore

> **Contexto:** API utilizando Express com Prisma ORM e SQLite para banco de dados e Jest para testes unitários<br>
> **Objetivo:** Criação de arquivo gitignore, com as pastas e arquivos que não devem ir para o repositório GitHub, principalmente para garantirmos a segurança de dados e credenciais.<br>
> **Resposta**: Arquivo gitignore completo para o projeto, separadas por um comentário que entitula o escopo dos arquivos. <br>

## Prompt 2 - configuração do projeto (Typescript, Express e Nodemon)

> **Contexto:** API utilizando Express com Prisma ORM e SQLite para banco de dados e Jest para testes unitários<br>
> **Objetivo:** Configuração do projeto node.js com Typescript e Express, adicionando o pacote Nodemon para hot reload do projeto em ambiente de desenvolvimento.<br>
> **Resposta**: Arquivo package.json configurado corrretamente com as dependencias e scripts necessários, além de arquivo tsconfig.json. No arquivo tsconfig.json, adicione também o path alias para cada pasta presente no projeto. <br>

## Prompt 3 - configuração Jest

> **Contexto:** API com arquitetura em camadas, utilizando Express com Prisma ORM e SQLite para banco de dados e Jest para testes unitários<br>
> **Objetivo:** Configuração do Jest no projeto node.js com typescript e express para que qualquer teste seja executado com sucesso.<br>
> **Resposta**: Arquivo de configuração jest completo e um arquivo de testes para garantir que a configuração está correta. <br>

## Prompt 3 - Arquivo App.ts

> **Contexto:** API com arquitetura em camadas, utilizando Express com Prisma ORM e SQLite para banco de dados e Jest para testes unitários<br>
> **Objetivo:** Gerar arquivo app.ts com rota que permite inicializar o servidor e verifica a saúde da aplicação.<br>
> **Estilo:** Arquivo Typescript simples e direto. <br>
> **Resposta**: Arquivo app.ts com inicialização do servidor Node.js com Express, rota /health que verifica saúde do servidor e mensagem de feedback indicando ao usuário que o servidor foi inicializado. <br>

## Prompt 4 - Configuração Prisma/SQLite

> **Contexto:** API REST com arquitetura em camadas (Routes → Middlewares → Controllers → Services → Repositories), construída com Node.js, TypeScript e Express. O projeto utiliza Prisma ORM como camada de acesso ao banco de dados e SQLite como banco de dados local. O arquivo schema.prisma ainda não foi configurado e o banco ainda não foi gerado.<br>
> **Objetivo:** Gerar as configurações necessárias para a integração inicial do Prisma com SQLite no projeto: arquivo schema.prisma com provider SQLite e model de exemplo, arquivo prisma.ts para instanciar e exportar o PrismaClient como singleton, e a variável DATABASE_URL necessária no .env.<br>
> **Estilo:** Código TypeScript simples, direto e sem abstrações desnecessárias. Seguir o padrão já adotado no projeto.<br>
> **Resposta:** Fornecer o arquivo prisma/schema.prisma, o arquivo src/lib/prisma.ts com o singleton do PrismaClient, e o trecho a adicionar no .env. Incluir também o comando para gerar o banco após a configuração.<br>

## Prompt 5 - Modelagem inicial Prisma

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar a modelagem completa do banco de dados utilizando Prisma ORM (com SQLite) e as definições de modelos em TypeScript. A entidade principal é Referencia (Recursos/Links). Além disso, inclua campos para controle de status (Pendente, Lendo, Concluído e revisar) e um campo tag, que salvara um array de tags.<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code, utilizar tipagem forte com TypeScript e seguir as convenções de nomes (camelCase para campos, PascalCase para modelos).<br>
> **Resposta:** Atualizar o arquivo prisma/schema.prisma se necessário, gerar um arquivo de seed básico que popula o banco de dados e, os modelos (Interfaces/Types) em TypeScript que reflitam esse esquema para uso nos serviços e incluir também o comando para gerar o banco após a configuração.<br>
