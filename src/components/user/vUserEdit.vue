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
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="CPF"
                        v-model="data.usuario.cpf"
                        :rules="rules.ruleCpf"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Username"
                        v-model="data.usuario.username"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Email"
                        v-model="data.usuario.email"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Telefone"
                        v-model="data.usuario.telefone"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Data de nascimento"
                        v-model="data.usuario.dataNascimento"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Senha"
                        v-model="data.usuario.password"
                        :rules="rules.ruleText"
                        type="password"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Repita a senha"
                        v-model="retypePassword"
                        :rules="rules.ruleText"
                        type="password"
                        variant="solo"
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
                        variant="solo"
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
                    @click="() => $router.back()"
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
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/store';
import axios from 'axios';
import router from '@/router';
import { validate } from '@/global/validate';
const store = useAppStore();
const route = useRoute();
const id = route.params.id;
const retypePassword = ref('');
const form = ref(null);
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
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
            data.tipos = user.tipos;
            data.usuario.dataNascimento = user.usuario.dataNascimento;
            data.usuario.cpf = user.usuario.cpf;
            data.usuario.id = user.usuario.id;
            data.usuario.password = user.usuario.password;
            data.usuario.telefone = user.usuario.telefone;
            data.usuario.email = user.usuario.email;
            data.usuario.username = user.usuario.username;
            data.usuario.nome = user.usuario.nome;
        })
        .catch((err) => {
            store.setMsgSnackbar(err.response.data.message);
        });
}
async function saveUser(data: IDataUser) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        await axios
            .post(`${store.getEndpoint}/api/usuario/salvar`, {
                data
            })
            .then((res) => {
                store.setMsgSnackbar(
                    id != 'novo' ? 'Alteração feita com sucesso!' : 'Usuário criado com sucesso!'
                );
                router.push('/usuarios');
            })
            .catch((err) => {
                console.log(err);
                store.setMsgSnackbar(err.message);
            });
    }
}
verifyPermission();
</script>

<style></style>
