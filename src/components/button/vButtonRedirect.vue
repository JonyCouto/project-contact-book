<template>
    <a
        :href="props.link"
        :target="props.external ? '_blank' : ''"
        :class="props.white ? 'white' : 'black'"
    >
        <v-btn
            :variant="props.variant"
            :prependIcon="icon"
            :size="props.size"
            :class="props.minWidth ? '' : 'btn'"
            :color="props.color"
        >
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
    hide: Boolean,
    color: String,
    minWidth: Boolean
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
