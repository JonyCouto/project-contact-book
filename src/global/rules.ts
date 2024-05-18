export const rules = {
    text: [(v) => !!v || 'Prenchimento é obrigatório'],
    number: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.toString().search(/^\d+$/) != -1 || 'Campo só aceita números'
    ],
    cpf: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.search(/^\d+$/) != -1 || 'Campo só aceita números',
        (v) => v.length == 11 || 'Digite um cpf válido'
    ],
    mobile: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.search(/^\d+$/) != -1 || 'Campo só aceita números', // ^ = início e $ = final
        (v) => (v.length <= 11 && v.length >= 10) || 'Digite um número válido, DDD+número'
    ],
    password: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.length >= 8 || 'Senha muito curta',
        (v) => v.search(/[A-Z]+/i) != -1 || 'Senha deve conter letras', // i = insensitivo
        (v) => v.search(/[0-9]+/) != -1 || 'Senha deve conter números'
    ],
    email: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.search(/[@]+/) != -1 || 'Digite um email válido'
    ],
    birth: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.search(/^\d+$/) != -1 || 'Campo só aceita números',
        (v) => v.length == 8 || 'Digite uma data válida'
    ],
    cep: [
        (v) => !!v || 'Prenchimento é obrigatório',
        (v) => v.search(/^\d+$/) != -1 || 'Campo só aceita números',
        (v) => v.length == 8 || 'Digite um CEP válido'
    ]
};
