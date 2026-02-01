import { Cliente } from "../../domain/entities/Cliente";
import { Car } from "../../domain/entities/Car";
import { AluguelRepositoryMemory } from "../../infra/database/inMemory/AluguelRepositoryMemory";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";

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

const repo = new AluguelRepositoryMemory();
const createRental = new CreateRentalUseCase(repo);

const aluguel = await createRental.execute({
  cliente,
  carro,
  data_inicio: new Date("2026-01-01"),
  data_fim: new Date("2026-01-05")
});

console.log(aluguel.status);
console.log(carro.disponibilidade);
