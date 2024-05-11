<template>
    <v-table>
        <thead>
            <tr>
                <th v-for="(item, index) in props.headers" :key="index" class="text-center">
                    {{ item.header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in props.items" :key="index">
                <td v-for="(value, position) in item.value" :key="position">
                    {{ value }}
                </td>
                <v-slot></v-slot>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import { type ITable } from '@/interfaces/headersTable';
import { type IItemsTable } from '@/interfaces/itemsTable';
const props = defineProps({
    headers: Array<ITable>,
    items: Array<IItemsTable>
});
// consegui deixar uma table genérica, mas o ruim disso, é que em algumas predefinições que tenho que fazer, não fica legal
</script>

<style></style>
