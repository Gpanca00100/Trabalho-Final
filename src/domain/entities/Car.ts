export class Car {
  constructor(
    public id: string, 
    public placa: string,
    public modelo: string,
    public marca: string,
    public ano: number,
    public disponibilidade: boolean
  ) {}

  // Lógica de Negócio: O carro sabe como ser alugado
  alugar(): void {
    if (!this.disponibilidade) {
      throw new Error("Carro indisponível para aluguel.");
    }
    this.disponibilidade = false;
  }

  // Lógica de Negócio: O carro sabe como ser devolvido
  devolver(): void {
    this.disponibilidade = true;
  }
}