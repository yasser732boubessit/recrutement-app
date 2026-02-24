<!--
  FiltersBar - Barre de filtres premium avec Lucide Icons
  Design moderne avec sticky position et gestion d'état optimisée
-->

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 z-40"
       :class="{ 'sticky top-4 shadow-lg': isSticky }">
    
    <div class="p-4 md:p-6">
      <!-- ========== FILTRES PRINCIPAUX ========== -->
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        
        <!-- Recherche avec icône -->
        <div class="flex-1 w-full lg:w-auto relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            v-model="searchInput"
            @input="handleSearchInput"
            placeholder="Rechercher par nom, compétences..."
            class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 
                   focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 
                   transition-all"
          />
        </div>

        <!-- Filtres dropdown -->
        <div class="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          
          <!-- Filtre Statut -->
          <div class="relative flex-1 sm:min-w-[180px]">
            <select 
              v-model="selectedStatut" 
              @change="handleStatutChange"
              class="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-xl text-sm 
                     bg-gray-50 text-gray-700 cursor-pointer
                     focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
                     transition-all"
            >
              <option value="">Tous les statuts</option>
              <option 
                v-for="statut in store.statuts" 
                :key="statut.id" 
                :value="statut.nom"
              >
                {{ statut.nom }}
              </option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <!-- Filtre Poste -->
          <div class="relative flex-1 sm:min-w-[180px]">
            <select 
              v-model="selectedPoste" 
              @change="handlePosteChange"
              class="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-xl text-sm 
                     bg-gray-50 text-gray-700 cursor-pointer
                     focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
                     transition-all"
            >
              <option value="">Tous les postes</option>
              <option 
                v-for="poste in postes" 
                :key="poste.id" 
                :value="poste.titre"
              >
                {{ poste.titre }}
              </option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Bouton reset -->
        <button 
          @click="resetFilters" 
          class="w-full lg:w-auto px-6 py-2.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-xl 
                 text-sm font-medium transition-all flex items-center justify-center gap-2
                 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ '!bg-red-500 !text-white !border-red-500 hover:!bg-red-600': hasActiveFilters }"
          :disabled="!hasActiveFilters"
        >
          <RotateCw class="w-4 h-4" :class="{ 'animate-spin': hasActiveFilters }" />
          <span>Réinitialiser</span>
        </button>
      </div>

      <!-- ========== FILTRES ACTIFS ========== -->
      <TransitionGroup 
        name="fade" 
        tag="div" 
        v-if="hasActiveFilters"
        class="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-100"
      >
        <span class="text-xs font-medium text-gray-500">Filtres actifs:</span>
        
        <!-- Tag Statut -->
        <span v-if="selectedStatut" 
              @click="removeFilter('statut')"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 
                     rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100 
                     transition-colors border border-blue-200 group">
          <span>{{ selectedStatut }}</span>
          <X class="w-3 h-3 group-hover:scale-110 transition-transform" />
        </span>

        <!-- Tag Poste -->
        <span v-if="selectedPoste" 
              @click="removeFilter('poste')"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 
                     rounded-full text-xs font-medium cursor-pointer hover:bg-purple-100 
                     transition-colors border border-purple-200 group">
          <span>{{ selectedPoste }}</span>
          <X class="w-3 h-3 group-hover:scale-110 transition-transform" />
        </span>

        <!-- Tag Recherche -->
        <span v-if="searchInput" 
              @click="removeFilter('search')"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 
                     rounded-full text-xs font-medium cursor-pointer hover:bg-amber-100 
                     transition-colors border border-amber-200 group">
          <span>"{{ truncateSearch(searchInput) }}"</span>
          <X class="w-3 h-3 group-hover:scale-110 transition-transform" />
        </span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * FiltersBar - Barre de filtres premium avec Design System
 * Version optimisée avec Lucide Icons et meilleure UX
 */

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCandidatureStore } from '../stores/candidatureStore'
import { posteApi } from '../api/api'
import { useDebounce } from '../composables/useDebounce'
import type { Poste } from '../types'

// Imports Lucide Icons
import { 
  Search, 
  ChevronDown, 
  RotateCw, 
  X 
} from 'lucide-vue-next'

// ========== STORE ==========
const store = useCandidatureStore()

// ========== STATE ==========
const searchInput = ref(store.filters.search || '')
const selectedStatut = ref(store.filters.statut || '')
const selectedPoste = ref(store.filters.poste || '')
const postes = ref<Poste[]>([])
const isSticky = ref(false)

// Debounce pour la recherche (300ms pour meilleure réactivité)
const debouncedSearch = useDebounce(searchInput, 300)

// ========== ÉVÉNEMENTS ==========
const emit = defineEmits<{
  (e: 'filter-change', filters: { statut?: string; poste?: string; search?: string }): void
  (e: 'reset-filters'): void
}>()

// ========== COMPUTED ==========
const hasActiveFilters = computed(() => 
  selectedStatut.value !== '' || 
  selectedPoste.value !== '' || 
  searchInput.value !== ''
)

// ========== WATCHERS ==========

// Surveille les changements avec debounce pour la recherche
watch(debouncedSearch, (newSearch) => {
  emitFilterChange({
    statut: selectedStatut.value,
    poste: selectedPoste.value,
    search: newSearch
  })
})

// ========== METHODS ==========

/**
 * Émet les changements de filtres
 */
const emitFilterChange = (filters: { statut?: string; poste?: string; search?: string }) => {
  emit('filter-change', {
    statut: filters.statut || undefined,
    poste: filters.poste || undefined,
    search: filters.search || undefined
  })
}

/**
 * Gère le changement de recherche
 */
const handleSearchInput = () => {
  // Le watcher sur debouncedSearch s'occupe de l'émission
}

/**
 * Gère le changement de statut
 */
const handleStatutChange = () => {
  emitFilterChange({
    statut: selectedStatut.value,
    poste: selectedPoste.value,
    search: searchInput.value
  })
}

/**
 * Gère le changement de poste
 */
const handlePosteChange = () => {
  emitFilterChange({
    statut: selectedStatut.value,
    poste: selectedPoste.value,
    search: searchInput.value
  })
}

/**
 * Supprime un filtre spécifique
 */
const removeFilter = (type: 'statut' | 'poste' | 'search') => {
  if (type === 'statut') {
    selectedStatut.value = ''
  } else if (type === 'poste') {
    selectedPoste.value = ''
  } else if (type === 'search') {
    searchInput.value = ''
  }
  
  // Émettre immédiatement après modification
  emitFilterChange({
    statut: selectedStatut.value,
    poste: selectedPoste.value,
    search: searchInput.value
  })
}

/**
 * Réinitialise tous les filtres
 */
const resetFilters = () => {
  searchInput.value = ''
  selectedStatut.value = ''
  selectedPoste.value = ''
  emit('reset-filters')
}

/**
 * Tronque la recherche pour l'affichage
 */
const truncateSearch = (text: string): string => {
  if (text.length <= 15) return text
  return text.substring(0, 12) + '...'
}

/**
 * Charge la liste des postes
 */
const loadPostes = async () => {
  try {
    postes.value = await posteApi.getAll()
  } catch (error) {
    console.error('Erreur chargement postes:', error)
    postes.value = []
  }
}

/**
 * Gère le scroll pour l'effet sticky
 */
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isSticky.value = scrollTop > 200
}

// ========== LIFECYCLE ==========

onMounted(async () => {
  await loadPostes()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Animation pour les filtres actifs */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animation pour le spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Effet sticky */
.sticky {
  position: sticky;
  top: 1rem;
  z-index: 40;
}

/* Styles responsifs */
@media (max-width: 640px) {
  .filters-bar {
    padding: 1rem;
  }
  
  .filter-tag {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
  }
}
</style>