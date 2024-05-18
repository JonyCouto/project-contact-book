function formatMobileToSend(mobile: string) {
    mobile.length == 11
        ? (mobile = `(${mobile.slice(0, 2)}) ${mobile.slice(2, 7)}-${mobile.slice(7, 11)}`) // celulares
        : (mobile = `(${mobile.slice(0, 2)}) ${mobile.slice(2, 6)}-${mobile.slice(6, 10)}`); // fixos
    return mobile;
}

function formatDateToSend(date: string) {
    date = `${date.slice(0, 2)}-${date.slice(2, 4)}-${date.slice(4, 8)}`;
    const parts: Array<string> = date.split('-');
    date = `${parts[2]}-${parts[1]}-${parts[0]}`; //yyyy-mm-dd
    return date;
}

function formatCPFToSend(cpf: string) {
    cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
    return cpf;
}

function formatCEPToSend(cep: string) {
    cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
    return cep;
}

function formatDateToGet(date: string) {
    const parts: Array<string> = date.split('-');
    date = `${parts[2]}${parts[1]}${parts[0]}`; // ddmmyyyy
    return date;
}

function formatMobileToGet(mobile: string) {
    mobile = mobile?.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replace(' ', '');
    return mobile;
}

function formatCPFToGet(cpf: string) {
    cpf = cpf?.replaceAll('.', '').replaceAll('-', '');
    return cpf;
}
function formatCEPToGet(cep: string) {
    cep = cep.replaceAll('-', '');
    return cep;
}

export {
    formatDateToSend,
    formatMobileToSend,
    formatDateToGet,
    formatMobileToGet,
    formatCPFToSend,
    formatCPFToGet,
    formatCEPToSend,
    formatCEPToGet
};
