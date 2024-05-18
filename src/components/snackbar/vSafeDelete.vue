<template>
    <v-snackbar v-model="store.getStatusSafeDelete" vertical multi-line absolute>
        Tem certeza que deseja excluir?
        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="props.action"> Sim </v-btn>
            <v-btn color="blue" variant="text" @click="store.desativeSafeDelete"> Cancelar </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/store';
const store = useAppStore();
const props = defineProps({
    action: Promise
});
</script>

<style>
.v-snackbar__wrapper {
    min-width: auto !important;
}
.v-overlay--absolute {
    position: fixed !important;
}
</style>
