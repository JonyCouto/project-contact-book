<template>
    <div>
        <v-containeir-fluid>
            <v-row justify="end">
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
            <v-row cols="12" v-show="tab == 'contacts'">
                <vTable :headers="headersTable" :items="itemsTable" />
            </v-row>
            <v-row cols="12" v-show="tab == 'favorities'"> </v-row>
        </v-containeir-fluid>
    </div>
</template>

<script setup lang="ts">
import vTable from '@/components/table/vTable.vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import { type IItems } from '@/interfaces/itemsBtn';
import { ref, reactive } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import type { ITable } from '@/interfaces/headersTable';
import type { IItemsTable } from '@/interfaces/itemsTable';
import { type IDataPerson } from '@/interfaces/dataPerson';
const tab = ref('');
const headersTable: Array<ITable> = [{ header: 'Foto' }, { header: 'Nome' }];
const itemsTable: Array<IItemsTable> = reactive([]);
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
async function loadPeople() {
    const response: AxiosResponse = await axios
        .get('http://localhost/data/people.php')
        .catch((err) => console.log(err));
    response.data.forEach((element: IDataPerson) => {
        itemsTable.push({
            value: [`${element.foto.name}.${element.foto.type}`, element.nome]
        });
    });
    console.log(itemsTable);
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
</style>
