import { Aluguel } from "../entities/Aluguel.js";
export interface IAluguelRepository {
  buscarAluguelAbertoPorCliente(clienteId: string): Promise<Aluguel | null>;
  salvar(aluguel: Aluguel): Promise<void>;
}
