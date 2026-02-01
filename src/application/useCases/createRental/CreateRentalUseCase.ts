import { IAluguelRepository } from "../../../domain/repositories/IAluguelRepository";
import { Aluguel } from "../../../domain/entities/Aluguel";
import { CreateRentalDTO } from "./CreateRentalDTO";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";


export class CreateRentalUseCase {
  constructor(private aluguelRepo: IAluguelRepository,
              private carRepo: ICarRepository) {}

  async execute({
    cliente,
    carro,
    data_inicio,
    data_fim
  }: CreateRentalDTO): Promise<Aluguel> {

    const carroEncontrado =
    this.carRepo.findByPlaca(carro.placa);

    if (!carroEncontrado) {
      throw new Error("Carro não encontrado");
    }

    if (!carroEncontrado.disponibilidade) {
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

    carroEncontrado.disponibilidade = false;
    this.carRepo.update(carroEncontrado);

    const aluguel = new Aluguel(
      crypto.randomUUID(),
      cliente,
      carroEncontrado,
      data_inicio,
      data_fim
    );

    await this.aluguelRepo.salvar(aluguel);

    return aluguel;
  }
}
