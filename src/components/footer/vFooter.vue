<template>
    <v-container-fluid>
        <v-row class="footerRow">
            <v-col cols="12">
                <h2>Desenvolvido por Jonathan Couto</h2>
            </v-col>
            <v-col cols="12">
                <span>Links Úteis</span>
            </v-col>
            <v-col cols="12">
                <ul :class="smAndDown ? ['listBoxForSmallDevices', 'listBox'] : ['listBox']">
                    <a href="https://github.com/JonyCouto/project-contact-book" target="_blank"
                        ><li>Projeto no GitHub</li></a
                    >
                    <a href="https://github.com/JonyCouto" target="_blank"><li>Meu GitHub</li></a>
                    <a
                        href="https://www.linkedin.com/in/jonathan-vinicius-couto-a4900119b/"
                        target="_blank"
                        ><li>Meu LinkedIn</li></a
                    >
                    <a href="https://www.instagram.com/jony.devinho/" target="_blank"
                        ><li>IG profissional</li></a
                    >
                </ul>
            </v-col>
        </v-row>
    </v-container-fluid>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { smAndDown } = useDisplay();
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
h2 {
    text-align: center;
}
h2,
span,
a {
    color: white;
    text-shadow: $text-shadown;
}
ul {
    list-style: none;
}
span {
    display: block;
    text-align: center;
    font-weight: bold;
}
.footerRow {
    justify-content: center;
    align-items: center;
}
.listBox {
    display: flex;
    justify-content: center;
    align-items: center;
    & > a {
        margin: 0px 10px;
    }
}
.listBoxForSmallDevices {
    flex-direction: column;
}
</style>
