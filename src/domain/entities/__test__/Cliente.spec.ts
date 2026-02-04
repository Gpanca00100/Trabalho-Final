import { Cliente } from "../Cliente.js"; 
import { describe, it, expect } from 'vitest';

describe("Cliente Entity", () => {
  it("Deve Criar um Cliente com os dados corretos", () => {
    const cliente = new Cliente(
      "Clinte_74123",
      "Edmilson Pe de Chumbo",
      "12345678900",
      "Edmilsonpdc@email.com",
      "66996123456"
    );

    expect(cliente.id).toBe("Clinte_74123");
    expect(cliente.nome).toBe("Edmilson Pe de Chumbo");
    expect(cliente.cpf).toBe("12345678900");
    expect(cliente.email).toBe("Edmilsonpdc@email.com");
    expect(cliente.telefone).toBe("66996123456");
  });
});