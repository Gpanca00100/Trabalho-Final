import type { ICar } from "../entities/Car.js";

export interface ICarRepository {
  findById(id: string): Promise<ICar | null>;
  findByPlaca(placa: string): Promise<ICar | null>;
  update(car: ICar): void;
}
