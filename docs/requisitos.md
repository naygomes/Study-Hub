# Requisitos da Micro API de Gerenciamento de Referências

## 1. Visão Geral

A aplicação consiste em uma micro API para gerenciamento de referências de estudo, como livros, artigos, sites e outros materiais acadêmicos ou técnicos. O objetivo do MVP é centralizar o cadastro, organização, consulta e avaliação dessas referências, permitindo ao usuário manter uma base simples e estruturada para apoio aos estudos.

## 2. Requisitos Funcionais

### RF01 - Cadastro de referência

O sistema deve permitir o cadastro de uma nova referência de estudo.

Cada referência deve conter, no mínimo, os seguintes campos:

- título
- descrição
- autor
- URL
- categoria
- status
- tags
- nota de avaliação

### RF02 - Consulta de referências

O sistema deve permitir consultar a lista de referências cadastradas.

A consulta deve possibilitar o retorno de todas as referências armazenadas na base.

### RF03 - Consulta de referência por identificador

O sistema deve permitir consultar os dados de uma referência específica por meio de um identificador único.

### RF04 - Atualização de referência

O sistema deve permitir atualizar os dados de uma referência previamente cadastrada.

Deve ser possível editar qualquer atributo da referência, desde que respeitadas as validações definidas.

### RF05 - Exclusão de referência

O sistema deve permitir remover uma referência cadastrada.

A exclusão deve ocorrer por identificador único da referência.

### RF06 - Avaliação de referência

O sistema deve permitir atribuir uma nota de avaliação para cada referência.

A nota deve seguir a escala de 1 a 5.

### RF07 - Busca por categoria

O sistema deve permitir buscar referências com base na categoria informada.

Exemplos de categoria:

- livro
- artigo
- site
- documentação
- vídeo

### RF08 - Busca por status de leitura

O sistema deve permitir buscar referências com base no status de leitura.

Exemplos de status:

- pendente
- em andamento
- concluído
- revisar

### RF09 - Busca por tags

O sistema deve permitir buscar referências por uma ou mais tags associadas.

### RF10 - Busca por nota de avaliação

O sistema deve permitir buscar referências a partir da nota de avaliação atribuída.

### RF11 - Busca combinada

O sistema deve permitir combinar filtros de busca por categoria, status, tags e nota de avaliação.

### RF15 - Retorno padronizado da API

O sistema deve retornar respostas padronizadas para operações de sucesso e erro, facilitando o consumo da API por clientes futuros.

## 3. Requisitos Não Funcionais

### RNF01 - Tecnologia da aplicação

A API deve ser desenvolvida utilizando Node.js com TypeScript.

### RNF02 - Persistência de dados

A persistência deve ser realizada com Prisma ORM utilizando SQLite como banco de dados do MVP.

### RNF03 - Hot reload em desenvolvimento

O ambiente de desenvolvimento deve permitir recarregamento automático da aplicação por meio de nodemon.

### RNF05 - Organização do código

O projeto deve possuir estrutura de código organizada por responsabilidades, separando rotas, controladores, serviços, modelos e acesso a dados.

### RNF06 - Tipagem estática

Todo o código da aplicação deve utilizar tipagem estática com TypeScript, reduzindo erros e melhorando a manutenção.

### RNF07 - API REST

A aplicação deve seguir princípios de API REST para operações de criação, leitura, atualização e exclusão de referências.

### RNF08 - Formato de dados

A API deve trafegar dados no formato JSON tanto para entrada quanto para saída.

### RNF09 - Validação de dados de entrada

Os dados recebidos pela API devem ser validados antes de serem persistidos ou processados.

### RNF10 - Tratamento de erros

A aplicação deve possuir tratamento de erros consistente, com mensagens claras e códigos HTTP adequados.

### RNF11 - Facilidade de execução local

O projeto deve ser simples de executar localmente, com instalação de dependências e inicialização por comandos padrão do ecossistema Node.js.

### RNF12 - Baixa complexidade para o MVP

A solução deve priorizar simplicidade de implementação, manutenção e execução local, evitando dependências ou componentes desnecessários para a primeira versão.

### RNF13 - Desempenho compatível com MVP

A API deve responder de forma adequada para uso local e pequeno volume de dados, compatível com uma aplicação de estudo e prototipação.

### RNF14 - Escalabilidade evolutiva

Embora o MVP utilize SQLite, a modelagem deve permitir futura evolução para bancos relacionais mais robustos sem reescrita significativa das regras de negócio.

### RNF15 - Legibilidade e manutenção

O código deve ser escrito de forma clara, com nomes consistentes e organização que favoreça manutenção e evolução futura.

### RNF16 - Testes unitários automatizados

A aplicação deve implementar testes unitários automatizados utilizando Jest, com cobertura das principais regras de negócio e validações da API, de modo a reduzir regressões e facilitar a manutenção do sistema.

## 4. Premissas do MVP

- A aplicação será utilizada inicialmente em ambiente local.
- O banco SQLite será suficiente para o volume inicial de dados.
- A autenticação de usuários não faz parte do escopo inicial do MVP.
- A API atenderá inicialmente um único consumidor ou cliente local.

## 5. Restrições do MVP

- O uso de SQLite limita concorrência e cenários de maior escala.
- O escopo inicial não contempla interface gráfica.
- O escopo inicial não contempla recomendação inteligente ou priorização automática por IA.

## 6. Critérios de Aceite do MVP

- O usuário consegue cadastrar uma referência manualmente.
- O usuário consegue listar, consultar, atualizar e excluir referências.
- O usuário consegue atribuir nota de 1 a 5 para uma referência.
- O usuário consegue buscar referências por categoria, status, tags e nota.
- O usuário consegue combinar filtros de busca.
- A aplicação executa localmente com Node.js, TypeScript, Prisma ORM e SQLite.
