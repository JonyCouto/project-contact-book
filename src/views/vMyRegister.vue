<template>
    <v-form ref="form">
        <v-container-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Meu cadastro" />
                </v-col>
            </v-row>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="Nome"
                            v-model="data.usuario.nome"
                            :rules="rules.text"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="CPF"
                            v-model="data.usuario.cpf"
                            :rules="rules.cpf"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Username"
                            v-model="data.usuario.username"
                            :rules="rules.text"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Email"
                            v-model="data.usuario.email"
                            :rules="rules.email"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Telefone"
                            v-model="data.usuario.telefone"
                            :rules="rules.mobile"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Data de nascimento"
                            v-model="data.usuario.dataNascimento"
                            :rules="rules.birth"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Senha"
                            v-model="data.usuario.password"
                            :rules="rules.text"
                            type="password"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Repita a senha"
                            v-model="retypePassword"
                            :rules="rulesRetypePassword"
                            type="password"
                            variant="solo"
                            :theme="store.getTheme ? 'dark' : ''"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-form>
            <v-row justify="end">
                <v-col cols="12" sm="3" md="2" class="end">
                    <vButtonAction
                        :color="'red'"
                        :hide="false"
                        icon="mdi-cancel"
                        text="Cancelar"
                        @click="() => router.push('/')"
                    />
                </v-col>
                <v-col cols="12" sm="3" md="2" class="end">
                    <vButtonAction
                        :color="'green'"
                        :hide="false"
                        icon="mdi-content-save"
                        text="Salvar"
                        @click="saveUser(data)"
                    />
                </v-col>
            </v-row>
        </v-container-fluid>
    </v-form>
</template>

<script setup lang="ts">
import vTitle from '@/templates/vTitle.vue';
import axios from 'axios';
import { type IDataUser } from '@/interfaces/dataUser';
import { reactive, ref, toRaw } from 'vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import { useAppStore } from '@/stores/store';
import { validate } from '@/global/validate';
import { rules } from '@/global/rules';
import router from '@/router';
import {
    formatCPFToGet,
    formatCPFToSend,
    formatDateToGet,
    formatDateToSend,
    formatMobileToGet,
    formatMobileToSend
} from '@/global/formatData';
const store = useAppStore();
const form = ref(null);
const rulesRetypePassword = [
    (v) => !!v || 'Prenchimento é obrigatório',
    (v) => v == data.usuario.password || 'As senhas digitadas não conferem'
];
const data: IDataUser = reactive({
    tipos: [''],
    usuario: {
        id: -1,
        nome: '',
        cpf: '',
        username: '',
        email: '',
        dataNascimento: '',
        telefone: '',
        password: ''
    }
});
const retypePassword = ref('');
async function getUserById(id) {
    // função para carregar dados ao entrar na rota de cadastro
    await axios
        .get(`${store.getEndpoint}/api/usuario/buscar/${id}`, {
            headers: {
                Authorization: `${store.getUserLogged.tokenType} ${store.getUserLogged.accessToken}`
            }
        })
        .then((res) => {
            const user: IDataUser = res.data.object;
            user.usuario.cpf = formatCPFToGet(user.usuario.cpf);
            user.usuario.dataNascimento = formatDateToGet(user.usuario.dataNascimento);
            user.usuario.telefone = formatMobileToGet(user.usuario.telefone);
            Object.assign(data, user);
        })
        .catch((err) => {
            store.setMsgSnackbar(err.response.data.message);
        });
}
async function saveUser(user: IDataUser) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        const payload = toRaw(data);
        payload.usuario.cpf = formatCPFToSend(payload.usuario.cpf);
        payload.usuario.dataNascimento = formatDateToSend(payload.usuario.dataNascimento);
        payload.usuario.telefone = formatMobileToSend(payload.usuario.telefone);
        // função para salvar usuário
        await axios(`${store.getEndpoint}/api/usuario/atualizar`, {
            method: 'PUT',
            data: payload.usuario
        })
            .then((res) => {
                store.setMsgSnackbar('Alteração feita com sucesso!');
                router.push('/');
            })
            .catch((err) => {
                store.setMsgSnackbar(err.message);
            });
    }
}
getUserById(store.getUserLogged.id);
</script>

<style lang="scss">
.end {
    display: flex;
    justify-content: end;
}
</style>
