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
                    <v-text-field label="Nome" v-model="data.pessoa.nome" variant="solo" readonly>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Email"
                        v-model="data.email"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Telefone"
                        v-model="data.telefone"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="Tag"
                        v-model="data.tag"
                        :rules="rules.ruleText"
                        variant="solo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-combobox
                        label="Tipo contato"
                        v-model="data.tipoContato"
                        :rules="rules.ruleText"
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
                    @click="() => $router.back()"
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
import { reactive } from 'vue';
import { ref } from 'vue';
import { validate } from '@/global/validate';
import { useAppStore } from '@/stores/store';
const store = useAppStore();
const form = ref(null);
const rules = {
    ruleText: [(v) => !!v || 'Preenchimento é obrigatório!'],
    ruleCpf: [(v) => !!v || 'Preenchimento é obrigatório!']
};
const data: IDataContact = reactive({
    email: '',
    id: 1,
    pessoa: {
        foto: {
            id: '1',
            name: '',
            type: ''
        },
        id: 1,
        nome: '',
        cpf: '',
        endereco: ''
    },
    privado: false,
    tag: '',
    telefone: '',
    tipoContato: '',
    usuario: {
        dataNascimento: '',
        cpf: '',
        email: '',
        id: 1,
        nome: '',
        password: '',
        telefone: '',
        username: ''
    }
});
async function saveContact(data: IDataContact) {
    if (await validate(form)) {
        store.setMsgSnackbar('Aguarde...');
        // salvar contato
    }
}
</script>

<style></style>
