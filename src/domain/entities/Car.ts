export interface ICar {
  id_car: string;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  disponibilidade: boolean;
}

export class Car implements ICar {
  constructor(
    public id_car: string,
    public placa: string,
    public modelo: string,
    public marca: string,
    public ano: number,
    public disponibilidade: boolean
  ) {}
}
