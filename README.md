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
> **Nota:** Por padrão, o projeto utiliza banco de dados **H2 (em memória)** para facilitar os testes. Os dados são resetados a cada reinicialização, mas são populados automaticamente pelo arquivo `import.sql`.

### 2. Rodando o Frontend
```bash
cd doarmais-front
npm install
npm start
```
O frontend estará disponível em `http://localhost:4200`.

---

## 🧪 Como Testar a Aplicação

Para validar o funcionamento completo (fluxo de login e doação), você pode utilizar as credenciais pré-configuradas:

| Perfil | E-mail | Senha |
| :--- | :--- | :--- |
| **Administrador** | `admin@doarmais.com` | `admin123` |
| **Doador** | `doador@gmail.com` | `123456` |

### Fluxo Sugerido de Teste:
1.  Acesse `http://localhost:4200` e faça login com a conta de **Administrador**.
2.  Navegue pelo **Dashboard** para ver as estatísticas atuais.
3.  Simule uma **Nova Doação** selecionando os itens (Arroz, Feijão, etc).
4.  Verifique a atualização do estoque na **Tabela de Doações**.

---

## 🛣️ Endpoints Principais (API)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/login` | Autenticação e geração de token JWT. |
| `POST` | `/usuario` | Cadastro de novos usuários. |
| `GET` | `/doacao` | Listagem de todas as doações realizadas. |
| `POST` | `/doacao` | Registro de uma nova doação (Protegido por JWT). |
| `GET` | `/cesta-basica/total` | Retorna o total de cestas montadas. |

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
