<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Contatos" />
                </v-col>
            </v-row>
            <v-row class="space"> </v-row>
            <v-text-field
                v-model="search"
                label="Procurar"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
                class="space"
            ></v-text-field>
            <v-row cols="12">
                <v-data-table
                    :headers="headersTable"
                    :items="itemsTable"
                    :search="search"
                    itemsPerPageText="Itens por página"
                    :class="store.getTheme ? ['tableDark', 'space'] : 'space'"
                >
                    <template v-slot:[`item.foto`]="{ item }">
                        <v-avatar>
                            <v-img
                                :src="`${item.pessoa.foto.name}.${item.pessoa.foto.type}`"
                                alt="foto"
                            ></v-img>
                        </v-avatar>
                    </template>
                    <template v-slot:[`item.privado`]="{ item }">
                        <v-checkbox
                            v-model="item.privado"
                            :label="item.privado ? 'Sim' : 'Não'"
                            color="orange"
                            :readonly="true"
                        ></v-checkbox>
                    </template>
                    <template v-slot:[`item.editar`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`/:${item.id}`"
                            icon="mdi-pencil"
                            text=""
                            :hide="true"
                            color="#FBC02D"
                            :minWidth="true"
                        />
                    </template>
                    <template v-slot:[`item.excluir`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`/:${item.id}`"
                            icon="mdi-delete"
                            text=""
                            :hide="true"
                            color="red"
                            :minWidth="true"
                        />
                    </template>
                </v-data-table>
            </v-row>
        </v-containeir-fluid>
    </div>
</template>

<script setup lang="ts">
import vButtonRedirect from '@/components/button/vButtonRedirect.vue';
import { ref, reactive } from 'vue';
import { type IHeadersTable } from '@/interfaces/headersTable';
import axios from 'axios';
import { type IDataContact } from '@/interfaces/dataContact';
import vTitle from '@/templates/vTitle.vue';
import { useAppStore } from '@/stores/store';
const store = useAppStore();
const search = ref('');
const headersTable: Array<IHeadersTable> = [
    {
        align: 'center',
        key: 'foto',
        sortable: false,
        title: 'Foto'
    },
    {
        align: 'center',
        key: 'nome',
        sortable: true,
        title: 'Nome'
    },
    {
        align: 'center',
        key: 'email',
        sortable: true,
        title: 'Email'
    },
    {
        align: 'center',
        key: 'telefone',
        sortable: true,
        title: 'Telefone'
    },
    {
        align: 'center',
        key: 'tipoContato',
        sortable: true,
        title: 'Tipo de Contato'
    },
    {
        align: 'center',
        key: 'tag',
        sortable: true,
        title: 'Tag'
    },
    {
        align: 'center',
        key: 'privado',
        sortable: true,
        title: 'Privado'
    },
    {
        align: 'center',
        key: 'editar',
        sortable: false,
        title: 'Editar'
    },
    {
        align: 'center',
        key: 'excluir',
        sortable: false,
        title: 'Excluir'
    }
];
const itemsTable: Array<IDataContact> = reactive([
    {
        id: 1,
        email: '',
        pessoa: {
            id: 1,
            nome: '',
            foto: {
                id: '1',
                name: '',
                type: ''
            },
            cpf: '',
            endereco: ''
        },
        privado: false,
        tag: '',
        telefone: '',
        tipoContato: '',
        usuario: {
            cpf: '',
            dataNascimento: '', // yyyy-mm-dd
            email: '',
            id: 1,
            nome: '',
            password: '',
            telefone: '', // (DD) [X]XXXX-XXXX. Ex: (12) 99876-5432, (12) 3210-4567
            username: ''
        }
    }
]);
async function loadUsers() {}
loadUsers();
</script>

<style lang="scss" scoped>
.space {
    margin-top: 10px;
}
</style>
