/**
 * Point d'entrée de l'application
 * Initialise Vue, Pinia et le routeur
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import './assets/typography.css'
// Création de l'application
const app = createApp(App)

// Installation des plugins
app.use(createPinia()) // Gestion d'état Pinia
app.use(router)        // Routeur Vue

// Configuration globale
app.config.errorHandler = (err, instance, info) => {
  console.error('❌ Erreur globale:', err)
  console.error('Composant:', instance)
  console.error('Info:', info)
}

// Montage de l'application
app.mount('#app')