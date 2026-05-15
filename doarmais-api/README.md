# Doar+ API ⚙️

O backend do sistema **Doar+**, construído com Quarkus para oferecer alta performance e baixo consumo de recursos.

## 🚀 Funcionalidades
- **Gestão de Usuários:** Cadastro, login e autenticação via JWT.
- **Controle de Doações:** Registro de itens doados e histórico.
- **Gestão de Estoque:** Controle em tempo real dos itens disponíveis.
- **Montagem de Cestas:** Lógica para distribuição de itens em cestas básicas.
- **Auditoria:** Logs de operações críticas para segurança.

## 🛠️ Stack Técnica
- **Quarkus:** Framework principal.
- **RESTEasy Reactive:** Implementação de endpoints REST.
- **Hibernate Panache:** Facilitação da camada de dados.
- **SmallRye JWT:** Segurança e emissão de tokens.
- **Maven:** Gestão de dependências.

## 📂 Organização do Código
- `com.doarmais.controller`: Endpoints da API.
- `com.doarmais.model.entity`: Mapeamento das tabelas do banco.
- `com.doarmais.model.dao`: Camada de acesso aos dados.
- `com.doarmais.model.bo`: Regras de negócio.
- `com.doarmais.model.dto`: Objetos de transferência de dados.

## 🛠️ Configuração
O arquivo `src/main/resources/application.properties` contém as configurações de banco de dados e chaves JWT.
