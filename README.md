# 🚀 Autoflex - Full Stack Orquestração

Este repositório é o ponto central para a execução de todo o ecossistema **Autoflex**. Ele utiliza **Docker Compose** para orquestrar o banco de dados, o backend e o frontend de forma integrada.

## 🏗️ Estrutura do Ecossistema

O projeto é composto por dois repositórios principais que são gerenciados por esta orquestração:

* **Backend:** [autoflex-api](https://github.com/stefanopaulo/autoflex-api) (Java 21 / Spring Boot)
* **Frontend:** [autoflex-ui](https://github.com/stefanopaulo/autoflex-ui) (React 19 / Vite)

---

## 🛠️ Tecnologias Utilizadas na Orquestração

* **Docker & Docker Compose:** Para criação de containers e gerenciamento de rede.
* **PostgreSQL 15:** Banco de dados relacional.
* **Nginx (Opcional/Interno):** Para servir o conteúdo estático do frontend.

---

## ▶️ Como Executar o Projeto Completo

1.  **Clone este repositório**
    ```bash
    git clone git@github.com:stefanopaulo/autoflex.git
    cd autoflex
    ```

2.  **Suba todo o ecossistema**
    ```bash
    docker compose up -d
    ```
    *Este comando irá baixar as imagens (ou buildá-las localmente), configurar a rede interna e iniciar os serviços na ordem correta.*

---

## 🌐 Serviços e Portas

Após a execução, os seguintes containers estarão disponíveis:

| Serviço | Container Name | Porta Host | Descrição |
| :--- | :--- | :--- | :--- |
| **Database** | `postgres_autoflex_db` | `5433` | Banco de dados PostgreSQL |
| **Backend** | `autoflex-api` | `8085` | API REST / Swagger Documentation |
| **Frontend** | `autoflex-ui` | `5173` | Interface Web em React |

---

## 🔗 Links de Acesso

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **API (Swagger):** [http://localhost:8085/swagger-ui/index.html](http://localhost:8085/swagger-ui/index.html)
* **Database:** `localhost:5433` (User: `devuser` / Password: `devpass`)

---

## 📝 Notas Adicionais

Para informações detalhadas sobre as regras de negócio, endpoints específicos da API ou componentes da interface, consulte os READMEs nos respectivos repositórios linkados no topo deste arquivo.
