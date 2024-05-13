<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12">
                <vTitle text="Edição de usuário" />
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
                <v-text-field label="CPF" v-model="data.cpf" :rules="rules.ruleCpf" variant="solo">
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
</template>

<script setup lang="ts">
import vTitle from '@/templates/vTitle.vue';
import vButtonAction from '../button/vButtonAction.vue';
import type { IDataUser } from '@/interfaces/dataUser';
import { ref } from 'vue';
const retypePassword = ref('');
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
const data: IDataUser = {
    birthDate: '',
    cpf: '',
    email: '',
    id: 1,
    nome: '',
    password: '',
    telefone: '',
    username: ''
};
function saveUser(data: IDataUser) {
    console.log('Salvando');
}
</script>

<style></style>
