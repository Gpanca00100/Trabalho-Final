import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IClienteRepository } from "../../../domain/repositories/IClienteRepository.js";
import { Cliente } from "../../../domain/entities/Cliente.js";

const prisma = new PrismaClient();

@injectable()
export class PrismaClienteRepository implements IClienteRepository {
  async findById(id: string): Promise<Cliente | null> {
    const data = await prisma.user.findUnique({ where: { id } });
    if (!data) return null;
    return new Cliente(data.id, data.name, data.driver_license, data.email, "000000000");
  }

  async save(cliente: Cliente): Promise<void> {
    await prisma.user.create({
      data: {
        id: cliente.id,
        name: cliente.nome,
        email: cliente.email,
        driver_license: cliente.cpf
      }
    });
  }
}