import { describe, it, expect, beforeEach } from "vitest";

import { CreateRentalUseCase } from "./CreateRentalUseCase.js";

import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository.js";
import { InMemoryClienteRepository } from "../../../infra/database/inMemory/InMemoryClienteRepository.js";
import { AluguelRepositoryMemory } from "../../../infra/database/inMemory/AluguelRepositoryMemory.js";

import { Cliente } from "../../../domain/entities/Cliente.js";
import { Car } from "../../../domain/entities/Car.js";
import { ConsoleLogger } from "../../../infra/logger/ConsoleLogger.js";

let createRentalUseCase: CreateRentalUseCase;
let carRepo: InMemoryCarRepository;
let clienteRepo: InMemoryClienteRepository;
let aluguelRepo: AluguelRepositoryMemory;
let logger: ConsoleLogger;

beforeEach(() => {
  // Inicializando os Repositórios em Memória 
  carRepo = new InMemoryCarRepository();
  clienteRepo = new InMemoryClienteRepository();
  aluguelRepo = new AluguelRepositoryMemory();
  logger = new ConsoleLogger();

  // Injeção de Dependência Manual 
  createRentalUseCase = new CreateRentalUseCase(
    aluguelRepo,
    carRepo,
    clienteRepo,
    logger
  );
});

it("deve criar um aluguel com sucesso", async () => {
  const cliente = new Cliente("c1", "João", "12345678900", "joao@email.com", "999999999");
  const carro = new Car("car1", "ABC-1234", "Onix", "Chevrolet", 2022, true);

  await clienteRepo.save(cliente);
  await carRepo.save(carro);

  // Defininindo data fim para DAQUI A 2 DIAS (para passar na regra de 24h)
  const dataFim = new Date();
  dataFim.setDate(dataFim.getDate() + 2);

  const aluguel = await createRentalUseCase.execute({
    clienteId: cliente.id,   
    carroId: carro.id,       
    data_fim: dataFim        
  });

  expect(aluguel).toBeDefined();
  expect(aluguel.cliente.id).toBe(cliente.id);
  expect(aluguel.carro.id).toBe(carro.id);
});

it("não deve permitir aluguel de carro indisponível", async () => {
  const cliente = new Cliente("c1", "João", "123", "j@email.com", "999");
  // Carro criado já como indisponível (false)
  const carro = new Car("car1", "ABC-1234", "Onix", "Chevrolet", 2022, false);

  await clienteRepo.save(cliente);
  await carRepo.save(carro);

  const dataFim = new Date();
  dataFim.setDate(dataFim.getDate() + 2);

  await expect(
    createRentalUseCase.execute({
      clienteId: cliente.id,
      carroId: carro.id,
      data_fim: dataFim
    })
  ).rejects.toThrow("O carro escolhido não está disponível"); 
});

it("não deve permitir cliente com aluguel em aberto", async () => {
  const cliente = new Cliente("c1", "João", "123", "j@email.com", "999");
  const carro1 = new Car("car1", "AAA-1111", "Onix", "Chevrolet", 2022, true);
  const carro2 = new Car("car2", "BBB-2222", "Gol", "VW", 2021, true);

  await clienteRepo.save(cliente);
  await carRepo.save(carro1);
  await carRepo.save(carro2);

  const dataFim1 = new Date();
  dataFim1.setDate(dataFim1.getDate() + 5);

  // 1. Cria o primeiro aluguel (Sucesso)
  await createRentalUseCase.execute({
    clienteId: cliente.id,
    carroId: carro1.id,
    data_fim: dataFim1
  });

  // 2. Tenta criar o segundo aluguel para o MESMO cliente (Deve falhar)
  await expect(
    createRentalUseCase.execute({
      clienteId: cliente.id,
      carroId: carro2.id,
      data_fim: dataF