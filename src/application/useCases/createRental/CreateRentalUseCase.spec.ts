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
  carRepo = new InMemoryCarRepository();
  clienteRepo = new InMemoryClienteRepository();
  aluguelRepo = new AluguelRepositoryMemory();
  logger = new ConsoleLogger();

  createRentalUseCase = new CreateRentalUseCase(
    aluguelRepo,
    carRepo,
    clienteRepo,
    logger
  );
});

it("deve criar um aluguel com sucesso", async () => {
  const cliente = new Cliente(
    "c1",
    "João",
    "12345678900",
    "joao@email.com",
    "999999999"
  );

  const carro = new Car(
    "car1",
    "ABC-1234",
    "Onix",
    "Chevrolet",
    2022,
    true
  );

  await clienteRepo.save(cliente);
  await carRepo.save(carro);

  const aluguel = await createRentalUseCase.execute({
    clienteId: cliente.id_user,
    carroPlaca: carro.placa,
    data_inicio: new Date("2026-01-01"),
    data_fim: new Date("2026-01-03")
  });

  expect(aluguel).toBeDefined();
  expect(aluguel.cliente.id_user).toBe(cliente.id_user);
  expect(aluguel.carro.placa).toBe(carro.placa);
  expect(aluguel.carro.disponibilidade).toBe(false);
});

//Deu ruim - Carro indisponível
it("não deve permitir aluguel de carro indisponível", async () => {
  const cliente = new Cliente("c1", "João", "123", "j@email.com", "999");
  const carro = new Car("car1", "ABC-1234", "Onix", "Chevrolet", 2022, false);

  await clienteRepo.save(cliente);
  await carRepo.save(carro);

  await expect(
    createRentalUseCase.execute({
      clienteId: cliente.id_user,
      carroPlaca: carro.placa,
      data_inicio: new Date("2026-01-01"),
      data_fim: new Date("2026-01-03")
    })
  ).rejects.toThrow("Carro indisponível");
});


//Deu ruim - Cliente malandro, quer alugar mais de um carro
it("não deve permitir cliente com aluguel em aberto", async () => {
  const cliente = new Cliente("c1", "João", "123", "j@email.com", "999");
  const carro1 = new Car("car1", "AAA-1111", "Onix", "Chevrolet", 2022, true);
  const carro2 = new Car("car2", "BBB-2222", "Gol", "VW", 2021, true);

  await clienteRepo.save(cliente);
  await carRepo.save(carro1);
  await carRepo.save(carro2);

  await createRentalUseCase.execute({
    clienteId: cliente.id_user,
    carroPlaca: carro1.placa,
    data_inicio: new Date("2026-01-01"),
    data_fim: new Date("2026-01-03")
  });

  await expect(
    createRentalUseCase.execute({
      clienteId: cliente.id_user,
      carroPlaca: carro2.placa,
      data_inicio: new Date("2026-01-04"),
      data_fim: new Date("2026-01-06")
    })
  ).rejects.toThrow("Cliente já possui um aluguel em aberto");
});


// deu ruim - aluguel tem de ser de pelo menos um dia filhão
it("não deve permitir data final menor ou igual à inicial", async () => {
  const cliente = new Cliente("c1", "João", "123", "j@email.com", "999");
  const carro = new Car("car1", "ABC-1234", "Onix", "Chevrolet", 2022, true);

  await clienteRepo.save(cliente);
  await carRepo.save(carro);

  await expect(
    createRentalUseCase.execute({
      clienteId: cliente.id_user,
      carroPlaca: carro.placa,
      data_inicio: new Date("2026-01-05"),
      data_fim: new Date("2026-01-05")
    })
  ).rejects.toThrow("Data final deve ser posterior à inicial");
});
