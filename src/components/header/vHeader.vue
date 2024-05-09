<template>
    <v-container-fluid>
        <v-row class="headerRow" justify="space-around">
            <v-col cols="6" md="3">
                <vBtnRedirect
                    icon="mdi-account-box-multiple"
                    :external="false"
                    link="/"
                    variant="text"
                    size="x-large"
                    :white="true"
                />
            </v-col>
            <v-col :class="smAndDown ? 'd-none' : ''" md="4">
                <h1>Agenda de Contatos</h1>
            </v-col>
            <v-col cols="6" md="3" class="menu">
                <vMenu />
            </v-col>
        </v-row>
    </v-container-fluid>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import vBtnRedirect from '@/components/button/vButtonRedirect.vue';
import vMenu from '@/components/menu/vMenu.vue';
const { smAndDown } = useDisplay();
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
h1 {
    text-align: center;
    text-shadow: $text-shadown;
    color: white;
}
.headerRow {
    justify-content: center;
    align-items: center;
    height: 100%;
}
.menu {
    display: flex;
    justify-content: end;
}
</style>
