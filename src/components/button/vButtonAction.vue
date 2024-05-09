<template>
    <v-btn :variant="props.variant" :prependIcon="icon" :size="props.size">
        {{ smAndDown ? '' : props.text }}
    </v-btn>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { smAndDown } = useDisplay();
const props = defineProps({
    icon: String,
    text: String,
    variant: String,
    size: String
});
</script>
<style></style>
