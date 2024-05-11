<template>
    <div>
        <v-containeir-fluid>
            <v-row>
                <v-col cols="12">
                    <vTitle text="Home" />
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
                    <template v-slot:[`item.favoritar`]="{ item }">
                        <vButtonRedirect
                            :external="false"
                            :link="`/:${item.id}`"
                            icon="mdi-star"
                            text=""
                            :hide="true"
                            color="#FBC02D"
                            :minWidth="true"
                        />
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
            <v-row cols="12" v-show="tab == 'favorities'"> </v-row>
        </v-containeir-fluid>
    </div>
</template>

<script setup lang="ts">
import vButtonRedirect from '@/components/button/vButtonRedirect.vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import { type IItems } from '@/interfaces/itemsBtn';
import { ref, reactive } from 'vue';
import { type IHeadersTable } from '@/interfaces/headersTable';
import axios from 'axios';
import { type IDataPerson } from '@/interfaces/dataPerson';
import vTitle from '@/templates/vTitle.vue';
import { useAppStore } from '@/stores/store';
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
        key: 'nome',
        sortable: true,
        title: 'Nome'
    },
    {
        align: 'center',
        key: 'favoritar',
        sortable: true,
        title: 'Favoritar'
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
    const response = await axios
        .get('http://localhost/data/people.php')
        .catch((err) => console.log(err));
    if (response.status == 200) {
        response.data.forEach((element: IDataPerson) => {
            itemsTable.push({
                id: element.id,
                foto: element.foto,
                nome: element.nome
            });
        });
    } else {
        console.log('Erro');
    }
}
loadPeople();
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
