/// <reference types="vite/client" />
/// <reference types="vuetify/lib/framework.mjs" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
