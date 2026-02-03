import { Cliente } from "../../domain/entities/Cliente.js";
import { Car } from "../../domain/entities/Car.js";

import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";

import { InMemoryClienteRepository } from "../../infra/database/inMemory/InMemoryClienteRepository.js";
import { InMemoryCarRepository } from "../../infra/database/inMemory/InMemoryCarRepository.js";
import { AluguelRepositoryMemory } from "../../infra/database/inMemory/AluguelRepositoryMemory.js";
import { ConsoleLogger } from "../../infra/logger/ConsoleLogger.js";

async function main() {
  // Infra - Peparando o terreno, né fi? Tá criando o "BANCO DE DADOS"
  const clienteRepo = new InMemoryClienteRepository();
  const carRepo = new InMemoryCarRepository();
  const aluguelRepo = new AluguelRepositoryMemory();
  const logger = new ConsoleLogger();

  // Entidades Cliente = Como o "BANCO DE DADO" cliente tá vazio, vc tá criando um objeto 
  // cliente, que será armazenado.
  const cliente = new Cliente(
    "c1",
    "João",
    "12345678900",
    "joao@email.com",
    "999999999"
  );
  // Entida Carro = mesma coisa do caso do cliente.
  const carro = new Car(
    "car1",
    "ABC-1234",
    "Onix",
    "Chevrolet",
    2022,
    true
  );

  const carro2 = new Car(
    "car45",
    "ABC-0000",
    "Onix",
    "Chevrolet",
    2022,
    true
  );

  // Salvando agora o Cliente e o nosso carro no "BD" vazio.
  await clienteRepo.save(cliente);
  await carRepo.save(carro);

  // Criando um Objeto para o Caso de uso - Aluguel
  const createRental = new CreateRentalUseCase(
    aluguelRepo,
    carRepo,
    clienteRepo,
    logger
  );

  // Pedido (DTO) - Damo enxugada 
  const aluguel = await createRental.execute({
    clienteId: cliente.id_user,
    carroPlaca: carro2.placa,
    data_inicio: new Date("2026-01-01"),
    data_fim: new Date("2026-01-05")
  });

  console.log(aluguel.status);
  console.log(carro.disponibilidade);
}

main();
