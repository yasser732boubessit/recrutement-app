<!--
  HomeView - Page d'accueil premium avec Lucide Icons
  Design System avec Tailwind v4 - Dimensions et espacements optimisés
  Version corrigée - Contenu centré
-->

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    
    <!-- ========== HERO SECTION ========== -->
    <section class="relative bg-gradient-to-r from-blue-600 to-purple-700 pt-12 pb-8 px-4 md:px-8 overflow-hidden shadow-lg">
      <!-- Background pattern décoratif -->
      <div class="absolute inset-0 opacity-5" 
           style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
      </div>
      
      <!-- Contenu centré de la hero section -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Titre avec icône animée -->
        <div class="flex items-center gap-4 mb-4">
          <ClipboardList class="w-10 h-10 md:w-12 md:h-12 text-white animate-bounce" />
          <h1 class="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            Gestion des Candidatures
          </h1>
        </div>
        
        <!-- Sous-titre avec date -->
        <p class="text-white/90 text-lg font-light mb-18">
          Gérez efficacement vos recrutements • {{ currentDate }}
        </p>

        <!-- Quick Stats Cards -->
        <div v-if="!store.loading && store.candidatures?.length" 
             class="flex flex-wrap gap-4 justify-start md:justify-center mb-18">
          
          <!-- Total Card -->
          <div @click="scrollToTop" 
               class="cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
            <div class="flex items-center gap-4 p-4 min-w-[150px] rounded-2xl shadow-md bg-gradient-to-r from-amber-400 to-orange-400 text-white">
              <BarChart3 class="w-8 h-8" />
              <div class="flex flex-col">
                <span class="text-2xl font-bold">{{ store.totalCandidatures }}</span>
                <span class="text-xs uppercase tracking-wider opacity-80">Total</span>
              </div>
            </div>
          </div>
          
          <!-- Statut Cards -->
          <div v-for="(count, statut) in store.statsParStatut" 
               :key="statut"
               @click="filterByStatut(statut)"
               class="cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
            <div :class="[
              'flex items-center gap-4 p-4 min-w-[150px] rounded-2xl shadow-md border-2',
              getStatutClasses(statut)
            ]">
              <component :is="getStatutIconComponent(statut)" class="w-8 h-8" />
              <div class="flex flex-col">
                <span class="text-2xl font-bold">{{ count }}</span>
                <span class="text-xs uppercase tracking-wider opacity-80">{{ statut }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- ========== FILTERS BAR ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
      <FiltersBar 
        ref="filtersBar"
        @filter-change="handleFilterChange"
        @reset-filters="handleResetFilters"
      />
    </div>

    <!-- ========== MAIN CONTENT ========== -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Résultats de recherche et contrôles de vue -->
      <div v-if="!store.loading && store.candidatures?.length" 
           class="flex justify-between items-center mb-6">
        <!-- Compteur de résultats -->
        <div class="flex items-center gap-2">
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm border border-blue-200">
            {{ store.pagination.totalItems }}
          </span>
          <span class="text-gray-600 text-sm">
            candidature{{ store.pagination.totalItems > 1 ? 's' : '' }} trouvée{{ store.pagination.totalItems > 1 ? 's' : '' }}
          </span>
        </div>
        
        <!-- Toggle Grille/Liste -->
        <div class="flex gap-2 bg-white p-1 rounded-xl shadow-sm">
          <button @click="viewMode = 'grid'"
                  class="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'"
                  title="Vue grille">
            <LayoutGrid class="w-5 h-5" />
            <span class="hidden sm:inline">Grille</span>
          </button>
          <button @click="viewMode = 'list'"
                  class="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  :class="viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'"
                  title="Vue liste">
            <List class="w-5 h-5" />
            <span class="hidden sm:inline">Liste</span>
          </button>
        </div>
      </div>

      <!-- ========== ÉTATS DYNAMIQUES ========== -->
      <Transition name="fade" mode="out-in">
        
        <!-- Loading State -->
        <div v-if="store.loading" class="flex flex-col items-center justify-center py-16">
          <Loader2 class="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p class="text-xl text-gray-700 font-medium mb-2">Chargement des candidatures...</p>
          <p class="text-gray-500 text-sm">Préparez votre café ☕</p>
        </div>

        <!-- Error State -->
        <div v-else-if="store.error" class="max-w-md mx-auto my-8 text-center">
          <div class="bg-red-50 text-red-800 p-8 rounded-2xl border border-red-200 shadow-sm">
            <AlertCircle class="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h3 class="text-2xl text-gray-800 font-bold mb-2">Oups ! Une erreur est survenue</h3>
            <p class="text-gray-600 mb-6 text-sm">{{ store.error }}</p>
            <button @click="retry" 
                    class="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm">
              <RotateCw class="w-4 h-4" />
              Réessayer
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!store.candidatures?.length" class="max-w-md mx-auto my-8 text-center">
          <div class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div class="relative w-32 h-32 mx-auto mb-8">
              <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
              <Search class="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <h3 class="text-2xl text-gray-800 font-bold mb-2">Aucune candidature trouvée</h3>
            <p class="text-gray-500 mb-6 text-sm">Essayez de modifier vos filtres ou revenez plus tard</p>
            <button @click="handleResetFilters" 
                    class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <RotateCw class="w-4 h-4" />
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        <!-- Liste des candidatures -->
        <div v-else class="mb-8">
          <TransitionGroup 
            :name="viewMode === 'grid' ? 'grid-animation' : 'list-animation'" 
            tag="div"
            :class="[
              'grid gap-6',
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            ]">
            <CandidatureCard
              v-for="candidature in store.candidatures"
              :key="candidature.id"
              :candidature="candidature"
              @status-change="handleStatusChange"
              class="cursor-pointer"
            />
          </TransitionGroup>
        </div>
      </Transition>

      <!-- ========== PAGINATION ========== -->
      <div v-if="!store.loading && store.candidatures?.length && store.pagination.totalPages > 1" 
           class="pb-12">
        <Pagination 
          :current-page="store.pagination.currentPage"
          :total-pages="store.pagination.totalPages"
          :total-items="store.pagination.totalItems"
          @page-change="handlePageChange"
        />
      </div>
    </main>

    <!-- ========== SCROLL TO TOP BUTTON ========== -->
    <Transition name="slide-up">
      <button v-if="showScrollTop" 
              @click="scrollToTop"
              class="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center"
              title="Retour en haut">
        <ChevronUp class="w-6 h-6" />
      </button>
    </Transition>
   </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCandidatureStore } from '../stores/candidatureStore'
import FiltersBar from '../components/FiltersBar.vue'
import CandidatureCard from '../components/CandidatureCard.vue'
import Pagination from '../components/Pagination.vue'
import type { Filters } from '../types'

// Imports Lucide Icons
import { 
  ClipboardList,
  BarChart3,
  LayoutGrid,
  List,
  Loader2,
  AlertCircle,
  RotateCw,
  Search,
  ChevronUp,
  Clock,
  Handshake,
  Laptop,
  CheckCircle,
  XCircle
} from 'lucide-vue-next'

// ========== STORES & ROUTER ==========
const router = useRouter()
const store = useCandidatureStore()

// ========== STATE ==========
const viewMode = ref<'grid' | 'list'>('grid')
const showScrollTop = ref(false)

// ========== COMPUTED ==========
const currentDate = computed(() => {
  return new Date().toLocaleDateString('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  })
})

// ========== HOOKS ==========
onMounted(async () => {
  console.log('📋 HomeView monté')
  
  // Charger la préférence de vue
  const savedViewMode = localStorage.getItem('preferredViewMode') as 'grid' | 'list' | null
  if (savedViewMode) {
    viewMode.value = savedViewMode
  }
  
  // Initialiser le store et charger les données
  await store.initialize()
  await store.loadCandidatures()
  
  // Écouter le scroll
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// ========== WATCHERS ==========
watch(viewMode, (newMode) => {
  localStorage.setItem('preferredViewMode', newMode)
})

// ========== METHODS ==========

/**
 * Gère le scroll pour afficher/masquer le bouton retour en haut
 */
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
}

/**
 * Retourne le composant d'icône correspondant au statut
 */
const getStatutIconComponent = (statut: string) => {
  const icons: Record<string, any> = {
    'En attente': Clock,
    'Entretien RH': Handshake,
    'Entretien technique': Laptop,
    'Accepté': CheckCircle,
    'Refusé': XCircle
  }
  return icons[statut] || Clock
}

/**
 * Retourne les classes CSS pour le statut
 */
const getStatutClasses = (statut: string): string => {
  const classes: Record<string, string> = {
    'En attente': 'bg-amber-50 text-amber-800 border-amber-200',
    'Entretien RH': 'bg-blue-50 text-blue-800 border-blue-200',
    'Entretien technique': 'bg-purple-50 text-purple-800 border-purple-200',
    'Accepté': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Refusé': 'bg-red-50 text-red-800 border-red-200'
  }
  return classes[statut] || 'bg-gray-50 text-gray-800 border-gray-200'
}

/**
 * Filtre les candidatures par statut
 */
const filterByStatut = async (statut: string) => {
  await store.setFilters({ statut, page: 1 })
}

/**
 * Gère les changements de filtres
 */
const handleFilterChange = async (filters: Partial<Filters>) => {
  await store.setFilters(filters)
}

/**
 * Réinitialise tous les filtres
 */
const handleResetFilters = async () => {
  await store.resetFilters()
}

/**
 * Gère le changement de statut d'une candidature
 */
const handleStatusChange = async (id: number, newStatus: string) => {
  await store.updateStatut(id, newStatus)
}

/**
 * Gère le changement de page
 */
const handlePageChange = async (page: number) => {
  await store.setPage(page)
  scrollToTop()
}

/**
 * Navigue vers le détail d'une candidature
 */
const goToDetail = (id: number) => {
  router.push(`/candidature/${id}`)
}

/**
 * Réessaie de charger les données en cas d'erreur
 */
const retry = async () => {
  await store.loadCandidatures()
}

/**
 * Scroll vers le haut de la page
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* ========== ANIMATIONS PERSONNALISÉES ========== */

/* Animation de secousse pour l'erreur */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* ========== TRANSITIONS ========== */

/* Transition Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transition pour la grille */
.grid-animation-enter-active,
.grid-animation-leave-active {
  transition: all 0.3s ease;
}

.grid-animation-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.grid-animation-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Transition pour la liste */
.list-animation-enter-active,
.list-animation-leave-active {
  transition: all 0.3s ease;
}

.list-animation-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-animation-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Transition pour le bouton slide-up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ========== PRINT STYLES ========== */
@media print {
  .bg-gradient-to-r {
    background: none !important;
    color: black !important;
  }
  
  .filters-bar,
  .scroll-top-btn {
    display: none !important;
  }
}
</style>