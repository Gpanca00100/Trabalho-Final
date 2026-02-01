import { Aluguel, StatusAluguel } from "../Aluguel.js";
import { Cliente } from "../Cliente.js";
import { Car } from "../Car.js";
import { describe, it, expect } from 'vitest';

describe("Aluguel Entity", () => {
  it("Deve Finalizar um Alguel corretametne", () => {
    const cliente = new Cliente(
      "Clinte_74123",
      "Edmilson Pe de Chumbo",
      "12345678900",
      "Edmilsonpdc@email.com",
      "66996123456"
    );

    const carro = new Car(
      "Maquina-du-Mau-666",
      "SAT-0666",
      "Chevette",
      "Chevrolet",
      1971,
      true
    );

    const aluguel = new Aluguel(
      "a1",
      cliente,
      carro,
      new Date("2026-01-01"),
      new Date("2026-01-05")
    );

    aluguel.finalizar();

    expect(aluguel.status).toBe(StatusAluguel.FINALIZADO);
    expect(carro.disponibilidade).toBe(true);
  });

  it("Não deve finalizar um aluguel já finalizaddo", () => {
    const cliente = new Cliente("c1", "João", "123", "x", "y");
    const carro = new Car("car1", "ABC", "Onix", "GM", 2022, true);

    const aluguel = new Aluguel(
      "a1",
      cliente,
      carro,
      new Date(),
      new Date()
    );

    aluguel.finalizar();

    expect(() => aluguel.finalizar()).toThrow();
  });
});
