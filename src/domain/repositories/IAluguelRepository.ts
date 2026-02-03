import { Aluguel } from "../entities/Aluguel.js";

//durante o processo de quebrar do monolítico para as pastas, aproveitei e coloquei a Promisse
// no retorno dos Métodos, afinal, conectar-se com o BD pode ser assincrono.
export interface IAluguelRepository {
  buscarAluguelAbertoPorCliente(clienteId: string): Promise<Aluguel | null>;
  salvar(aluguel: Aluguel): Promise<void>;
}
