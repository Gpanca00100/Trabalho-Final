import type{ ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import type { ICar } from "../../../domain/entities/Car.js";

export class InMemoryCarRepository implements ICarRepository {
  private carros: ICar[] = [];

  async findById(id: string): Promise<ICar | null> {
    const car = this.carros.find(c => c.id_car === id);
    return car ?? null;
  }

  async findByPlaca(placa: string): Promise<ICar | null> {
    const car = this.carros.find(c => c.placa === placa);
    return car ?? null;
  }

  async update(car: ICar): Promise<void> {
    const index = this.carros.findIndex(c => c.id_car === car.id_car);

    if (index !== -1) {
      this.carros[index] = car;
    }
  }

  // auxiliar para testes
  async save(car: ICar): Promise<void> {
    this.carros.push(car);
  }
}

