import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { type IDataLogin } from '@/interfaces/dataLogin';
import { type IDataUserLogged } from '@/interfaces/dataUserLogged';
import axios from 'axios';

export const useAppStore = defineStore('store', () => {
    const darkTheme = ref(false);
    const endpoint = 'https://demometaway.vps-kinghost.net:8485';
    const logged = ref(false);
    const userLogged: IDataUserLogged = reactive({
        accessToken: '',
        id: -1,
        tipos: [''],
        tokenType: '',
        username: ''
    });
    const preferentialLogin = ref(false);
    const savedLogin: IDataLogin = reactive({
        username: '',
        password: ''
    });
    const snackbar = reactive({
        status: false,
        msg: ''
    });
    const safeDelete = reactive({
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
    const getStatusSnackbar = computed((): boolean => {
        return snackbar.status;
    });
    const getStatusSafeDelete = computed((): boolean => {
        return safeDelete.status;
    });
    const getLoggedInfo = computed((): boolean => {
        if (localStorage.getItem('logged')) {
            // ajuste de erro para ts
            logged.value = JSON.parse(localStorage.getItem('logged') || 'false');
        }
        return logged.value;
    });
    const getEndpoint = computed((): string => {
        return endpoint;
    });
    const getSavedLogin = computed(() => {
        if (localStorage.getItem('savedLogin')) {
            const data: IDataLogin = JSON.parse(
                localStorage.getItem('savedLogin') || '{"username": "", "password": ""}'
            );
            savedLogin.username = data.username;
            savedLogin.password = data.password;
        }
        return savedLogin;
    });
    const getPreferentialLogin = computed(() => {
        if (localStorage.getItem('preferentialLogin')) {
            preferentialLogin.value = JSON.parse(
                localStorage.getItem('preferentialLogin') || 'false'
            );
        }
        return preferentialLogin.value;
    });
    const getUserLogged = computed(() => {
        if (localStorage.getItem('userLogged')) {
            const data: IDataUserLogged = JSON.parse(
                localStorage.getItem('userLogged') ||
                    '{"username": "", "accessToken": "", "id": -1, "tipos": [""], "tokenType": ""}'
            );
            userLogged.accessToken = data.accessToken;
            userLogged.id = data.id;
            userLogged.tipos = data.tipos;
            userLogged.tokenType = data.tokenType;
            userLogged.username = data.username;
            axios.defaults.headers.common['Authorization'] =
                `${userLogged.tokenType} ${userLogged.accessToken}`;
        }
        return userLogged;
    });
    function changeLoggedStatus() {
        logged.value = !logged.value;
        localStorage.logged = logged.value;
    }
    function saveUserLogged(data: IDataUserLogged) {
        userLogged.username = data.username;
        userLogged.accessToken = data.accessToken;
        userLogged.id = data.id;
        userLogged.tipos = data.tipos;
        userLogged.tokenType = data.tokenType;
        axios.defaults.headers.common['Authorization'] =
            `${userLogged.tokenType} ${userLogged.accessToken}`;
        console.log(axios.defaults.headers.common['Authorization']);
        localStorage.userLogged = JSON.stringify(userLogged);
        changeLoggedStatus(); // troca status para logado
    }
    function logoutUser() {
        userLogged.accessToken = '';
        userLogged.id = -1;
        userLogged.tipos = [''];
        userLogged.tokenType = '';
        userLogged.username = '';
        axios.defaults.headers.common['Authorization'] = ``;
        localStorage.removeItem('userLogged');
        changeLoggedStatus(); // troca status para deslogado
    }
    function saveLogin(login: IDataLogin) {
        savedLogin.username = login.username;
        savedLogin.password = login.password;
        localStorage.savedLogin = JSON.stringify(savedLogin);
        localStorage.preferentialLogin = preferentialLogin.value;
    }
    function clearLogin() {
        savedLogin.username = '';
        savedLogin.password = '';
        localStorage.removeItem('savedLogin');
    }
    function setPreferentialLogin(preferential: boolean) {
        preferentialLogin.value = preferential;
        localStorage.preferentialLogin = preferential;
    }
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
    function desativeSafeDelete() {
        safeDelete.status = false;
    }
    function activeSafeDelete() {
        safeDelete.status = true;
    }
    return {
        getTheme,
        getMsgSnackbar,
        getLoggedInfo,
        getEndpoint,
        getSavedLogin,
        getPreferentialLogin,
        getStatusSnackbar,
        getUserLogged,
        getStatusSafeDelete,
        saveUserLogged,
        logoutUser,
        setPreferentialLogin,
        saveLogin,
        changeTheme,
        activeSnackbar,
        setMsgSnackbar,
        desativeSnackbar,
        activeSafeDelete,
        desativeSafeDelete,
        clearLogin
    };
});
