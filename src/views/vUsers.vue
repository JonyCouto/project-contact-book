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
                >
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
import { type IDataUser } from '@/interfaces/dataUser';
import vTitle from '@/templates/vTitle.vue';
import router from '@/router';
import { useAppStore } from '@/stores/store';
const store = useAppStore();
const search = ref('');
const headersTable: Array<IHeadersTable> = [
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
        key: 'username',
        sortable: true,
        title: 'Username'
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
const itemsTable: Array<IDataUser> = reactive([
    {
        cpf: '1',
        dataNascimento: '',
        email: '',
        id: 1,
        nome: '',
        password: '',
        telefone: '',
        username: ''
    },
    {
        cpf: '1',
        dataNascimento: '',
        email: '',
        id: 1,
        nome: '',
        password: '',
        telefone: '',
        username: ''
    }
]);
async function loadUsers() {}
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
</style>
