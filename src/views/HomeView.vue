<!--
  HomeView - Page d'accueil premium avec Lucide Icons
  Version avec bouton d'ajout et assistant de création multi-étapes
-->

<template>
  <div class="">
    
    <!-- ========== HERO SECTION ========== -->

      
      <!-- Contenu centré de la hero section -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Titre avec icône animée -->


        <!-- Quick Stats Cards -->
        <div v-if="!store.loading && store.candidatures?.length" 
             class="flex flex-wrap gap-4 justify-start md:justify-center mb-8">
          
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
           class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        
        <!-- Compteur de résultats -->
        <div class="flex items-center gap-2">
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm border border-blue-200">
            {{ store.pagination.totalItems }}
          </span>
          <span class="text-gray-600 text-sm">
            candidature{{ store.pagination.totalItems > 1 ? 's' : '' }} trouvée{{ store.pagination.totalItems > 1 ? 's' : '' }}
          </span>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-3 w-full sm:w-auto">
     
          
          <!-- Toggle Grille/Liste -->
          <div class="flex gap-2 bg-white p-1 rounded-xl shadow-sm">
                 <!-- Bouton Ajouter -->
          <button @click="goToAddPage"
                  class="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium 
                         hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
            <Plus class="w-4 h-4" />
            <span>Créer </span>
          </button>
            
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
            
            <!-- Bouton pour créer la première candidature -->
            <button @click="showAddModal = true" 
                    class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              <Plus class="w-4 h-4" />
              Créer une candidature
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
              @delete="handleDeleteCandidature"
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

 

    <!-- ========== MODAL DE CONFIRMATION SUPPRESSION ========== -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showDeleteConfirm" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/40" @click="showDeleteConfirm = false"></div>
          
          <!-- Modal -->
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div class="text-center">
              <div class="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Confirmer la suppression</h3>
              <p class="text-sm text-gray-500 mb-6">
                Êtes-vous sûr de vouloir supprimer cette candidature ? Cette action est irréversible.
              </p>
              <div class="flex gap-3 justify-center">
                <button @click="showDeleteConfirm = false"
                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Annuler
                </button>
                <button @click="confirmDelete"
                        :disabled="deleteLoading"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                  <Loader2 v-if="deleteLoading" class="w-4 h-4 animate-spin" />
                  {{ deleteLoading ? 'Suppression...' : 'Supprimer' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ========== SCROLL TO TOP BUTTON ========== -->
    <Transition name="slide-up">
      <button v-if="showScrollTop" 
              @click="scrollToTop"
              class="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center"
              title="Retour en haut">
        <ChevronUp class="w-6 h-6" />
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCandidatureStore } from '../stores/candidatureStore'
import FiltersBar from '../components/FiltersBar.vue'
import CandidatureCard from '../components/CandidatureCard.vue'
import Pagination from '../components/Pagination.vue'
import type { Candidature, Filters } from '../types'

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
  XCircle,
  Plus,
  AlertTriangle
} from 'lucide-vue-next'

// ========== STORES & ROUTER ==========
const router = useRouter()
const store = useCandidatureStore()

// ========== STATE ==========
const viewMode = ref<'grid' | 'list'>('grid')
const showScrollTop = ref(false)
const showAddModal = ref(false)
const showDeleteConfirm = ref(false)
const deleteLoading = ref(false)
const candidatureToDelete = ref<number | null>(null)

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
// Dans les méthodes
const goToAddPage = () => {
  router.push('/ajouter')
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
  
  // Afficher une notification
  if (typeof window !== 'undefined' && (window as any).showNotification) {
    (window as any).showNotification('Statut mis à jour avec succès', 'success')
  }
}

/**
 * Gère la suppression d'une candidature (ouvre la confirmation)
 */
const handleDeleteCandidature = (id: number) => {
  candidatureToDelete.value = id
  showDeleteConfirm.value = true
}

/**
 * Confirme la suppression
 */
const confirmDelete = async () => {
  if (!candidatureToDelete.value) return
  
  deleteLoading.value = true
  try {
    await store.deleteCandidature(candidatureToDelete.value)
    
    // Afficher une notification
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification('Candidature supprimée avec succès', 'success')
    }
    
    showDeleteConfirm.value = false
    candidatureToDelete.value = null
  } catch (error) {
    console.error('Erreur suppression:', error)
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification('Erreur lors de la suppression', 'error')
    }
  } finally {
    deleteLoading.value = false
  }
}

/**
 * Gère la création d'une nouvelle candidature
 */
const handleCreateCandidature = async (candidature: Omit<Candidature, 'id'>) => {
  try {
    await store.createCandidature(candidature)
    
    // Afficher une notification
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification('Candidature créée avec succès', 'success')
    }
    
    showAddModal.value = false
  } catch (error) {
    console.error('Erreur création:', error)
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification('Erreur lors de la création', 'error')
    }
  }
}

/**
 * Gère le changement de page
 */
const handlePageChange = async (page: number) => {
  await store.setPage(page)
  scrollToTop()
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
/* ========== ANIMATIONS ========== */

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
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
  .scroll-top-btn,
  button {
    display: none !important;
  }
}
</style>