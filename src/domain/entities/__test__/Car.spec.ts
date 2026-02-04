import { describe, it, expect } from 'vitest';
import { Car } from "../Car.js"; 

describe("Car Entity", () => {
  it("Deve criar um carro com as corretas propriedades", () => {
    const car = new Car(
      "Maquina-du-Mau-666",
      "SAT-0666",
      "Chevette",
      "Chevrolet",
      1971,
      true
    );

    expect(car.id).toBe("Maquina-du-Mau-666");
    expect(car.placa).toBe("SAT-0666");
    expect(car.disponibilidade).toBe(true);
  });
});