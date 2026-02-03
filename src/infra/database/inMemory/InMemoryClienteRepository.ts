import type { IClienteRepository } from "../../../domain/repositories/IClienteRepository.js";
import type { ICliente } from "../../../domain/entities/Cliente.js";

export class InMemoryClienteRepository implements IClienteRepository {
  private clientes: ICliente[] = [];

  async findById(id: string): Promise<ICliente | null> {
    const cliente = this.clientes.find(c => c.id_user === id);
    return cliente ?? null;
  }

  // método auxiliar para testes
  async save(cliente: ICliente): Promise<void> {
    this.clientes.push(cliente);
  }
}
