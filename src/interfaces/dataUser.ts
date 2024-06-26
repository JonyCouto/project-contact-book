export interface IDataUser {
    tipos: [string];
    usuario: {
        cpf: string;
        dataNascimento: string; // yyyy-mm-dd
        email: string;
        id?: number;
        nome: string;
        password: string;
        telefone: string; // (DD) [X]XXXX-XXXX. Ex: (12) 99876-5432, (12) 3210-4567
        username: string;
    };
}
