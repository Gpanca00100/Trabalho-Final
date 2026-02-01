import { ICliente } from "./Cliente";
import { ICar } from "./Car";
export enum StatusAluguel {
  ABERTO = "ABERTO",
  FINALIZADO = "FINALIZADO"
}

export class Aluguel {
  constructor(
    public id_aluguel: string,
    public cliente: ICliente,
    public carro: ICar,
    public data_inicio: Date,
    public data_fim: Date,
    public status: StatusAluguel = StatusAluguel.ABERTO
  ) {}

  finalizar() {
    if (this.status === StatusAluguel.FINALIZADO) {
      throw new Error("Aluguel já finalizado");
    }

    this.status = StatusAluguel.FINALIZADO;
    this.carro.disponibilidade = true;
  }
}
