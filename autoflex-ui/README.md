# 🚀 Autoflex UI

## 📌 Visão Geral

Esta é a interface gráfica desenvolvida em **React** para o ecossistema Autoflex. O projeto oferece uma experiência de usuário (UX) moderna e fluida para o gerenciamento de inventário e engenharia de produtos.

---

## 🎯 Requisitos Implementados

### ✔ RF005 – CRUD de Produtos (Interface Gráfica)
### ✔ RF006 – CRUD de Matérias-Primas (Interface Gráfica)
### ✔ RF007 – Associação de Materiais via Modal Mestre-Detalhe
### ✔ RF008 – Dashboard de Produção Disponível

---

## 🛠 Tecnologias Utilizadas

- **React 19** (Vite)
- **Tailwind CSS** (Estilização Responsiva)
- **Lucide React** (Ícones)
- **Cypress** (Testes E2E de Integração)
- **Docker** (Nginx para servir o build estático)

---

## 📷 Demonstração da Interface

<img width="1916" height="866" alt="image" src="https://github.com/user-attachments/assets/053f2429-bb7b-438a-8d79-a05bf7f02b28" />

<img width="1916" height="866" alt="image" src="https://github.com/user-attachments/assets/6d98bb73-80f6-46ec-a11f-cfe5144bec56" />

---

## 📱 Interface Mobile

<p align="center">
  <img width="350" alt="Mobile View 1" src="https://github.com/user-attachments/assets/22b7ce11-7365-4e8c-943c-ec1495a5c8de" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="350" alt="Mobile View 2" src="https://github.com/user-attachments/assets/c4fd5fa2-4041-483a-872a-7a04179b8a80" />
</p>

---

## 🧪 Testes

### ✔ Testes E2E (End-to-End) com Cypress
- **Fluxo Principal:** O projeto contém testes automatizados que realizam o ciclo completo (Criação, Edição e Exclusão) de um Produto.
- **Integração:** Os testes validam a comunicação real entre o Front-end e a API REST.

Para rodar os testes localmente (com o front e back ligados):
```bash
npx cypress open
```

---

## ▶ Como Executar

1. É necessário que o backend esteja executando, pode seguir o passo a passo da seção **Como Executar** desse repositório:
```bash
https://github.com/stefanopaulo/autoflex-api
```

2. Clone o repositório
```bash
git clone git@github.com:stefanopaulo/autoflex-ui.git
cd autoflex-ui
```

3. Build da imagem Docker
```bash
docker build -t autoflex-ui .
```

4. Executar o container
```bash
docker run -p 5173:80 --name autoflex-ui autoflex-ui
```

Após o container subir a aplicação estará disponível em http://localhost:5173

---

## 👨‍💻 Autor

**Stefano Paulo** *Desenvolvedor web*
