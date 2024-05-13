<template>
    <v-container-fluid class="fullWidth">
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
                <v-checkbox color="black" v-model="saveCredentials" label="Lembrar credencias?">
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
    </v-container-fluid>
</template>

<script setup lang="ts">
import type { IDataLogin } from '@/interfaces/dataLogin';
import { ref, reactive } from 'vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import vTitle from '@/templates/vTitle.vue';
const saveCredentials = ref(false);
const data: IDataLogin = reactive({
    password: '',
    username: ''
});
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
function login(data: IDataLogin) {
    if (saveCredentials.value) {
        // salvar em cache, criptografar credenciais para ficar mais seguro
    }
    console.log('login!');
}
function getCredencialsSaved() {
    // se houver credenciais
}
</script>

<style lang="scss">
.fullWidth {
    width: 100%;
}
</style>
