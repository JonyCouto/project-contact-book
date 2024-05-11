export interface IDataPerson {
    id: number;
    nome: string;
    foto: {
        id: string;
        name: string;
        type: string;
    };
    cpf: string;
    endereco: string;
}
