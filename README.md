# Doar+ (Doar Mais) 🤝

O **Doar+** é uma plataforma fullstack desenvolvida para facilitar a gestão de doações de alimentos e a montagem de cestas básicas para famílias carentes. O projeto visa conectar doadores a centros de distribuição, garantindo transparência e eficiência no controle de estoque.

---

## 🏗️ Estrutura do Repositório

Este repositório é um monorepo que contém tanto o backend quanto o frontend da aplicação:

- **[doarmais-api](./doarmais-api/):** Backend desenvolvido em Java com Quarkus.
- **[doarmais-front](./doarmais-front/):** Frontend desenvolvido em TypeScript com Angular.

---

## 🛠️ Tecnologias Principais

### Backend
- **Framework:** [Quarkus](https://quarkus.io/) (Supersonic Subatomic Java)
- **Persistência:** Hibernate ORM com Panache
- **Banco de Dados:** H2/PostgreSQL
- **Segurança:** Autenticação via JWT (JSON Web Token)
- **Arquitetura:** RESTful API com padrões DAO e BO

### Frontend
- **Framework:** [Angular](https://angular.dev/) (v17+)
- **Estilização:** Angular Material & Vanilla CSS
- **Estado:** Services e RxJS para reatividade
- **Segurança:** Auth Guards e Interceptors para gestão de tokens

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Java 17+
- Node.js 18+
- Angular CLI

### 1. Rodando o Backend (API)
```bash
cd doarmais-api
./mvnw quarkus:dev
```
A API estará disponível em `http://localhost:8080`.

### 2. Rodando o Frontend
```bash
cd doarmais-front
npm install
npm start
```
O frontend estará disponível em `http://localhost:4200`.

---

## 🎓 Contexto Acadêmico
Este projeto foi desenvolvido como parte do currículo da faculdade, aplicando conceitos de:
- Desenvolvimento Web Fullstack
- Segurança de Aplicações
- Arquitetura de Software
- Gestão de Banco de Dados

---

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
