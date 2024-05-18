export interface IDataPerson {
    id: number;
    nome: string;
    foto: {
        id: string;
        name: string;
        type: string;
        img?: string;
    };
    cpf: string;
    endereco: {
        bairro: string;
        cep: string;
        cidade: string;
        estado: string;
        id: number;
        logradouro: string;
        numero: number;
        pais: string;
    };
}
