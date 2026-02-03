import type { ICliente } from "../entities/Cliente.js";

export interface IClienteRepository {
  findById(id: string): Promise<ICliente | null>;
}
