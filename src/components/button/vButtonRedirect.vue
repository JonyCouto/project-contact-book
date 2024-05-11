<template>
    <a :href="props.link" :target="external ? '_blank' : ''" :class="white ? 'white' : 'black'">
        <v-btn :variant="props.variant" :prependIcon="icon" :size="props.size" class="btn">
            {{ smAndDown && props.hide ? '' : props.text }}
        </v-btn>
    </a>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { smAndDown } = useDisplay();
const props = defineProps({
    icon: String,
    text: String,
    link: String,
    external: Boolean,
    variant: String,
    size: String,
    white: Boolean,
    hide: Boolean
});
</script>

<style scoped>
.white {
    color: white;
}
.black {
    color: black;
}
.btn {
    width: 100%;
    justify-content: start;
}
</style>
