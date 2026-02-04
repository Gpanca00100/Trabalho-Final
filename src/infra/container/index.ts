import "reflect-metadata";
import { Container } from "inversify";

// Interfaces
import { ICarRepository } from "../../domain/repositories/ICarRepository.js";
import { IClienteRepository } from "../../domain/repositories/IClienteRepository.js";
import { IAluguelRepository } from "../../domain/repositories/IAluguelRepository.js";
import { Logger } from "../../domain/Logger/Logger.js";

// Implementações Reais (Prisma)
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository.js";
import { PrismaClienteRepository } from "../database/prisma/PrismaClienteRepository.js";
import { PrismaAluguelRepository } from "../database/prisma/PrismaAluguelRepository.js";
import { ConsoleLogger } from "../logger/ConsoleLogger.js";

// Caso de Uso
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";

const container = new Container();

// --- Configuração das Dependências (Bindings) ---

// 1. Repositórios (Ligando Interface -> Classe Prisma)
container.bind<ICarRepository>("ICarRepository").to(PrismaCarRepository);
container.bind<IClienteRepository>("IClienteRepository").to(PrismaClienteRepository);
container.bind<IAluguelRepository>("IAluguelRepository").to(PrismaAluguelRepository);

// 2. Logger
container.bind<Logger>("Logger").to(ConsoleLogger);

// 3. Casos de Uso
container.bind<CreateRentalUseCase>(CreateRentalUseCase).toSelf();

export { container };