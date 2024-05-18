import { useAppStore } from '@/stores/store';
import axios from 'axios';

const store = useAppStore();

export async function revalideLogin(): Promise<boolean> {
    if (store.getPreferentialLogin == true) {
        store.setMsgSnackbar('Aguarde...');
        const data = store.getSavedLogin;
        await axios(`${store.getEndpoint}/api/auth/login`, {
            method: 'POST',
            data
        })
            .then((res) => {
                // salva somente se der certo o login
                if (store.getPreferentialLogin) {
                    store.saveLogin(data);
                }
                store.saveUserLogged(res.data);
                return true; // retorna verdadeiro se somente salvar o login
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    store.setMsgSnackbar('Opa, usuário e/ou senha informados errados!');
                }
                return false; // retorna falso se não refazer o login
            });
        return false; // retorna falso se não realizar o axios
    } else {
        store.logoutUser();
        store.setMsgSnackbar('Sessão expirada!');
        return false; // retorna falso se não refazer o login
    }
}
