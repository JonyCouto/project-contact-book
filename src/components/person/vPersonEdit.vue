<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12">
                <vTitle text="Edição de pessoa" />
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
                <v-text-field label="CPF" v-model="data.cpf" :rules="rules.ruleText" variant="solo">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    label="Endereço"
                    v-model="data.endereco"
                    :rules="rules.ruleText"
                    variant="solo"
                >
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input label="Foto" :rules="rules.ruleText" variant="solo" v-model="picture">
                </v-file-input>
            </v-col>
        </v-row>
        <v-row justify="end">
            <v-col cols="12" sm="3" md="2">
                <vButtonAction
                    color="red"
                    icon="mdi-cancel"
                    text="Cancelar"
                    @click="() => $router.back()"
                />
            </v-col>
            <v-col c cols="12" sm="3" md="2">
                <vButtonAction
                    color="green"
                    icon="mdi-content-save"
                    text="Salvar"
                    @click="savePerson(data)"
                />
            </v-col>
        </v-row>
    </v-container-fluid>
</template>

<script setup lang="ts">
import vTitle from '@/templates/vTitle.vue';
import vButtonAction from '../button/vButtonAction.vue';
import type { IDataPerson } from '@/interfaces/dataPerson';
import { ref, reactive } from 'vue';
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
const picture = ref();
const data: IDataPerson = reactive({
    foto: {
        id: '1',
        name: '',
        type: ''
    },
    id: 1,
    nome: '',
    cpf: '',
    endereco: ''
});
function savePerson(data: IDataPerson) {}
</script>

<style></style>
