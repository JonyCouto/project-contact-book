<template>
    <v-form ref="form">
        <v-container-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Meu cadastro" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Nome"
                        v-model="data.nome"
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
                        v-model="data.cpf"
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
                        v-model="data.username"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Email"
                        v-model="data.email"
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
                        v-model="data.telefone"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Data de nascimento"
                        v-model="data.birthDate"
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
                        v-model="data.password"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Repita a senha"
                        v-model="retypePassword"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
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
const data: IDataUser = reactive({
    id: 0,
    nome: '',
    cpf: '',
    username: '',
    email: '',
    birthDate: '',
    telefone: '',
    password: ''
});
const retypePassword = ref('');
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
function getUser() {
    // função para carregar dados ao entrar na rota de cadastro
    console.log('Carregando usuário!');
}
function saveUser(user: IdataUser) {
    // função para salvar usuário
    console.log('Salvando!');
}
</script>

<style lang="scss">
.end {
    display: flex;
    justify-content: end;
}
</style>
