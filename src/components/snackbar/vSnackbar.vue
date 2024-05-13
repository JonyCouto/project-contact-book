<template>
    <v-snackbar v-model="snackbar">
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

<style></style>
