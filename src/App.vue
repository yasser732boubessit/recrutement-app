<!--
  App - Composant principal de l'application
  Layout global avec navigation, notifications et footer
  Version avec Lucide Icons et Design System
-->

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    
    <!-- ========== NAVIGATION PRINCIPALE ========== -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ClipboardList class="w-6 h-6" />
            <span class="font-semibold text-lg">Gestion Recrutement</span>
          </router-link>
          
          <!-- Navigation Links -->
          <nav class="flex items-center gap-6">
            <router-link 
              to="/" 
              class="text-sm font-medium transition-colors relative group"
              :class="$route.path === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'"
            >
              Accueil
              <span v-if="$route.path === '/'" 
                    class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            </router-link>
            
            <!-- Statistiques Toggle -->
            <button 
              @click="toggleStats"
              class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <BarChart3 class="w-4 h-4" />
              Statistiques
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- ========== STATISTIQUES (optionnel) ========== -->
    <Transition name="slide-down">
      <div v-if="showStats" class="bg-white border-b border-gray-200 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold text-gray-700">Aperçu rapide</h2>
            <button @click="showStats = false" class="text-gray-400 hover:text-gray-600">
              <X class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Stats Cards Mini -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
            <div class="bg-blue-50 rounded-lg p-3">
              <p class="text-xs text-blue-600 font-medium">Total</p>
              <p class="text-lg font-bold text-blue-700">{{ store.totalCandidatures }}</p>
            </div>
            <div v-for="(count, statut) in store.statsParStatut" 
                 :key="statut"
                 class="bg-gray-50 rounded-lg p-3">
              <p class="text-xs text-gray-600 font-medium">{{ statut }}</p>
              <p class="text-lg font-bold" :class="getStatutTextClass(statut)">{{ count }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ========== TOAST NOTIFICATION ========== -->
    <Transition name="slide-right">
      <div v-if="notification.show" 
           class="fixed top-20 right-4 z-50 max-w-md"
           :class="notification.type">
        <div class="flex items-center gap-3 p-4 rounded-lg shadow-lg"
             :class="{
               'bg-green-50 text-green-800 border border-green-200': notification.type === 'success',
               'bg-red-50 text-red-800 border border-red-200': notification.type === 'error',
               'bg-blue-50 text-blue-800 border border-blue-200': notification.type === 'info'
             }">
          <component :is="getNotificationIcon(notification.type)" class="w-5 h-5" />
          <p class="text-sm font-medium">{{ notification.message }}</p>
          <button @click="notification.show = false" class="ml-auto">
            <X class="w-4 h-4 opacity-60 hover:opacity-100" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- ========== CONTENU PRINCIPAL ========== -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- ========== FOOTER ========== -->
    <footer class="bg-white border-t border-gray-200 py-6 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500">
            © 2026 - Gestion des Candidatures - Test Technique Vue.js
          </p>
          
          <!-- API Status -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">API Status:</span>
            <div class="flex items-center gap-1.5">
              <div class="w-2 h-2 rounded-full animate-pulse"
                   :class="apiStatus ? 'bg-green-500' : 'bg-red-500'"></div>
              <span class="text-sm font-medium"
                    :class="apiStatus ? 'text-green-600' : 'text-red-600'">
                {{ apiStatus ? 'Connecté' : 'Déconnecté' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * App - Composant racine avec Design System
 */

import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCandidatureStore } from './stores/candidatureStore'

// Imports Lucide Icons
import { 
  ClipboardList,
  BarChart3,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-vue-next'

// ========== STORES & ROUTER ==========
const route = useRoute()
const store = useCandidatureStore()

// ========== STATE ==========
const showStats = ref(false)
const apiStatus = ref(true)
const notification = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'info'
})

let statusInterval: number

// ========== METHODS ==========

/**
 * Vérifie le statut de l'API
 */
const checkApiStatus = async () => {
  try {
    const response = await fetch('http://localhost:3000/candidatures?_limit=1')
    apiStatus.value = response.ok
    
    if (!apiStatus.value) {
      showNotification('API non disponible', 'error')
    }
  } catch {
    apiStatus.value = false
    showNotification('Erreur de connexion à l\'API', 'error')
  }
}

/**
 * Affiche une notification
 */
const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 4000)
}

/**
 * Retourne l'icône de notification appropriée
 */
const getNotificationIcon = (type: string) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }
  return icons[type as keyof typeof icons] || Info
}

/**
 * Retourne la classe de couleur pour le texte du statut
 */
const getStatutTextClass = (statut: string): string => {
  const classes: Record<string, string> = {
    'En attente': 'text-amber-600',
    'Entretien RH': 'text-blue-600',
    'Entretien technique': 'text-purple-600',
    'Accepté': 'text-emerald-600',
    'Refusé': 'text-red-600'
  }
  return classes[statut] || 'text-gray-700'
}

/**
 * Ouvre/ferme le panneau de statistiques
 */
const toggleStats = () => {
  showStats.value = !showStats.value
}

// ========== LIFECYCLE ==========

onMounted(() => {
  checkApiStatus()
  statusInterval = setInterval(checkApiStatus, 30000) // Vérifie toutes les 30 secondes
  
  // Écouter les événements de notification
  window.addEventListener('show-notification', ((event: CustomEvent) => {
    showNotification(event.detail.message, event.detail.type)
  }) as EventListener)
})

onUnmounted(() => {
  clearInterval(statusInterval)
  window.removeEventListener('show-notification', (() => {}) as EventListener)
})

// Exposer la fonction de notification globalement
if (typeof window !== 'undefined') {
  (window as any).showNotification = showNotification
}
</script>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Animation pour le statut API */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Styles pour les liens actifs */
.router-link-active {
  color: #2563eb;
}

/* Print styles */
@media print {
  header,
  footer,
  .toast {
    display: none !important;
  }
}
</style>