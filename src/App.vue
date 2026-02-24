<!--
  App - Composant principal de l'application
  Layout global avec navigation, notifications et footer
  Version avec header et footer redesignés pour harmonie avec le background
-->

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
    
    <!-- ========== HEADER PRINCIPAL ========== -->
    <header class="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Logo avec effet de glow -->
          <router-link to="/" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105">
            <div class="relative">
              <ClipboardList class="w-7 h-7" />
              <div class="absolute -inset-1 bg-blue-400 rounded-full blur-md opacity-0 hover:opacity-30 transition-opacity"></div>
            </div>
            <span class="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestion Recrutement
            </span>
          </router-link>
          
          <!-- Navigation Links -->
          <nav class="flex items-center gap-6">
            <router-link 
              to="/" 
              class="text-sm font-medium transition-all duration-300 relative px-3 py-2 rounded-lg"
              :class="$route.path === '/' 
                ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
            >
              <span class="relative z-10">Accueil</span>
            </router-link>
            
            <!-- Statistiques Toggle -->
            <button 
              @click="toggleStats"
              class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 
                     transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100 group"
            >
              <BarChart3 class="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Statistiques
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- ========== STATISTIQUES DÉROULANTES ========== -->
    <Transition name="slide-down">
      <div v-if="showStats" class="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BarChart3 class="w-4 h-4 text-blue-500" />
              Aperçu rapide
            </h2>
            <button @click="showStats = false" 
                    class="text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 duration-300">
              <X class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Stats Cards Mini -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <p class="text-xs text-blue-100 font-medium">Total</p>
              <p class="text-xl font-bold text-white">{{ store.totalCandidatures }}</p>
            </div>
            <div v-for="(count, statut) in store.statsParStatut" 
                 :key="statut"
                 class="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <p class="text-xs text-gray-600 font-medium">{{ statut }}</p>
              <p class="text-lg font-bold" :class="getStatutTextClass(statut)">{{ count }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ========== HERO SECTION DYNAMIQUE ========== -->
    <section class="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-16 px-4 md:px-8 overflow-hidden">
      <!-- Background pattern amélioré -->
      <div class="absolute inset-0 opacity-10" 
           style="background-image: url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M50 50v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-40V0h-2v4h-4v2h4v4h2V6h4V4h-4zM10 50v-4H8v4H4v2h4v4h2v-4h4v-2h-4zM10 10V0H8v4H4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
      </div>
      
      <!-- Cercles décoratifs -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
  <!-- Hero Section - utilisation directe des utilities -->
<div class="relative z-10 max-w-7xl mx-auto text-center">
  
  <!-- Logo et Titre -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
    <div class="relative">
      <ClipboardList class="w-16 h-16 md:w-20 md:h-20 text-white animate-float" />
      <div class="absolute -inset-2 bg-white/20 rounded-full blur-xl animate-pulse-soft"></div>
    </div>
    
    <!-- ✅ Utilisation directe des classes Tailwind + font-titillium -->
    <h1 class="font-titillium text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
      Gestion des Candidatures
    </h1>
  </div>

  <!-- ✅ Sous-titre avec classes directes -->
  <p class="font-titillium text-white/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
    Plateforme moderne de gestion des recrutements • {{ currentDate }}
  </p>
</div>

    <!-- ========== TOAST NOTIFICATION ========== -->
    <Transition name="slide-right">
      <div v-if="notification.show" 
           class="fixed top-24 right-4 z-50 max-w-md">
        <div class="flex items-center gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-sm"
             :class="{
               'bg-green-500/90 text-white border border-green-400': notification.type === 'success',
               'bg-red-500/90 text-white border border-red-400': notification.type === 'error',
               'bg-blue-500/90 text-white border border-blue-400': notification.type === 'info'
             }">
          <component :is="getNotificationIcon(notification.type)" class="w-5 h-5" />
          <p class="text-sm font-medium">{{ notification.message }}</p>
          <button @click="notification.show = false" class="ml-auto hover:opacity-80">
            <X class="w-4 h-4" />
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
    </section>

    <!-- ========== FOOTER ========== -->
    <footer class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-auto border-t border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <ClipboardList class="w-5 h-5 text-white" />
            </div>
            <div>
              <p class="text-sm text-gray-300">
                © 2026 - Gestion des Candidatures
              </p>
              <p class="text-xs text-gray-400">Test Technique Vue.js</p>
            </div>
          </div>
          
          <!-- API Status amélioré -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-full">
              <div class="relative">
                <div class="w-3 h-3 rounded-full"
                     :class="apiStatus ? 'bg-green-400' : 'bg-red-400'"></div>
                <div class="absolute -inset-1 rounded-full animate-ping opacity-75"
                     :class="apiStatus ? 'bg-green-400' : 'bg-red-400'"></div>
              </div>
              <span class="text-sm font-medium">
                API {{ apiStatus ? 'Connectée' : 'Déconnectée' }}
              </span>
            </div>
            
            <!-- Version badge -->
            <span class="text-xs px-3 py-1 bg-gray-700 rounded-full text-gray-300">
              v2.0.0
            </span>
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

import { ref, onMounted, onUnmounted, computed } from 'vue'
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

// ========== COMPUTED ==========
const currentDate = computed(() => {
  return new Date().toLocaleDateString('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  })
})

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
/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
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
  transform: translateY(-20px);
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

/* Print styles */
@media print {
  header,
  footer,
  .toast,
  section {
    display: none !important;
  }
}
</style>