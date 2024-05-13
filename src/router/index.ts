import { createRouter, createWebHistory } from 'vue-router';
import vHome from '@/views/vHome.vue';
import vMyRegister from '@/views/vMyRegister.vue';
import vContacts from '@/views/vContacts.vue';
import vPeople from '@/views/vPeople.vue';
import vUsers from '@/views/vUsers.vue';
import vNotFound from '@/views/vNotFound.vue';
import vContactEdit from '@/components/contact/vContactEdit.vue';
import vPersonEdit from '@/components/person/vPersonEdit.vue';
import vUserEdit from '@/components/user/vUserEdit.vue';
import vNotAllowed from '@/views/vNotAllowed.vue';

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
            path: '/usuarios/editar/:id',
            name: 'usersEdit',
            component: vUserEdit
        },
        {
            path: '/pessoas/editar/:id',
            name: 'peopleEdit',
            component: vPersonEdit
        },
        {
            path: '/contatos/editar/:id',
            name: 'contactsEdit',
            component: vContactEdit
        },
        {
            path: '/notAllowed',
            name: 'notAllowed',
            component: vNotAllowed
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: vNotFound
        }
    ]
});

export default router;
