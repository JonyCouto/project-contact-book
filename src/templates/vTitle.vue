<template>
    <h2>{{ props.text }}</h2>
    <v-divider></v-divider>
</template>

<script setup lang="ts">
const props = defineProps({
    text: String
});
</script>

<style scoped lang="scss">
.h2 {
}
</style>
