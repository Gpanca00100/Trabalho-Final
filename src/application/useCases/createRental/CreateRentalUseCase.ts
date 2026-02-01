import { IAluguelRepository } from "../../../domain/repositories/IAluguelRepository.js";
import { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import { IClienteRepository } from "../../../domain/repositories/IClienteRepository.js";
import { Aluguel } from "../../../domain/entities/Aluguel.js";
import { CreateRentalDTO } from "./CreateRentalDTO.js";

export class CreateRentalUseCase {
  constructor(
    private aluguelRepo: IAluguelRepository,
    private carRepo: ICarRepository,
    private clienteRepo: IClienteRepository
  ) {}

  async execute({
    clienteId,
    carroPlaca,
    data_inicio,
    data_fim
  }: CreateRentalDTO): Promise<Aluguel> {

    const cliente = await this.clienteRepo.findById(clienteId);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    const carro = await this.carRepo.findByPlaca(carroPlaca);
    if (!carro) {
      throw new Error("Carro não encontrado");
    }

    if (!carro.disponibilidade) {
      throw new Error("Carro indisponível");
    }

    const aluguelAberto =
      await this.aluguelRepo.buscarAluguelAbertoPorCliente(cliente.id_user);

    if (aluguelAberto) {
      throw new Error("Cliente já possui um aluguel em aberto");
    }

    if (data_fim <= data_inicio) {
      throw new Error("Data final deve ser posterior à inicial");
    }

    carro.disponibilidade = false;
    await this.carRepo.update(carro);

    const aluguel = new Aluguel(
      crypto.randomUUID(),
      cliente,
      carro,
      data_inicio,
      data_fim
    );

    await this.aluguelRepo.salvar(aluguel);

    return aluguel;
  }
}
