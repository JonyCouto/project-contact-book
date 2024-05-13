import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('store', () => {
    const darkTheme = ref(false);
    const logged = ref(false);
    const snackbar = reactive({
        status: false,
        msg: ''
    });
    const getTheme = computed(() => {
        if (localStorage.getItem('darkTheme')) {
            // ajuste de erro para ts
            darkTheme.value = JSON.parse(localStorage.getItem('darkTheme') || 'false');
        }
        return darkTheme.value;
    });
    const getMsgSnackbar = computed((): string => {
        return snackbar.msg;
    });
    const getLoggedInfo = computed((): boolean => {
        if (localStorage.getItem('logged')) {
            // ajuste de erro para ts
            logged.value = JSON.parse(localStorage.getItem('logged') || 'false');
        }
        return logged.value;
    });
    function changeTheme() {
        darkTheme.value = !darkTheme.value;
        localStorage.darkTheme = darkTheme.value;
    }
    function desativeSnackbar() {
        snackbar.status = false;
    }
    function activeSnackbar() {
        snackbar.status = true;
    }
    function setMsgSnackbar(msg: string) {
        activeSnackbar();
        snackbar.msg = msg;
    }

    return {
        darkTheme,
        getTheme,
        changeTheme,
        activeSnackbar,
        setMsgSnackbar,
        getMsgSnackbar,
        desativeSnackbar,
        getLoggedInfo
    };
});
