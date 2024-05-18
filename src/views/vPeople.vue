<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Pessoas" />
                </v-col>
            </v-row>
            <v-row class="space"> </v-row>
            <v-row justify="end">
                <v-col cols="12">
                    <vButtonRedirect
                        :external="false"
                        link="pessoas/editar/novo"
                        icon="mdi-plus"
                        :hide="false"
                        color="blue"
                        text="Adicionar"
                        :min-width="true"
                        class="end"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="search"
                        label="Procurar"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        hide-details
                        single-line
                        class="space"
                        :theme="store.getTheme ? 'dark' : ''"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row cols="12">
                <v-data-table
                    :headers="headersTable"
                    :items="itemsTable"
                    :search="search"
                    itemsPerPageText="Itens por página"
                    noDataText="Sem dados"
                    :class="store.getTheme ? 'tableDark' : ''"
                >
                    <template v-slot:[`item.foto`]="{ item }">
                        <v-avatar>
                            <v-img alt="Foto" :src="item.foto?.img"></v-img>
                        </v-avatar>
                    </template>
                    <template v-slot:[`item.editar`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`/pessoas/editar/${item.id}`"
                            icon="mdi-pencil"
                            text=""
                            :hide="true"
                            color="#FBC02D"
                            :minWidth="true"
                        />
                    </template>
                    <template v-slot:[`item.excluir`]="{ item }">
                        <vButtonAction
                            icon="mdi-delete"
                            text=""
                            :hide="true"
                            color="#DD2C00"
                            :minWidth="true"
                            @click="deletePerson(item)"
                        />
                        <vSafeDelete :action="() => deletePerson(item)" />
                    </template>
                </v-data-table>
            </v-row>
        </v-containeir-fluid>
    </div>
</template>

<script setup lang="ts">
import vButtonAction from '@/components/button/vButtonAction.vue';
import vButtonRedirect from '@/components/button/vButtonRedirect.vue';
import { ref, reactive } from 'vue';
import { type IHeadersTable } from '@/interfaces/headersTable';
import axios from 'axios';
import { type IDataPerson } from '@/interfaces/dataPerson';
import vTitle from '@/templates/vTitle.vue';
import { useAppStore } from '@/stores/store';
import router from '@/router';
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
const itemsTable: Array<IDataPerson> = reactive([]);
async function loadPeople() {
    await axios(`${store.getEndpoint}/api/pessoa/pesquisar`, {
        method: 'POST',
        data: {
            nome: ''
        }
    })
        .then((res) => {
            const data: Array<IDataPerson> = res.data;
            data.forEach(async (element) => {
                await axios(`${store.getEndpoint}/api/foto/download/${element.id}`, {
                    method: 'GET',
                    responseType: 'blob' // o retorno tem que ser blob em caso de imagem
                })
                    .then((res) => {
                        if (element.foto != null) {
                            element.foto.img = window.URL.createObjectURL(res.data); // forma de criar a url da imagem para ser usada
                        }
                    })
                    .catch((err) => store.setMsgSnackbar(err.message));
                itemsTable.push({ ...element });
            });
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function deletePerson(data: IDataPerson) {
    await axios(`${store.getEndpoint}/api/pessoa/remover/${data.id}`, {
        method: 'DELETE'
    })
        .then((res) => {
            store.setMsgSnackbar(res.data.message);
            router.go(); //reload
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
loadPeople();
</script>

<style lang="scss" scoped>
.space {
    margin-top: 10px;
}
.tableDark {
    background-color: #18191a;
    color: white;
}
</style>
