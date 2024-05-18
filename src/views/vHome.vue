<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Home" />
                </v-col>
            </v-row>
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
            <v-row justify="end" class="space">
                <v-col cols="6" sm="2" v-for="(item, index) in items" :key="index" class="end">
                    <vButtonAction
                        class="btn"
                        :icon="item.icon"
                        :text="item.text"
                        :color="item.color"
                        :hide="item.hide"
                        @click="item.action"
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
            <v-row cols="12" v-show="tab == 'contacts'">
                <v-data-table
                    :headers="headersTable"
                    :items="itemsTableContacts"
                    :search="search"
                    itemsPerPageText="Itens por página"
                    :class="store.getTheme ? ['tableDark', 'space'] : 'space'"
                    noDataText="Sem dados"
                >
                    <template v-slot:[`item.foto`]="{ item }">
                        <v-avatar>
                            <v-img alt="Foto" :src="item.pessoa.foto?.img"></v-img>
                        </v-avatar>
                    </template>
                    <template v-slot:[`item.favoritar`]="{ item }">
                        <vButtonAction
                            @click="createAsFavorite(item)"
                            icon="mdi-star"
                            :hide="true"
                            color="orange"
                            :minWidth="true"
                        />
                    </template>
                    <template v-slot:[`item.editar`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`/contatos/editar/${item.id}`"
                            icon="mdi-pencil"
                            text=""
                            :hide="true"
                            color="#FBC02D"
                            :minWidth="true"
                        />
                    </template>
                    <template v-slot:[`item.excluir`]="{ item }">
                        <vButtonAction
                            @click="store.activeSafeDelete"
                            icon="mdi-delete"
                            text=""
                            :hide="true"
                            color="red"
                            :minWidth="true"
                        />
                        <vSafeDelete :action="() => deleteContact(item)" />
                    </template>
                </v-data-table>
            </v-row>
            <v-row cols="12" v-show="tab == 'favorities'">
                <v-data-table
                    :headers="headersTableFavorities"
                    :items="itemsTableFavorities"
                    :search="search"
                    itemsPerPageText="Itens por página"
                    :class="store.getTheme ? ['tableDark', 'space'] : 'space'"
                    noDataText="Sem dados"
                >
                    <template v-slot:[`item.foto`]="{ item }">
                        <v-avatar>
                            <v-img alt="Foto" :src="item.pessoa.foto?.img"></v-img>
                        </v-avatar>
                    </template>
                    <template v-slot:[`item.remover-favorito`]="{ item }">
                        <vButtonAction
                            @click="removeAsFavorite(item)"
                            icon="mdi-cancel"
                            :hide="true"
                            color="red"
                            :minWidth="true"
                        />
                    </template>
                    <template v-slot:[`item.editar`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`contatos/editar/${item.id}`"
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
import vButtonAction from '@/components/button/vButtonAction.vue';
import vSafeDelete from '@/components/snackbar/vSafeDelete.vue';
import { type IItems } from '@/interfaces/itemsBtn';
import { ref, reactive } from 'vue';
import { type IHeadersTable } from '@/interfaces/headersTable';
import axios from 'axios';
import { type IDataContact } from '@/interfaces/dataContact';
import vTitle from '@/templates/vTitle.vue';
import { useAppStore } from '@/stores/store';
import router from '@/router';
const store = useAppStore();
const tab = ref('');
const search = ref('');
const items: Array<IItems> = [
    {
        icon: 'mdi-account-multiple',
        text: 'Contatos',
        action: () => {
            tab.value = 'contacts';
        },
        redirect: false,
        color: '#DD2C00',
        hide: true
    },
    {
        icon: 'mdi-star-box',
        text: 'Favoritos',
        action: () => {
            tab.value = 'favorities';
        },
        redirect: false,
        color: '#FBC02D',
        hide: true
    }
];
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
        key: 'favoritar',
        sortable: false,
        title: 'Favoritar'
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
const headersTableFavorities: Array<IHeadersTable> = [
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
        key: 'editar',
        sortable: false,
        title: 'Editar'
    },
    {
        align: 'center',
        key: 'remover-favorito',
        sortable: false,
        title: 'Remover favorito'
    }
];
const itemsTableContacts: Array<IDataContact> = reactive([]);
const itemsTableFavorities: Array<IDataContact> = reactive([]);
async function loadContacts() {
    await axios(`${store.getEndpoint}/api/contato/pesquisar`, {
        method: 'POST',
        data: {
            termo: ''
        }
    })
        .then((res) => {
            const data: Array<IDataContact> = res.data;
            data.forEach(async (el) => {
                await axios(`${store.getEndpoint}/api/foto/download/${el.pessoa.id}`, {
                    method: 'GET',
                    responseType: 'blob' // o retorno tem que ser blob em caso de imagem
                })
                    .then((res) => {
                        if (el.pessoa.foto != null) {
                            el.pessoa.foto.img = window.URL.createObjectURL(res.data); // forma de criar a url da imagem para ser usada
                        }
                    })
                    .catch((err) => store.setMsgSnackbar(err.message));
                itemsTableContacts.push({ ...el });
            });
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function loadFavorite() {
    await axios(`${store.getEndpoint}/api/favorito/pesquisar`, {
        method: 'GET'
    })
        .then((res) => {
            const data: Array<IDataContact> = res.data;
            data.forEach(async (el) => {
                await axios(`${store.getEndpoint}/api/foto/download/${el.pessoa.id}`, {
                    method: 'GET',
                    responseType: 'blob' // o retorno tem que ser blob em caso de imagem
                })
                    .then((res) => {
                        if (el.pessoa.foto != null) {
                            el.pessoa.foto.img = window.URL.createObjectURL(res.data); // forma de criar a url da imagem para ser usada
                        }
                    })
                    .catch((err) => store.setMsgSnackbar(err.message));
                itemsTableFavorities.push({ ...el });
            });
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function createAsFavorite(data: IDataContact) {
    await axios(`${store.getEndpoint}/api/favorito/salvar`, {
        method: 'POST',
        data
    })
        .then((res) => {
            store.setMsgSnackbar(res.data.message);
            router.go(); // reload
        })
        .catch((err) => {
            store.setMsgSnackbar(err.message);
        });
}
async function removeAsFavorite(data: IDataContact) {
    await axios(`${store.getEndpoint}/api/favorito/remover/${data.id}`, {
        method: 'DELETE'
    })
        .then((res) => {
            store.setMsgSnackbar(res.data.message);
            router.go();
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
loadFavorite();
// consegui deixar uma table genérica, mas o ruim disso, é que em algumas predefinições que tenho que fazer, não fica legal
</script>

<style lang="scss" scoped>
.end {
    display: flex;
    justify-content: end;
}
.btn {
    width: 100%;
}
.space {
    margin-bottom: 20px;
}
.tableDark {
    background-color: #18191a;
    color: white;
}
</style>
