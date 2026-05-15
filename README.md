# Doar+ (Doar Mais) 🤝 🌐

![Quarkus](https://img.shields.io/badge/Quarkus-3.x-FF0044?style=for-the-badge&logo=quarkus)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Java](https://img.shields.io/badge/Java-17+-orange?style=for-the-badge&logo=openjdk)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=json-web-tokens)

O **Doar+** é uma plataforma fullstack moderna desenvolvida para transformar a gestão de doações. Através de uma interface intuitiva e uma API de alta performance, o sistema conecta doadores e centros de distribuição, garantindo que nenhum item seja desperdiçado e que as cestas básicas cheguem com eficiência às famílias.

---

## 🏗️ Estrutura do Ecossistema

Este é um monorepo organizado para separar claramente as responsabilidades:

```text
doar-mais/
├── ⚙️ doarmais-api/    # Backend (Quarkus + Java)
│   ├── src/main/java   # Lógica REST, BO, DAO
│   └── import.sql      # Dados iniciais automáticos
└── 💻 doarmais-front/  # Frontend (Angular + TypeScript)
    ├── src/app         # Componentes, Services, Guards
    └── src/styles.css  # Estilização global
```

---

## 🛠️ Stack Tecnológica

### **Backend (The Core)**
- **Framework:** Quarkus (Supersonic Subatomic Java).
- **Segurança:** Autenticação baseada em **JWT (JSON Web Token)**.
- **Persistência:** Hibernate ORM com Panache (Padrão Repository/Active Record).
- **Banco:** H2 (Dev) / PostgreSQL (Prod Ready).

### **Frontend (The Experience)**
- **Framework:** Angular 17+ com Componentes Standalone.
- **UI/UX:** Angular Material para componentes elegantes e responsivos.
- **Reatividade:** RxJS para gestão de fluxos de dados e estados.
- **Segurança:** Interceptors para injeção de tokens e Guards para proteção de rotas.

---

## 🚀 Guia de Início Rápido

### Pré-requisitos
- **Java 17+**
- **Node.js 18+**
- **Angular CLI** (`npm install -g @angular/cli`)

### 1. Subindo a API
```bash
cd doarmais-api
./mvnw quarkus:dev
```
> A API utiliza o arquivo `import.sql` para popular o banco em memória automaticamente.

### 2. Subindo o Frontend
```bash
cd doarmais-front
npm install
npm start
```

---

## 🧪 Ambiente de Teste

Para explorar todas as funcionalidades sem precisar cadastrar novos dados, utilize as contas pré-configuradas:

| Perfil | E-mail | Senha |
| :--- | :--- | :--- |
| **👑 Administrador** | `admin@doarmais.com` | `admin123` |
| **🤝 Doador** | `doador@gmail.com` | `123456` |

---

## 🛣️ Roadmap de Endpoints (API)

| Rota | Método | Proteção | Descrição |
| :--- | :---: | :---: | :--- |
| `/login` | `POST` | Livre | Autentica e retorna o Token JWT. |
| `/doacao` | `GET` | JWT | Lista histórico de doações. |
| `/doacao` | `POST` | JWT | Registra novos itens no sistema. |
| `/cesta-basica/total` | `GET` | JWT | Retorna potencial de montagem de cestas. |

---

## 👨‍💻 Créditos Acadêmicos
Projeto desenvolvido como demonstração técnica de integração fullstack, aplicando conceitos avançados de segurança, arquitetura REST e reatividade.

**Autor:** Luciano Oliveira Borges Souza
**Instituição:** IFG - Campus Luziânia
