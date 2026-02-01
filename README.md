# 📌 RentX – Clean Architecture com InversifyJS

## 👨‍🎓 Alunos
- **202426610050** – Arthur Esse Borges Xavier de Lima e Melo – https://github.com/arthurEsse  
- **202426610030** – Gabriel Zardini Dourado Cunha – https://github.com/Gpanca00100

---

## 📘 Trabalho Final – *A Vingança dos Sith*

Este trabalho consiste em desenvolver um sistema simples de aluguel de carros com o objetivo de aplicar os conhecimentos estudados na disciplina de **Arquitetura de Software** da Universidade Federal de Rondonópolis (turma 2025/2).  
O foco principal é a aplicação de boas práticas arquiteturais e de design de software.

### 🎯 Objetivos da Atividade
- Aplicar o padrão arquitetural **Clean Architecture**
- Praticar os princípios **S.O.L.I.D.**
- Implementar **Inversão de Controle (IoC)** com InversifyJS
- Utilizar conceitos de **Domain-Driven Design (DDD)**
- Construir **testes unitários** consistentes

---

## 🧠 Conceitos Aplicados

### 🧱 Clean Architecture  
A **Arquitetura Limpa** organiza o sistema em camadas bem definidas, permitindo que as regras de negócio sejam independentes de frameworks, interfaces e banco de dados.  
As principais camadas são:
- **Domain** → Entidades e contratos
- **Application** → Casos de uso
- **Infra** → Implementações concretas
- **Adapters** → Pontos de entrada (ex.: CLI, API)

### 🔍 Domain-Driven Design (DDD)  
O **DDD** enfatiza a construção do software a partir do **domínio do problema**, modelando as regras de negócio de forma clara e orientada ao contexto do sistema.

### 🎯 Inversão de Controle (IoC) e InversifyJS  
A Inversão de Controle permite **desacoplar** as dependências por meio de injeção de dependências. O InversifyJS é usado para gerenciar os bindings entre interfaces e implementações, facilitando testes e extensibilidade.

---

## 📁 Estrutura do Projeto

- **src/**
  - **domain/**
    - **entities/**
    - **repositories/**
      - ICarRepository.ts
      - IRentalRepository.ts
  - **application/**
    - **useCases/**
      - **createRental/**
        - CreateRentalUseCase.ts
        - CreateRentalDTO.ts
        - CreateRentalUseCase.spec.ts
  - **infra/**
    - **database/**
      - **prisma/**
      - **inMemory/**
    - **container/**
      - types.ts
      - index.ts
  - **adapters/**
    - **cli/**
      - main.ts
  - **main.ts**

---

## ✔️ Funcionalidades Implementadas

- 🚗 Cadastro de aluguel
- ⏱️ Validação de regras de negócio
  - Verificar se o carro está disponível
  - Verificar se o usuário já possui aluguel ativo
  - Validação do período mínimo
- 🧪 Testes unitários cobrindo os casos principais de uso

---

## 📦 Tecnologias Utilizadas

| Categoria                  | Tecnologia |
|---------------------------|------------|
| Linguagem                 | TypeScript |
| Injeção de Dependência    | InversifyJS |
| ORM                       | Prisma |
| Testes                    | Jest |
| Arquitetura               | Clean Architecture / DDD |

---

## 🚀 Como Executar (exemplo para CLI)

> **Pré-requisitos:**  
> Node.js, npm, banco de dados configurado caso utilize o adaptador Prisma

```bash
# Instalar dependências
npm install

# Compilar o TypeScript
npm run build

# Executar via CLI
npm start
