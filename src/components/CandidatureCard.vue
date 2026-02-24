<!--
  CandidatureCard - Carte individuelle avec icônes Lucide
  Version premium avec bouton de suppression
-->

<template>
  <div 
    class="group bg-white rounded-xl p-5 shadow-sm border border-gray-200 transition-all duration-200 cursor-pointer flex flex-col h-full relative overflow-hidden hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5"
    @click="goToDetail"
  >
    <!-- ========== BOUTON SUPPRESSION ========== -->
    <button 
      @click.stop="handleDelete"
      class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm border border-gray-200 
             opacity-0 group-hover:opacity-100 transition-all duration-200 z-10
             hover:bg-red-50 hover:border-red-200 hover:shadow-md
             flex items-center justify-center"
      title="Supprimer la candidature"
    >
      <Trash2 class="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
    </button>

    <!-- En-tête avec nom et badge de statut -->
    <div class="flex justify-between items-start gap-3 pr-8">
      <h3 class="text-lg font-semibold text-gray-900 leading-tight">
        {{ candidature.nom }}
      </h3>
      <span 
        class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-sm"
        :class="getStatusClass(candidature.statut)"
      >
        {{ candidature.statut }}
      </span>
    </div>

    <!-- Poste -->
    <div class="flex items-center gap-2 text-gray-600 text-sm">
      <Briefcase class="w-4 h-4 text-gray-500" />
      <span class="font-medium">{{ candidature.poste }}</span>
    </div>

    <!-- Localisation et date -->
    <div class="flex justify-between items-center gap-4 text-gray-500 text-sm">
      <div class="flex items-center gap-1.5">
        <MapPin class="w-3.5 h-3.5 text-gray-400" />
        <span class="text-gray-600">{{ candidature.localisation }}</span>
      </div>
      <div class="flex items-center gap-1.5">
        <Calendar class="w-3.5 h-3.5 text-gray-400" />
        <span class="text-gray-600">{{ formatDate(candidature.dateCandidature) }}</span>
      </div>
    </div>

    <!-- Compétences (Tags) -->
    <div class="flex flex-wrap gap-2 my-1">
      <span 
        v-for="(competence, index) in displayedCompetences" 
        :key="index"
        class="bg-gray-50 text-gray-700 px-3 py-1 rounded-md text-xs font-medium border border-gray-200 hover:bg-gray-100 hover:border-gray-400 transition-all"
      >
        {{ competence }}
      </span>
      <span 
        v-if="candidature.competences.length > 3" 
        class="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium border border-gray-200"
      >
        +{{ candidature.competences.length - 3 }}
      </span>
    </div>

    <!-- Meta informations (Expérience, Salaire, Disponibilité) -->
    <div class="grid grid-cols-3 gap-3 bg-gray-50 p-3 rounded-xl my-1">
      <div class="flex flex-col items-center gap-1 text-center">
        <Briefcase class="w-4 h-4 text-gray-500" />
        <span class="text-xs font-semibold text-gray-700">{{ candidature.experience }}</span>
      </div>
      <div class="flex flex-col items-center gap-1 text-center">
        <Euro class="w-4 h-4 text-gray-500" />
        <span class="text-xs font-semibold text-gray-700">{{ formatSalary(candidature.salaireSouhaite) }}</span>
      </div>
      <div class="flex flex-col items-center gap-1 text-center">
        <Clock class="w-4 h-4 text-gray-500" />
        <span class="text-xs font-semibold text-gray-700">{{ candidature.disponibilite }}</span>
      </div>
    </div>

    <!-- Footer avec commentaires et action -->
    <div class="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
      <div class="flex items-center gap-1.5 text-gray-500 text-xs">
        <MessageCircle class="w-4 h-4 text-gray-400" />
        <span>{{ candidature.commentaires?.length || 0 }} commentaire{{ candidature.commentaires?.length !== 1 ? 's' : '' }}</span>
      </div>
      
      <!-- Actions rapides - apparaissent au hover -->
      <div class="flex gap-2 opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
        <select 
          @click.stop
          @change="updateStatus($event)"
          :value="candidature.statut"
          class="px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-gray-700 cursor-pointer outline-none hover:border-gray-400 hover:bg-gray-50 transition-all"
          title="Changer le statut"
        >
          <option 
            v-for="statut in store.statuts" 
            :key="statut.id" 
            :value="statut.nom"
          >
            {{ statut.nom }}
          </option>
        </select>
        
        <button @click.stop="goToDetail" 
                class="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-600 transition-colors whitespace-nowrap">
          Détails
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CandidatureCard - Carte individuelle avec icônes Lucide
 * Version avec bouton de suppression
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCandidatureStore } from '../stores/candidatureStore'
import type { Candidature } from '../types'

// Imports Lucide Icons
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Euro, 
  Clock, 
  MessageCircle,
  Trash2
} from 'lucide-vue-next'

// Props
const props = defineProps<{
  candidature: Candidature
}>()

// Événements
const emit = defineEmits<{
  (e: 'status-change', id: number, newStatus: string): void
  (e: 'delete', id: number): void
}>()

// Store et router
const store = useCandidatureStore()
const router = useRouter()

// ===== COMPUTED =====

/**
 * Compétences à afficher (max 3)
 */
const displayedCompetences = computed(() => 
  props.candidature.competences?.slice(0, 3) || []
)

// ===== MÉTHODES =====

/**
 * Navigue vers la page de détail
 */
const goToDetail = () => {
  router.push(`/candidature/${props.candidature.id}`)
}

/**
 * Met à jour le statut de la candidature
 */
const updateStatus = (event: Event) => {
  event.stopPropagation()
  const select = event.target as HTMLSelectElement
  const newStatus = select.value
  
  if (newStatus !== props.candidature.statut) {
    emit('status-change', Number(props.candidature.id), newStatus)
  }
}

/**
 * Gère la suppression de la candidature
 */
const handleDelete = (event: Event) => {
  event.stopPropagation() // Empêche la propagation du clic vers goToDetail
  emit('delete', Number(props.candidature.id))
}

/**
 * Retourne la classe CSS pour le statut
 */
const getStatusClass = (status: string): string => {
  const statusMap: Record<string, string> = {
    'En attente': 'bg-amber-50 text-amber-800 border border-amber-200',
    'Entretien RH': 'bg-blue-50 text-blue-800 border border-blue-200',
    'Entretien technique': 'bg-purple-50 text-purple-800 border border-purple-200',
    'Accepté': 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    'Refusé': 'bg-red-50 text-red-800 border border-red-200'
  }
  return statusMap[status] || 'bg-gray-50 text-gray-800 border border-gray-200'
}

/**
 * Formate la date pour l'affichage
 */
const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'Date inconnue'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

/**
 * Formate le salaire
 */
const formatSalary = (salary: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(salary)
}
</script>

<style scoped>
/* Styles personnalisés uniquement pour les animations complexes */
@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation d'apparition */
.group {
  animation: cardAppear 0.3s ease-out;
}

/* Assurer que le bouton suppression ne bloque pas les interactions */
.group button.absolute {
  pointer-events: auto;
}

/* Responsive */
@media (max-width: 640px) {
  /* En mobile, le bouton suppression est toujours visible */
  .group button.absolute {
    opacity: 1;
  }
  
  /* Ajustement du padding pour laisser de la place au bouton */
  .group .pr-8 {
    padding-right: 2.5rem;
  }
  
  /* Les actions rapides sont toujours visibles en mobile */
  .group .group-hover\:opacity-100 {
    opacity: 1;
    transform: translateX(0);
  }
  
  /* Footer en colonne sur mobile */
  .group .border-t {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  
  .group .border-t > div:last-child {
    width: 100%;
  }
  
  .group .border-t select {
    flex: 1;
  }
}
</style>