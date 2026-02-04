import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import { Car } from "../../../domain/entities/Car.js";

const prisma = new PrismaClient();

@injectable()
export class PrismaCarRepository implements ICarRepository {
  async findById(id: string): Promise<Car | null> {
    const data = await prisma.car.findUnique({ where: { id } });
    if (!data) return null;
    return new Car(data.id, data.license_plate, data.model, data.brand, data.year, data.available);
  }

  async findByPlaca(placa: string): Promise<Car | null> {
    const data = await prisma.car.findUnique({ where: { license_plate: placa } });
    if (!data) return null;
    return new Car(data.id, data.license_plate, data.model, data.brand, data.year, data.available);
  }

  async update(car: Car): Promise<void> {
    await prisma.car.update({
      where: { id: car.id },
      data: { available: car.disponibilidade }
    });
  }
  
  // Método auxiliar para criar dados iniciais
  async save(car: Car): Promise<void> {
    await prisma.car.create({
      data: {
        id: car.id,
        license_plate: car.placa,
        model: car.modelo,
        brand: car.marca,
        year: car.ano,
        available: car.disponibilidade
      }
    });
  }
}