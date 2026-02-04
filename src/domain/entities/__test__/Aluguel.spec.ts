import { describe, it, expect } from "vitest";
import { Aluguel, StatusAluguel } from "../Aluguel.js";
import { Cliente } from "../Cliente.js";
import { Car } from "../Car.js";

describe("Aluguel Entity", () => {
  it("Deve criar uma instância de aluguel corretamente", () => {
    const cliente = new Cliente(
      "user-123",
      "Edmilson Pe de Chumbo",
      "12345678900",
      "email@teste.com",
      "999999999"
    );

    const carro = new Car(
      "car-666",
      "SAT-0666",
      "Chevette",
      "Chevrolet",
      1971,
      true
    );

    const aluguel = Aluguel.create(
      cliente,
      carro,
      new Date("2026-01-01"),
      new Date("2026-01-05")
    );

    expect(aluguel.id).toBeDefined();
    expect(aluguel.status).toBe(StatusAluguel.ABERTO);
    expect(aluguel.cliente.nome).toBe("Edmilson Pe de Chumbo");
  });

  it("Deve finalizar um aluguel corretamente e devolver o carro", () => {
    const cliente = new Cliente("user-1", "João", "123", "x", "y");
    const carro = new Car("car-1", "ABC", "Onix", "GM", 2022, false);

    const aluguel = new Aluguel(
      "aluguel-1",
      cliente,
      carro,
      new Date(),
      new Date()
    );

    aluguel.finalizar();

    expect(aluguel.status).toBe(StatusAluguel.FINALIZADO);
    expect(aluguel.data_devolucao).toBeInstanceOf(Date);
    expect(carro.disponibilidade).toBe(true);
  });

  it("Não deve permitir finalizar um aluguel que já foi finalizado", () => {
    const cliente = new Cliente("user-1", "João", "123", "x", "y");
    const carro = new Car("car-1", "ABC", "Onix", "GM", 2022, true);

    const aluguel = new Aluguel(
      "aluguel-1",
      cliente,
      carro,
      new Date(),
      new Date(),
      StatusAluguel.FINALIZADO
    );

    expect(() => aluguel.finalizar()).toThrow("Aluguel já finalizado");
  });
});