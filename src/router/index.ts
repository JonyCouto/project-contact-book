import { createRouter, createWebHistory } from 'vue-router';
import vHome from '@/views/vHome.vue';
import vMyRegister from '@/views/vMyRegister.vue';
import vContacts from '@/views/vContacts.vue';
import vPeople from '@/views/vPeople.vue';
import vUsers from '@/views/vUsers.vue';
import NotFound from '@/views/vNotFound.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: vHome
        },
        {
            path: '/contatos',
            name: 'contacts',
            component: vContacts
        },
        {
            path: '/meuCadastro',
            name: 'myRegister',
            component: vMyRegister
        },
        {
            path: '/pessoas',
            name: 'people',
            component: vPeople
        },
        {
            path: '/usuarios',
            name: 'users',
            component: vUsers
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFound
        }
    ]
});

export default router;
