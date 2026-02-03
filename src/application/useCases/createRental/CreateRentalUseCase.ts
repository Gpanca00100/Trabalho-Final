import type { IAluguelRepository } from "../../../domain/repositories/IAluguelRepository.js";
import type { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import type { IClienteRepository } from "../../../domain/repositories/IClienteRepository.js";
import { Aluguel } from "../../../domain/entities/Aluguel.js";
import type { CreateRentalDTO } from "./CreateRentalDTO.js";
import type { Logger } from "../../../domain/Logger/Logger.js";
import { ConsoleLogger } from "../../../infra/logger/ConsoleLogger.js";

export class CreateRentalUseCase {
  constructor(
    private aluguelRepo: IAluguelRepository,
    private carRepo: ICarRepository,
    private clienteRepo: IClienteRepository,
    private logger: Logger
  ) {}

  async execute({
    clienteId,
    carroPlaca,
    data_inicio,
    data_fim
  }: CreateRentalDTO): Promise<Aluguel> {
    this.logger.info("Iniciando criação de aluguel");

    const cliente = await this.clienteRepo.findById(clienteId);
    if (!cliente) {
      this.logger.error("Usuário não existente")
      throw new Error("Cliente não encontrado");
    }

    const carro = await this.carRepo.findByPlaca(carroPlaca);
    if (!carro) {
      this.logger.error("Carro não existente")
      throw new Error("Carro não encontrado");
    }

    if (!carro.disponibilidade) {
      this.logger.warn("Carro Existente. Mas indisponível")
      throw new Error("Carro indisponível");
    }

    const aluguelAberto =
      await this.aluguelRepo.buscarAluguelAbertoPorCliente(cliente.id_user);

    if (aluguelAberto) {
      this.logger.warn("Cliente válido. Mas aluguel em aberto")
      throw new Error("Cliente já possui um aluguel em aberto");
    }

    if (data_fim <= data_inicio) {
      this.logger.warn("Data final deve ser posterior à inicial")
      throw new Error("Data final deve ser posterior à inicial");
    }


    this.logger.info(`Atualizando disponibilidade do carro ${carro.placa}`);
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
    this.logger.info(`Aluguel criado com sucesso (cliente=${cliente.id_user}, carro=${carro.placa})`);
    return aluguel;
  }
}
