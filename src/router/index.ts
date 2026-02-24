/**
 * Configuration du routeur Vue
 * Gère la navigation entre les pages
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import AddCandidatureView from '../views/AddCandidatureView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil - Gestion des Candidatures'
      }
    },
    {
      path: '/candidature/:id',
      name: 'detail',
      component: DetailView,
      props: true,
      meta: {
        title: 'Détail Candidature'
      }
    },{
          path: '/ajouter',
      name: 'add',
      component: AddCandidatureView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Change le titre de la page à chaque navigation
router.beforeEach((to, from, next) => {
  document.title = String(to.meta.title || 'Gestion des Candidatures')
  next()
})

export default router