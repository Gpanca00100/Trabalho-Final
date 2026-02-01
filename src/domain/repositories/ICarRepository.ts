import { ICar } from "../entities/Car";

export interface ICarRepository {
  findById(id: string): ICar | null;
  findByPlaca(placa: string): ICar | null;
  update(car: ICar): void;
}
