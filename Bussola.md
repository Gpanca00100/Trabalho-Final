# RentX – Clean Architecture com InversifyJS

## O que o Professor Maikon quer?
Basicamente, **3 coisas**:

**1 - Clean Architecture aplicada de verdade**
- Domínio isolado
- Use Case sem depender de Prisma, CLI, etc
- Infra trocável (Prisma ↔ InMemory)

**2 - Inversão de Dependência (DIP + IoC)**
- Use Case recebe interfaces
- Implementações são escolhidas no container (Inversify)

**3 - Teste unitário sem banco**
- Use Case funcionando só com repositório em memória


## Pessoas Envolvidas?
- Arthur Esse https://github.com/arthurEsse/
    - Domínio (entities + interfaces)
    - CreateRentalUseCase
    - Testes unitários
    - Revisar se dependências estão corretas
    - **principais commits:**
        - feature/domain
        - feature/create-rental-usecase
        - feature/tests

- Gabriel Zardini https://github.com/Gpanca00100
    - Prisma + SQLite
    - Repositórios Prisma
    - Container Inversify
CLI
    - **principais commits:**
        - feature/prisma
        - feature/container
        - feature/cli

# 🧭 Guia de Desenvolvimento + Checklist de Commits  
**Projeto: RentX — Clean Architecture com InversifyJS**

Este documento define:
- a **ordem correta de desenvolvimento**
- as **fases do projeto**
- os **commits esperados**
- o **responsável por cada parte**

---

## 🔹 PASSO 0 — Organização Inicial (GitHub)
**Responsável:** Arthur Esse + Gabriel Zardini

> Antes de escrever código.

- [x] **chore: initial project setup**  
  _Responsável: Gabriel Zardini - concluído em 27/01/2026_  
  - Criar repositório
  - Configurar Node.js + TypeScript
  - Definir `main` como branch principal

- [ ] **OPICIONAL chore: configure eslint and prettier**  
  _Responsável: Arthur Esse_

- [x] **docs: add project description and architecture overview**   
  _Responsável: Arthur Esse - concluído em 27/01/2026_  
  - README com explicação da arquitetura

✅ *Checkpoint*: projeto compila e está organizado para trabalho em dupla.

---

## 🔹 PASSO 1 — Domínio (Domain Layer)
📁 `src/domain`  
**Responsável:** Pessoa A

> Base do sistema. Nenhuma dependência externa é permitida.

- [ ] **feat(domain): add Car entity**  
  _Responsável: Pessoa A_

- [ ] **feat(domain): add Rental entity**  
  _Responsável: Pessoa A_

- [ ] **feat(domain): define ICarRepository interface**  
  _Responsável: Pessoa A_

- [ ] **feat(domain): define IRentalRepository interface**  
  _Responsável: Pessoa A_

- [ ] **test(domain): validate domain entities structure** *(opcional)*  
  _Responsável: Pessoa A_

✅ *Checkpoint*:
- Domínio isolado
- Nenhum Prisma, Inversify ou infra importado

---

## 🔹 PASSO 2 — Caso de Uso (Application Layer)
📁 `src/application/useCases/createRental`  
**Responsável:** Pessoa A

> Implementação da regra de negócio.

- [ ] **feat(usecase): create CreateRental DTO**  
  _Responsável: Pessoa A_

- [ ] **feat(usecase): implement CreateRentalUseCase**  
  _Responsável: Pessoa A_
  - Validar disponibilidade do carro
  - Validar aluguel em aberto do usuário
  - Garantir duração mínima de 24 horas

- [ ] **refactor(usecase): improve business validations**  
  _Responsável: Pessoa A_

✅ *Checkpoint*:
- Use Case depende apenas do domínio
- Dependências via construtor (DIP)

---

## 🔹 PASSO 3 — Testes Unitários + Repositórios InMemory
📁 `infra/database/inMemory`  
**Responsável:** Pessoa A

> Prova prática da Clean Architecture.

- [ ] **feat(test): add InMemoryCarRepository**  
  _Responsável: Pessoa A_

- [ ] **feat(test): add InMemoryRentalRepository**  
  _Responsável: Pessoa A_

- [ ] **test(usecase): add CreateRentalUseCase unit tests**  
  _Responsável: Pessoa A_
  - Cenário de sucesso
  - Carro indisponível
  - Usuário com aluguel aberto
  - Duração menor que 24h

✅ *Checkpoint*:
- Testes passam
- Nenhum banco de dados envolvido

🔥 *Neste ponto, o núcleo do trabalho já está completo.*

---

## 🔹 PASSO 4 — Infraestrutura Real (Prisma + SQLite)
📁 `infra/database/prisma`  
**Responsável:** Pessoa B

> Persistência real sem alterar regras de negócio.

- [ ] **chore(prisma): configure prisma and sqlite**  
  _Responsável: Pessoa B_

- [ ] **chore(prisma): create Car and Rental models**  
  _Responsável: Pessoa B_

- [ ] **feat(infra): implement PrismaCarRepository**  
  _Responsável: Pessoa B_

- [ ] **feat(infra): implement PrismaRentalRepository**  
  _Responsável: Pessoa B_

✅ *Checkpoint*:
- Prisma funcionando
- Repositórios implementam contratos do domínio

---

## 🔹 PASSO 5 — InversifyJS (IoC Container)
📁 `infra/container`  
**Responsável:** Pessoa B

> Aplicação do DIP e IoC.

- [ ] **feat(container): configure inversify container**  
  _Responsável: Pessoa B_

- [ ] **feat(container): bind repositories implementations**  
  _Responsável: Pessoa B_

✅ *Checkpoint*:
- Implementações trocáveis apenas via container

---

## 🔹 PASSO 6 — Interface CLI (Adapters Layer)
📁 `src/adapters/cli`  
**Responsável:** Pessoa B

> Ponto de entrada da aplicação.

- [ ] **feat(cli): implement rental creation CLI**  
  _Responsável: Pessoa B_

- [ ] **chore(cli): improve CLI output**  
  _Responsável: Pessoa B_

✅ *Checkpoint*:
- Aplicação executável via terminal

---

## 🔹 PASSO 7 — Revisão Final
**Responsável:** Pessoa A + Pessoa B

> Refinamento e entrega.

- [ ] **refactor: improve folder organization**  
  _Responsável: Pessoa A + Pessoa B_

- [ ] **fix: adjust dependency direction violations**  
  _Responsável: Pessoa A + Pessoa B_

- [ ] **docs: update README with execution steps**  
  _Responsável: Pessoa A + Pessoa B_

---

## 🧠 Regra de Ouro da Arquitetura

> As dependências devem sempre apontar de fora para dentro:
>
> **Adapters → Infra → Application → Domain**
