import type { IAluguelRepository } from "../../../domain/repositories/IAluguelRepository.js";
import { Aluguel, StatusAluguel } from "../../../domain/entities/Aluguel.js";

export class AluguelRepositoryMemory implements IAluguelRepository {
  private alugueis: Aluguel[] = [];

  async buscarAluguelAbertoPorCliente(
    clienteId: string
  ): Promise<Aluguel | null> {
    return (
      this.alugueis.find(
        a =>
          a.cliente.id_user === clienteId &&
          a.status === StatusAluguel.ABERTO
      ) ?? null
    );
  }

  async salvar(aluguel: Aluguel): Promise<void> {
    this.alugueis.push(aluguel);
  }
}
