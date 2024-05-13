<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Pessoas" />
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
                            <v-img :src="`${item.foto.name}.${item.foto.type}`" alt="foto"></v-img>
                        </v-avatar>
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
                            color="#DD2C00"
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
import { type IDataPerson } from '@/interfaces/dataPerson';
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
        key: 'editar',
        sortable: true,
        title: 'Editar'
    },
    {
        align: 'center',
        key: 'excluir',
        sortable: true,
        title: 'Excluir'
    }
];
const itemsTable: Array<IDataPerson> = reactive([
    {
        id: 1,
        cpf: '12864523680',
        endereco: 'Av. São Vicente, 4100, Bloco 4 ap 303',
        foto: {
            id: '1',
            name: 'https://randomuser.me/api/portraits/women/85',
            type: 'jpg'
        },
        nome: 'Jonathan Vinicius Couto'
    },
    {
        id: 2,
        cpf: '70071870059',
        endereco: 'Irlanda',
        foto: {
            id: '2',
            name: 'https://randomuser.me/api/portraits/women/85',
            type: 'jpg'
        },
        nome: 'Henrique Eduardo Couto'
    }
]);
async function loadPeople() {}
loadPeople();
</script>

<style lang="scss" scoped>
.space {
    margin-top: 10px;
}
</style>
