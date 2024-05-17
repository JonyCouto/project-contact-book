<template>
    <v-snackbar v-model="store.getStatusSnackbar" vertical multi-line absolute>
        {{ store.getMsgSnackbar }}
        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="store.desativeSnackbar"> Close </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
import { useAppStore } from '@/stores/store';
const store = useAppStore();
</script>

<style>
.v-snackbar__wrapper {
    min-width: auto !important;
}
.v-overlay--absolute {
    position: fixed !important;
}
</style>
