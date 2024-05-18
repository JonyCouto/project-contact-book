<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12">
                <vTitle text="Edição de contato" />
            </v-col>
        </v-row>
        <v-form ref="form">
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Nome"
                        v-model="data.pessoa.nome"
                        variant="solo"
                        readonly
                        :rules="rules.text"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Email"
                        v-model="data.email"
                        :rules="rules.email"
                        variant="solo"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Telefone"
                        v-model="data.telefone"
                        :rules="rules.mobile"
                        variant="solo"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Tag"
                        v-model="data.tag"
                        :rules="rules.text"
                        variant="solo"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-combobox
                        label="Tipo contato"
                        v-model="data.tipoContato"
                        :rules="rules.text"
                        :items="['CELULAR', 'EMAIL', 'TELEFONE']"
                        variant="solo"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-combobox>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-checkbox
                        label="Privado"
                        v-model="data.privado"
                        variant="solo"
                        color="orange"
                        :theme="store.getTheme ? 'dark' : ''"
                    >
                    </v-checkbox>
                </v-col>
            </v-row>
        </v-form>
        <v-row justify="end">
            <v-col cols="12" sm="3" md="2">
                <vButtonAction
                    color="red"
                    icon="mdi-cancel"
                    text="Cancelar"
                    @click="() => $router.push('/contatos')"
                />
            </v-col>
            <v-col c cols="12" sm="3" md="2">
                <vButtonAction
                    color="green"
                    icon="mdi-content-save"
                    text="Salvar"
                    @click="saveContact(data)"
                />
            </v-col>
        </v-row>
    </v-container-fluid>
</template>

<script setup lang="ts">
import vTitle from '@/templates/vTitle.vue';
import vButtonAction from '../button/vButtonAction.vue';
import type { IDataContact } from '@/interfaces/dataContact';
import { reactive, toRaw } from 'vue';
import { ref } from 'vue';
import { validate } from '@/global/validate';
import { useAppStore } from '@/stores/store';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { rules } from '@/global/rules';
import { formatMobileToGet, formatMobileToSend } from '@/global/formatData';
import router from '@/router';
const route = useRoute();
const store = useAppStore();
const form = ref(null);
let data: IDataContact = reactive({
    pessoa: {}
});
async function getById() {
    await axios(`${store.getEndpoint}/api/contato/listar/${route.params.id}`, {
        method: 'GET'
    })
        .then((res) => {
            const contact: Array<IDataContact> = res.data;
            const contactToModify: IDataContact = contact.find(
                (el) => `${el.id}` == route.params.idContact
            );
            Object.assign(data, contactToModify); // método para realizar destructure do objeto pesquisada em um objeto reactive
            data.telefone = formatMobileToGet(data.telefone); // somente o telefone deve ser formato, os demais dados não são alterados por aqui
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function saveContact(data: IDataContact) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        const payload = toRaw(data);
        payload.telefone = formatMobileToSend(data.telefone);
        // salvar contato
        await axios(`${store.getEndpoint}/api/contato/salvar`, {
            method: 'POST',
            data: payload
        })
            .then((res) => {
                store.setMsgSnackbar(res.data.message);
                router.push('/contatos');
            })
            .catch((err) => {
                store.setMsgSnackbar(err.message);
            });
    }
}
getById();
</script>

<style></style>
