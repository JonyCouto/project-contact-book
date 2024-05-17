<template>
    <v-container-fluid>
        <v-row>
            <v-col cols="12">
                <vTitle text="Adição de contato" />
            </v-col>
        </v-row>
        <v-form ref="form">
            <v-row>
                <v-col cols="12">
                    <v-combobox
                        label="Pessoa"
                        v-model="personSelected"
                        :rules="rules.text"
                        :items="people"
                        itemTitle="nome"
                        variant="solo"
                    >
                    </v-combobox>
                </v-col>
                <v-col cols="12">
                    <v-combobox
                        label="Usuário"
                        v-model="userSelected"
                        :rules="rules.text"
                        :items="users"
                        itemTitle="nome"
                        variant="solo"
                    >
                    </v-combobox>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Email"
                        v-model="data.email"
                        :rules="rules.email"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Telefone"
                        v-model="data.telefone"
                        :rules="rules.mobile"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field label="Tag" v-model="data.tag" :rules="rules.text" variant="solo">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-combobox
                        label="Tipo contato"
                        v-model="data.tipoContato"
                        :rules="rules.text"
                        :items="['CELULAR', 'EMAIL', 'TELEFONE']"
                        variant="solo"
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
import { ref, Ref } from 'vue';
import { validate } from '@/global/validate';
import { useAppStore } from '@/stores/store';
import axios from 'axios';
import { rules } from '@/global/rules';
import { formatMobileToSend } from '@/global/formatData';
import router from '@/router';
import type { IDataPerson } from '@/interfaces/dataPerson';
import type { IDataUserOnlyObject } from '@/interfaces/dataUserOnlyObject';
const store = useAppStore();
const form = ref(null);
const userSelected: Ref<IDataUserOnlyObject> = ref({
    nome: ''
});
const users: Array<IDataUserOnlyObject> = reactive([]);
const personSelected: Ref<IDataPerson> = ref({
    nome: ''
});
const people: Array<IDataPerson> = reactive([]);
let data: IDataContact = reactive({
    pessoa: {}
});
async function loadPeople() {
    await axios(`${store.getEndpoint}/api/pessoa/pesquisar`, {
        method: 'POST',
        data: {
            nome: ''
        }
    })
        .then((res) => {
            const data: Array<IDataPerson> = res.data;
            data.forEach((element) => {
                people.push({ ...element });
            });
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function loadUsers() {
    await axios(`${store.getEndpoint}/api/usuario/pesquisar`, {
        method: 'POST',
        data: {
            termo: ''
        }
    })
        .then((res) => {
            const data: Array<IDataUserOnlyObject> = res.data;
            data.forEach((el) => {
                users.push({ ...el });
            });
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
        payload.pessoa = personSelected.value;
        payload.usuario = userSelected.value;
        // setar pessoa selecionada no objeto
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
loadPeople();
loadUsers();
</script>

<style></style>
