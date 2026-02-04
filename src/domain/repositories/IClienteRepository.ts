import type { Cliente } from "../entities/Cliente.js";

export interface IClienteRepository {
  findById(id: string): Promise<Cliente | null>;
}
