import { v4 as uuidV4 } from "uuid";
import { Cliente } from "./Cliente.js";
import { Car } from "./Car.js";

// Enum necessário para os testes e controle de estado
export enum StatusAluguel {
  ABERTO = "ABERTO",
  FINALIZADO = "FINALIZADO"
}

export class Aluguel {
  id: string;
  cliente: Cliente;
  carro: Car;
  data_inicio: Date;
  data_fim: Date;
  status: StatusAluguel;
  data_devolucao: Date | null;
  total: number | null;

  // CONSTRUTOR ÚNICO
  // Serve tanto para o 'static create' quanto para o Prisma (banco de dados)
  constructor(
    id: string,
    cliente: Cliente,
    carro: Car,
    data_inicio: Date,
    data_fim: Date,
    status: StatusAluguel = StatusAluguel.ABERTO, // Valor padrão
    data_devolucao: Date | null = null,           // Valor padrão
    total: number | null = null                   // Valor padrão
  ) {
    this.id = id;
    this.cliente = cliente;
    this.carro = carro;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    this.status = status;
    this.data_devolucao = data_devolucao;
    this.total = total;
  }

  // Factory Method: Cria um NOVO aluguel gerando o ID automaticamente
  static create(
    cliente: Cliente,
    carro: Car,
    data_inicio: Date,
    data_fim: Date
  ): Aluguel {
    const id = uuidV4(); // Gera o ID aqui
    return new Aluguel(id, cliente, carro, data_inicio, data_fim);
  }

  // Método de Negócio: Finaliza o aluguel
  finalizar(): void {
    if (this.status === StatusAluguel.FINALIZADO) {
      throw new Error("Aluguel já finalizado");
    }
    
    this.status = StatusAluguel.FINALIZADO;
    this.data_devolucao = new Date();
    
    // Libera o carro para ser alugado novamente
    this.carro.devolver(); 
  }
}