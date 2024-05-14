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
    </v-form>
</template>

<script setup lang="ts">
import vTitle from '@/templates/vTitle.vue';
import axios from 'axios';
import { type IDataUser } from '@/interfaces/dataUser';
import { reactive, ref } from 'vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import { useAppStore } from '@/stores/store';
import { validate } from '@/global/validate';
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute();
const store = useAppStore();
const form = ref(null);
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
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
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
async function saveUser(user: IDataUser) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        // função para salvar usuário
        await axios
            .post(`${store.getEndpoint}/api/usuario/salvar`, {
                data
            })
            .then((res) => {
                store.setMsgSnackbar('Alteração feita com sucesso!');
                router.push('/home');
            })
            .catch((err) => {
                console.log(err);
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
