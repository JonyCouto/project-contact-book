import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('store', () => {
    const darkTheme = ref(false);
    const getTheme = computed(() => {
        if (localStorage.getItem('darkTheme')) {
            // ajuste de erro para ts
            darkTheme.value = JSON.parse(localStorage.getItem('darkTheme') || 'false');
        }
        return darkTheme.value;
    });
    function changeTheme() {
        console.log(!darkTheme.value);
        darkTheme.value = !darkTheme.value;
        localStorage.darkTheme = darkTheme.value;
    }
    return { darkTheme, getTheme, changeTheme };
});
