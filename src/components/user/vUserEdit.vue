<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12">
                <vTitle
                    :text="$route.params.id == 'novo' ? 'Adição de usuário' : 'Edição de usuário'"
                />
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
                        :rules="rules.password"
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
            <v-row>
                <v-col cols="12">
                    <v-combobox
                        :items="['ROLE_ADMIN', 'ROLE_USER']"
                        label="Permissão"
                        v-model="data.tipos[0]"
                        :rules="rules.text"
                        variant="solo"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-combobox>
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
                    @click="() => $router.push('/usuarios')"
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
</template>

<script setup lang="ts">
import vTitle from '@/templates/vTitle.vue';
import vButtonAction from '../button/vButtonAction.vue';
import type { IDataUser } from '@/interfaces/dataUser';
import { reactive, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/store';
import axios from 'axios';
import router from '@/router';
import { validate } from '@/global/validate';
import { rules } from '@/global/rules';
import {
    formatCPFToGet,
    formatCPFToSend,
    formatDateToGet,
    formatDateToSend,
    formatMobileToGet,
    formatMobileToSend
} from '@/global/formatData';
const store = useAppStore();
const route = useRoute();
const id = route.params.id;
const retypePassword = ref('');
const form = ref(null);
const rulesRetypePassword = [
    (v) => !!v || 'Prenchimento é obrigatório',
    (v) => v == data.usuario.password || 'As senhas digitadas não conferem'
];
const data: IDataUser = reactive({
    tipos: [''],
    usuario: {
        dataNascimento: '',
        cpf: '',
        email: '',
        nome: '',
        password: '',
        telefone: '',
        username: ''
    }
});
function verifyPermission() {
    if (store.getUserLogged.tipos[0] != 'ROLE_ADMIN') {
        router.push('/notAllowed');
    } else {
        if (id != 'novo') {
            getUserById(id);
        }
    }
}
async function getUserById(id) {
    await axios
        .get(`${store.getEndpoint}/api/usuario/buscar/${id}`, {
            headers: {
                Authorization: `${store.getUserLogged.tokenType} ${store.getUserLogged.accessToken}`
            }
        })
        .then((res) => {
            const user: IDataUser = res.data.object;
            Object.assign(data, user);
            data.usuario.dataNascimento = formatDateToGet(data.usuario.dataNascimento);
            data.usuario.telefone = formatMobileToGet(data.usuario.telefone);
            data.usuario.cpf = formatCPFToGet(data.usuario.cpf);
        })
        .catch((err) => {
            store.setMsgSnackbar(err.response.data.message);
        });
}
async function saveUser(data: IDataUser) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        const payload = toRaw(data);
        payload.usuario.cpf = formatCPFToSend(payload.usuario.cpf);
        payload.usuario.dataNascimento = formatDateToSend(payload.usuario.dataNascimento);
        payload.usuario.telefone = formatMobileToSend(payload.usuario.telefone);
        console.log(payload);
        await axios(`${store.getEndpoint}/api/usuario/salvar`, {
            method: 'POST',
            data: payload
        })
            .then((res) => {
                store.setMsgSnackbar(res.data.message); // rota não está alterando
                router.push('/usuarios');
            })
            .catch((err) => {
                store.setMsgSnackbar(err.message);
            });
    }
}
verifyPermission();
</script>

<style></style>
