<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Usuários" />
                </v-col>
            </v-row>
            <v-row class="space"> </v-row>
            <v-row justify="end">
                <v-col cols="12">
                    <vButtonRedirect
                        :external="false"
                        link="usuarios/editar/novo"
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
                    <template v-slot:[`item.editar`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`/usuarios/editar/${item.id}`"
                            icon="mdi-pencil"
                            text=""
                            :hide="true"
                            color="#FBC02D"
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
import { type IDataUserOnlyObject } from '@/interfaces/dataUserOnlyObject';
import vTitle from '@/templates/vTitle.vue';
import router from '@/router';
import { useAppStore } from '@/stores/store';
const store = useAppStore();
const search = ref('');
const headersTable: Array<IHeadersTable> = [
    {
        align: 'start',
        key: 'nome',
        sortable: true,
        title: 'Nome'
    },
    {
        align: 'start',
        key: 'email',
        sortable: true,
        title: 'Email'
    },
    {
        align: 'start',
        key: 'username',
        sortable: true,
        title: 'Username'
    },
    {
        align: 'end',
        key: 'editar',
        sortable: false,
        title: 'Editar'
    }
];
const itemsTable: Array<IDataUserOnlyObject> = reactive([]);
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
                itemsTable.push({
                    ...el
                });
            });
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
function verifyPermission() {
    if (store.getUserLogged.tipos[0] != 'ROLE_ADMIN') {
        router.push('/notAllowed');
    } else {
        loadUsers();
    }
}
verifyPermission();
</script>

<style lang="scss" scoped>
.space {
    margin-top: 10px;
}
.end {
    display: flex;
    justify-content: end;
}
.tableDark {
    background-color: #18191a;
    color: white;
}
</style>
