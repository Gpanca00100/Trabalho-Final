export interface ICliente {
  id_user: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export class Cliente implements ICliente {
  constructor(
    public id_user: string,
    public nome: string,
    public cpf: string,
    public email: string,
    public telefone: string
  ) {}
}
