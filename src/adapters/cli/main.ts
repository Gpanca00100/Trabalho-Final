import "reflect-metadata"; 
import { container } from "../../infra/container/index.js"; 
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando CLI...");

  try {
    const cliente = await prisma.user.upsert({
      where: { email: "teste@email.com" },
      update: {},
      create: {
        name: "Gabriel Zardini",
        email: "teste@email.com",
        driver_license: "12345678900"
      }
    });

    const carro = await prisma.car.upsert({
      where: { license_plate: "TST-9999" },
      update: { available: true },
      create: {
        license_plate: "TST-9999",
        model: "Tesla Model X",
        brand: "Tesla",
        year: 2024,
        available: true
      }
    });

    console.log(`Cliente: ${cliente.id}`);
    console.log(`Carro: ${carro.id}`);

    const createRental = container.get(CreateRentalUseCase);
    
    const aluguel = await createRental.execute({
      clienteId: cliente.id,
      carroId: carro.id,
      data_fim: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
    });

    console.log("SUCESSO! Aluguel criado.");
    console.log("ID do Aluguel:", aluguel.id);
    console.log("Data Fim:", aluguel.data_fim);

  } catch (err: any) {
    const status = err.statusCode ? err.statusCode : 500;
    console.error(`Erro [${status}]: ${err.message}`);
  }
}

main();