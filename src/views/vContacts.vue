<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Contatos" />
                </v-col>
            </v-row>
            <v-row class="space"> </v-row>
            <v-row justify="end">
                <v-col cols="12">
                    <vButtonRedirect
                        :external="false"
                        link="contatos/adicionar"
                        icon="mdi-plus"
                        :hide="false"
                        color="blue"
                        text="Adicionar"
                        :min-width="true"
                        class="end"
                    />
                </v-col>
            </v-row>
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
                    noDataText="Sem dados"
                >
                    <template v-slot:[`item.foto`]="{ item }">
                        <v-avatar>
                            <v-img :src="''"></v-img>
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
                            :link="`contatos/editar/${item.pessoa.id}/${item.id}`"
                            icon="mdi-pencil"
                            text=""
                            :hide="true"
                            color="#FBC02D"
                            :minWidth="true"
                        />
                    </template>
                    <template v-slot:[`item.excluir`]="{ item }">
                        <VButtonAction
                            @click="deleteContact(item)"
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
import { useRouter } from 'vue-router';
import VButtonAction from '@/components/button/vButtonAction.vue';
const router = useRouter();
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
        key: 'pessoa.nome',
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
const itemsTable: Array<IDataContact> = reactive([]);
async function loadContacts() {
    await axios(`${store.getEndpoint}/api/contato/pesquisar`, {
        method: 'POST',
        data: {
            termo: ''
        }
    })
        .then((res) => {
            const data: Array<IDataContact> = res.data;
            data.forEach((el) => {
                itemsTable.push({ ...el });
            });
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function deleteContact(data: IDataContact) {
    await axios(`${store.getEndpoint}/api/contato/remover/${data.id}`, {
        method: 'DELETE'
    })
        .then((res) => {
            store.setMsgSnackbar(res.data.message);
            router.go(); // reload
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
loadContacts();
</script>

<style lang="scss" scoped>
.space {
    margin-top: 10px;
}
</style>
