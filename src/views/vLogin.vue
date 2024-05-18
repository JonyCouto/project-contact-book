<template>
    <v-container-fluid class="fullWidth">
        <v-form ref="form">
            <v-row justify="center">
                <vTitle text="Agenda de Contatos" />
            </v-row>
            <v-row justify="center">
                <v-col cols="10" md="4">
                    <v-text-field
                        label="Login"
                        v-model="data.username"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="10" md="4">
                    <v-text-field
                        label="Senha"
                        v-model="data.password"
                        type="password"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="10" md="4">
                    <v-checkbox
                        color="black"
                        v-model="preferentialLogin"
                        label="Lembrar credencias?"
                    >
                    </v-checkbox>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="10" md="4">
                    <vButtonAction
                        text="Login"
                        icon="mdi-login"
                        color="light-blue-darken-4"
                        @click="login(data)"
                    />
                </v-col>
            </v-row>
        </v-form>
    </v-container-fluid>
</template>

<script setup lang="ts">
import type { IDataLogin } from '@/interfaces/dataLogin';
import { ref, reactive } from 'vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import vTitle from '@/templates/vTitle.vue';
import { useAppStore } from '@/stores/store';
import axios from 'axios';
import { validate } from '@/global/validate';
const form = ref(null);
const store = useAppStore();
const preferentialLogin = ref(store.getPreferentialLogin);
const data: IDataLogin = reactive({
    password: '',
    username: ''
});
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!']
};
async function login(data: IDataLogin) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        await axios(`${store.getEndpoint}/api/auth/login`, {
            method: 'POST',
            data
        })
            .then((res) => {
                // salva somente se der certo o login
                if (preferentialLogin.value) {
                    store.setPreferentialLogin(true);
                    store.saveLogin(data);
                } else {
                    store.clearLogin();
                    store.setPreferentialLogin(false);
                }
                store.setMsgSnackbar('Login efetuado com sucesso!');
                store.saveUserLogged(res.data);
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    store.setMsgSnackbar('Opa, usuário e/ou senha informados errados!');
                }
            });
    }
}
function getCredencialsSaved() {
    // se houver credenciais
    if (store.getPreferentialLogin) {
        data.username = store.getSavedLogin.username;
        data.password = store.getSavedLogin.password;
    }
}
getCredencialsSaved(); // ao iniciar tentar buscar por login se a opção tiver sido liberada
</script>

<style lang="scss">
.fullWidth {
    width: 100%;
}
</style>
