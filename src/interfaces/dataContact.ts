export interface IDataContact {
    id: number;
    email: string;
    pessoa: {
        id: number;
        nome: string;
        foto: {
            id: string;
            name: string;
            type: string;
        };
        cpf?: string;
        endereco?: string;
    };
    privado: boolean;
    tag: string;
    telefone: string;
    tipoContato: string;
    usuario: {
        cpf: string;
        birthDate: string; // yyyy-mm-dd
        email: string;
        id: number;
        nome: string;
        password: string;
        telefone: string; // (DD) [X]XXXX-XXXX. Ex: (12) 99876-5432, (12) 3210-4567
        username: string;
    };
}
