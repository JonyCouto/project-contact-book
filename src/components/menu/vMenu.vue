<template>
    <!--Menu com navigation-->
    <v-menu v-if="mdAndDown">
        <template v-slot:activator="{ props }">
            <v-btn :color="store.getTheme ? 'black' : ''" v-bind="props" prependIcon="mdi-menu"
                >Menu</v-btn
            >
        </template>
        <v-list>
            <v-list-item v-for="(item, index) in itemsWithNavigation" :key="index">
                <v-list-item-title>
                    <vButtonRedirect
                        class="aBlock"
                        v-if="item.redirect"
                        :text="item.text"
                        :icon="item.icon"
                        :link="item.link"
                        :external="item.external"
                        variant="text"
                    />
                    <vButtonAction
                        v-else
                        @click="item.action"
                        :text="item.text"
                        :icon="item.icon"
                        variant="text"
                    />
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <!--Menu sem navigation-->
    <v-menu v-else>
        <template v-slot:activator="{ props }">
            <v-btn
                :color="store.getTheme ? 'green-darken-4' : ''"
                v-bind="props"
                prependIcon="mdi-menu"
                >Menu</v-btn
            >
        </template>
        <v-list>
            <v-list-item v-for="(item, index) in itemsWithoutNavigation" :key="index">
                <v-list-item-title>
                    <vButtonRedirect
                        class="aBlock"
                        v-if="item.redirect"
                        :text="item.text"
                        :icon="item.icon"
                        :link="item.link"
                        :external="item.external"
                        variant="text"
                    />
                    <vButtonAction
                        v-else
                        @click="item.action"
                        :text="item.text"
                        :icon="item.icon"
                        variant="text"
                    />
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useAppStore } from '@/stores/store';
import vButtonRedirect from '@/components/button/vButtonRedirect.vue';
import vButtonAction from '@/components/button/vButtonAction.vue';
import { type IItems } from '@/interfaces/itemsBtn';
const { mdAndDown } = useDisplay();
const store = useAppStore();
const itemsWithoutNavigation: Array<IItems> = [
    {
        icon: 'mdi-brightness-6',
        text: 'Alternar exibição',
        action: store.changeTheme,
        redirect: false
    },
    {
        icon: 'mdi-logout',
        text: 'Logout',
        action: () => {
            console.log('Saindo');
        },
        redirect: false
    }
];
const itemsWithNavigation: Array<IItems> = [
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
    },
    {
        icon: 'mdi-brightness-6',
        text: 'Alternar exibição',
        action: store.changeTheme,
        redirect: false
    },
    {
        icon: 'mdi-logout',
        text: 'Logout',
        action: () => {
            console.log('Saindo');
        },
        redirect: false
    }
];
</script>

<style scoped>
.aBlock {
    display: block;
}
</style>
