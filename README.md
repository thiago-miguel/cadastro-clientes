# Cadastro de Clientes

Projeto desenvolvido como parte de um desafio prático com o objetivo de treinar o uso da **Fetch API** em JavaScript, simulando uma conexão com banco de dados por meio da API **CrudCrud**.

A proposta inicial era criar um sistema simples de cadastro de clientes utilizando operações básicas de CRUD. Ao longo do desenvolvimento, o projeto foi expandido para incluir funcionalidades e boas práticas adicionais, indo além do escopo original do desafio.

---

## 🎯 Objetivo do Projeto

- Praticar consumo de APIs REST com `fetch`
- Simular operações de banco de dados utilizando o CrudCrud
- Consolidar conceitos de JavaScript moderno e manipulação do DOM
- Aplicar organização e separação de responsabilidades no código

---

## 🚀 Funcionalidades

- Cadastro de clientes (Create)
- Listagem de clientes sob demanda (Read)
- Edição de clientes diretamente na interface (Update)
- Exclusão individual de clientes (Delete)
- Exclusão de todos os clientes com confirmação para evitar ações acidentais
- Mensagem dinâmica quando não há clientes cadastrados
- Botão de mostrar/ocultar clientes

---

## 🧠 Conceitos e Técnicas Utilizadas

- **Fetch API** para comunicação com a API do CrudCrud
- Uso completo dos métodos do **CRUD** (`GET`, `POST`, `PUT`, `DELETE`)
- **Manipulação do DOM** para criação e atualização dinâmica dos elementos HTML
- **Separação de responsabilidades**:
  - Arquivo responsável pela lógica principal e comunicação com a API
  - Arquivo dedicado exclusivamente à manipulação da interface (UI)
- Organização do código com:
  - Centralização das referências ao DOM
  - Uso de funções reutilizáveis
  - Modularização com `import` e `export`
- Implementação de funcionalidades extras não exigidas no desafio original, como:
  - Edição inline de clientes
  - Exclusão em massa
  - Confirmação via `alert` para melhorar a experiência do usuário e evitar cliques acidentais

---

## 🛠 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- API externa: **CrudCrud**

---

## 📌 Observações

Este projeto foi desenvolvido com foco em aprendizado e prática. O uso do CrudCrud permite simular um backend real sem a necessidade de configurar um servidor próprio, facilitando a experimentação com operações de persistência de dados.

---

## 👤 Autor

Projeto desenvolvido por **Thiago Miguel** como parte do aprendizado em desenvolvimento web e JavaScript.
