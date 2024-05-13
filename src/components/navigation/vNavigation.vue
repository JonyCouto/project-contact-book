<template>
    <v-card> </v-card>
    <!--v-layout não precisa ser encapsulado dentro do v-card, mas esse elemento precisa existir-->
    <v-layout>
        <v-navigation-drawer
            :expandOnHover="true"
            :rail="true"
            class="nav"
            :color="store.getTheme ? 'grey-darken-4' : '#6D4C41'"
        >
            <v-list density="compact" nav>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :prepend-icon="item.icon"
                    :title="item.text"
                    @click="$router.push(item.link || '/')"
                >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/store';
import { type IItems } from '@/interfaces/itemsBtn';
const store = useAppStore();
const items: Array<IItems> = [
    {
        icon: 'mdi-home',
        text: 'Home',
        redirect: true,
        link: '/',
        external: false
    },
    {
        icon: 'mdi-account-edit',
        text: 'Meu cadastro',
        redirect: true,
        link: '/meuCadastro',
        external: false
    },
    {
        icon: 'mdi-account-multiple',
        text: 'Pessoas',
        redirect: true,
        link: '/pessoas',
        external: false
    },
    {
        icon: 'mdi-account-box',
        text: 'Contatos',
        redirect: true,
        link: '/contatos',
        external: false
    },
    {
        icon: 'mdi-cog',
        text: 'Usuários',
        redirect: true,
        link: '/usuarios',
        external: false
    }
];
</script>

<style lang="scss"></style>
