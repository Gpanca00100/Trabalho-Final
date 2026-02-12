import { inject, injectable } from "inversify";
import { CreateRentalDTO } from "./CreateRentalDTO.js";

//  TODOS ESSES IMPORTS AGORA SÃO 'import type'
import type { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import type { IClienteRepository } from "../../../domain/repositories/IClienteRepository.js";
import type { IAluguelRepository } from "../../../domain/repositories/IAluguelRepository.js";
import type { Logger } from "../../../domain/Logger/Logger.js"; 
//  FIM DOS TIPOS

import { Aluguel } from "../../../domain/entities/Aluguel.js";
import { AppError } from "../../../domain/erros/erro.js";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("IAluguelRepository") private aluguelRepository: IAluguelRepository,
    @inject("ICarRepository") private carRepository: ICarRepository,
    @inject("IClienteRepository") private clienteRepository: IClienteRepository,
    @inject("Logger") private logger: Logger
  ) {}

  async execute({
    clienteId,
    carroId,
    data_fim,
  }: CreateRentalDTO): Promise<Aluguel> {
    
    this.logger.log(`[UseCase] Tentando criar aluguel para Cliente ${clienteId} e Carro ${carroId}`);

    // 1. Verificar se cliente existe
    const cliente = await this.clienteRepository.findById(clienteId);
    if (!cliente) {
      throw new AppError("Cliente não encontrado", 404);
    }

    // 2. Verificar se carro existe
    const carro = await this.carRepository.findById(carroId);
    if (!carro) {
      throw new AppError("Carro não encontrado", 404);
    }

    // 3. Regra: Carro indisponível
    if (!carro.disponibilidade) {
      throw new AppError("O carro escolhido não está disponível", 400);
    }

    // 4. Regra: Aluguel em aberto
    const aluguelAberto = await this.aluguelRepository.buscarAluguelAbertoPorCliente(cliente.id);
    if (aluguelAberto) {
      throw new AppError("Você já tem um aluguel em andamento", 400);
    }

    // 5. Regra: Duração mínima 24h
    const dataInicio = new Date();
    const diffEmMilissegundos = data_fim.getTime() - dataInicio.getTime();
    const diffEmHoras = diffEmMilissegundos / (1000 * 60 * 60);

    if (diffEmHoras < 24) {
      throw new AppError("O aluguel deve ter duração mínima de 24 horas", 400);
    }

    // 6. Criar Entidade
    const novoAluguel = Aluguel.create(cliente, carro, dataInicio, data_fim);

    // 7. Salvar
    await this.aluguelRepository.salvar(novoAluguel);

    // 8. Atualizar Carro
    carro.alugar(); 
    await this.carRepository.update(carro);

    this.logger.log(`[UseCase] Aluguel ${novoAluguel.id} criado com sucesso!`);
    
    return novoAluguel;
  }
}
