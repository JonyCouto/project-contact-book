<template>
    <!--Verificação primeiro de tema e logo em seguida verificação de largura de dispositivo-->
    <div
        v-if="store.getLoggedInfo"
        :class="
            store.getTheme
                ? smAndDown
                    ? ['darkApp', 'app', 'smallApp']
                    : ['darkApp', 'app', 'largeApp']
                : smAndDown
                  ? ['whiteApp', 'app', 'smallApp']
                  : ['whiteApp', 'app', 'largeApp']
        "
    >
        <vHeader class="header" />
        <vNavigation v-if="smAndDown == false" class="navigation" />
        <RouterView class="content" />
        <vFooter class="footer" />
        <vSnackbar />
    </div>
    <div class="login" v-else>
        <vLogin />
        <vSnackbar />
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/store';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import vHeader from '@/components/header/vHeader.vue';
import vFooter from '@/components/footer/vFooter.vue';
import vNavigation from '@/components/navigation/vNavigation.vue';
import vLogin from './views/vLogin.vue';
import vSnackbar from './components/snackbar/vSnackbar.vue';
const store = useAppStore();
const { smAndDown } = useDisplay();
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.whiteApp {
    .header {
        // background-color: $background-color;
        background-image: url('./assets/img/fundo.jpg');
        box-shadow: $box-shadown;
    }
    .footer {
        // background-color: $background-color;
        background-image: url('./assets/img/fundo.jpg');
        box-shadow: $box-shadown-up;
    }
    a {
        text-decoration: none;
    }
    .navigation {
        box-shadow: $box-shadown;
    }
}
.darkApp {
    a {
        text-decoration: none;
    }
    background-color: #18191a;
    .header,
    .navigation {
        background-color: $dark;
        box-shadow: $box-shadown;
    }
    .footer {
        background-color: $dark;
        box-shadow: $box-shadown-up;
    }
    .content {
        color: white;
    }
}
.app {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 15vh 1fr;
}
.smallApp {
    grid-template-columns: 100%;
    grid-template-areas:
        'header'
        'content'
        'footer';
}
.largeApp {
    grid-template-columns: auto 1fr;
    grid-template-areas:
        'navigation header'
        'navigation content'
        'navigation footer';
}
.header,
.footer,
.navigation,
.content {
    padding: 10px;
}
.header {
    grid-area: header;
}
.footer {
    grid-area: footer;
}
.content {
    grid-area: content;
}
// .navigation { // Código não é necessário, o v-navigation se ajusta conforme precisa
//     grid-area: navigation;
// }
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url('./assets/img/fundo.jpg');
    background-repeat: repeat;
}
</style>
