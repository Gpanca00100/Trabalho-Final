import { ICliente } from "../../../domain/entities/Cliente";
import { ICar } from "../../../domain/entities/Car";

export interface CreateRentalDTO {
  cliente: ICliente;
  carro: ICar;
  data_inicio: Date;
  data_fim: Date;
}

