import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IAluguelRepository } from "../../../domain/repositories/IAluguelRepository.js";
import { Aluguel } from "../../../domain/entities/Aluguel.js";
import { Cliente } from "../../../domain/entities/Cliente.js";
import { Car } from "../../../domain/entities/Car.js";

const prisma = new PrismaClient();

@injectable()
export class PrismaAluguelRepository implements IAluguelRepository {
  async buscarAluguelAbertoPorCliente(clienteId: string): Promise<Aluguel | null> {
    // Regra simplificada: Se tem aluguel que termina no futuro, está aberto
    const rental = await prisma.rental.findFirst({
      where: { user_id: clienteId, end_date: { gt: new Date() } },
      include: { car: true, user: true }
    });

    if (!rental) return null;

    const cliente = new Cliente(rental.user.id, rental.user.name, rental.user.driver_license, rental.user.email, "000");
    const carro = new Car(rental.car.id, rental.car.license_plate, rental.car.model, rental.car.brand, rental.car.year, rental.car.available);

    return new Aluguel(rental.id, cliente, carro, rental.start_date, rental.end_date);
  }

  async salvar(aluguel: Aluguel): Promise<void> {
    await prisma.rental.create({
      data: {
        id: aluguel.id_aluguel,
        start_date: aluguel.data_inicio,
        end_date: aluguel.data_fim,
        user_id: aluguel.cliente.id,
        car_id: aluguel.carro.id
      }
    });
  }
}