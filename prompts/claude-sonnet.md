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

## Prompt 5 - Repository de Referências

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar a camada de repository completa que faz a busca dos dados no banco, contendo todos os métodos da CRUD, além do método que registra uma nota de avaliação e a possibilidade de fazer uma busca das referencias com filtro por tag, categoria e status<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code utilizando express, utilizar tipagem forte com TypeScript e seguir as convenções de nomes (PascalCase para modelos).<br>
> **Resposta:** Criar o arquivo ReferenceRepository com os metodos de consulta ao banco de dados<br>

## Prompt 6 - Service de Referências

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar a camada de services completa que se conecta ao repository e contém todas as regras de negócio contida no arquivo de requisitos para cada método da CRUD<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code utilizando express, utilizar tipagem forte com TypeScript e seguir as convenções de nomes (PascalCase para services).<br>
> **Resposta:** Criar o arquivo ReferenceService com um método para cada respectivo método da classe ReferenceRepository.<br>

## Prompt 7 - Controller de Referências

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar a camada de controller completa que recebe a requisição, se conecta ao service e retorna a resposta de cada método existente<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code utilizando express, utilizar tipagem forte com TypeScript e seguir as convenções de nomes (PascalCase para Controller).<br>
> **Resposta:** Criar o arquivo ReferenceController com um método para cada respectivo método da classe ReferenceService.<br>

## Prompt 8 - Schema para validação de Referências

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar os schemas de validação dos dados necessários para a request.<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code utilizando express, utilizar tipagem forte com TypeScript e seguir as convenções de nomes.<br>
> **Resposta:** Criar o arquivo com os schemas de validação de cada método existente na controller.<br>

## Prompt 9 - Middleware de Referências

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar o middleware que se conecta aos schemas de validação epara validar os dados inseridos em cada request.<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code utilizando express, utilizar tipagem forte com TypeScript e seguir as convenções de nomes.<br>
> **Resposta:** Criar o arquivo validateReference que valide corretamente os dados de entrada da requisição.<br>

## Prompt 10 - Rotas de Referências

> **Contexto:** Estou desenvolvendo uma micro API chamada "StudyHub", um gerenciador de links de estudo.<br>
> **Objetivo:** Gerar a camada de rotas completa que disponibiliza a API para uso.<br>
> **Estilo:** Adote o papel de um Arquiteto de Software Sênior. O código deve ser limpo, seguir as melhores práticas de Clean Code utilizando express, utilizar tipagem forte com TypeScript e seguir as convenções de nomes.<br>
> **Resposta:** Criar o arquivo reference-routes com um método para cada respectivo método da controller e que utilize o middleware validateReference para validar os dados de entrada da requisição.<br>

## Prompt 11 - Refatoração Services

> Como engenheiro de software sênior, refatore a camada de service da entidade Reference para que não haja mais a validação dos dados de entrada, visto que essa validação já está sendo feita na camada de Schema/validation com a ferramenta Zod. A resposta deverá conter o código atualizado do arquivo ReferenceService.
