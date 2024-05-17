<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12">
                <vTitle text="Edição de pessoa" />
            </v-col>
        </v-row>
        <v-form ref="form">
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Nome"
                        v-model="data.nome"
                        :rules="rules.text"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field label="CPF" v-model="data.cpf" :rules="rules.cpf" variant="solo">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Logradouro"
                        v-model="data.endereco.logradouro"
                        :rules="rules.text"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Número"
                        v-model="data.endereco.numero"
                        :rules="rules.number"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Bairro"
                        v-model="data.endereco.bairro"
                        :rules="rules.text"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Cidade"
                        v-model="data.endereco.cidade"
                        :rules="rules.text"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="CEP"
                        v-model="data.endereco.cep"
                        :rules="rules.cep"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Estado"
                        v-model="data.endereco.estado"
                        :rules="rules.text"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="País"
                        v-model="data.endereco.pais"
                        :rules="rules.text"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-file-input label="Foto" :rules="rules.text" variant="solo" v-model="picture">
                    </v-file-input>
                </v-col>
            </v-row>
        </v-form>
        <v-row justify="end">
            <v-col cols="12" sm="3" md="2">
                <vButtonAction
                    color="red"
                    icon="mdi-cancel"
                    text="Cancelar"
                    @click="() => $router.push('/pessoas')"
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
import { ref, reactive, toRaw } from 'vue';
import { validate } from '@/global/validate';
import { useAppStore } from '@/stores/store';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import { rules } from '@/global/rules';
import {
    formatCEPToGet,
    formatCEPToSend,
    formatCPFToGet,
    formatCPFToSend
} from '@/global/formatData';
const route = useRoute();
const store = useAppStore();
const form = ref(null);
const picture = ref();
const data: IDataPerson = reactive({
    endereco: {}
});
if (route.params.id != 'novo') {
    getById();
}
async function getById() {
    await axios(`${store.getEndpoint}/api/pessoa/buscar/${route.params.id}`, {
        method: 'GET'
    })
        .then((res) => {
            const person: IDataPerson = res.data.object;
            Object.assign(data, person);
            data.cpf = formatCPFToGet(data.cpf);
            data.endereco.cep = formatCEPToGet(data.endereco.cep);
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function savePerson(data: IDataPerson) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        const payload = toRaw(data);
        payload.cpf = formatCPFToSend(payload.cpf);
        payload.endereco.cep = formatCEPToSend(payload.endereco.cep);
        // salvar a pessoa, sem ou com as informações suplementares, como id e foto
        await axios(`${store.getEndpoint}/api/pessoa/salvar`, {
            method: 'POST',
            data: payload
        })
            .then(async (res) => {
                // subir nova foto
                console.log(picture.value);
                await axios(`${store.getEndpoint}/api/foto/upload/${res.data.object.id}`, {
                    method: 'POST',
                    data: {
                        foto: picture.value
                    }
                })
                    .then((res) => {
                        store.setMsgSnackbar(res.data.message);
                        router.push('/pessoas');
                    })
                    .catch((err) => {
                        console.log(err);
                        store.setMsgSnackbar(err.message);
                    });
            })
            .catch((err) => {
                store.setMsgSnackbar(err.message);
            });
    }
}
</script>

<style></style>
