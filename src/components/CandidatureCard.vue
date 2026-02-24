<!--
  CandidatureCard - Carte individuelle avec Lucide Icons
  Version premium avec icônes professionnelles
-->

<template>
  <div 
    class="candidature-card"
    @click="goToDetail"
  >
    <!-- En-tête avec nom et badge de statut -->
    <div class="card-header">
      <h3 class="candidate-name">{{ candidature.nom }}</h3>
      <span 
        class="status-badge"
        :class="getStatusClass(candidature.statut)"
      >
        {{ candidature.statut }}
      </span>
    </div>

    <!-- Poste -->
    <div class="poste-container">
      <Briefcase class="w-4 h-4 text-gray-500" />
      <span class="poste-text">{{ candidature.poste }}</span>
    </div>

    <!-- Localisation et date -->
    <div class="info-row">
      <div class="info-item">
        <MapPin class="w-3.5 h-3.5 text-gray-400" />
        <span class="info-text">{{ candidature.localisation }}</span>
      </div>
      <div class="info-item">
        <Calendar class="w-3.5 h-3.5 text-gray-400" />
        <span class="info-text">{{ formatDate(candidature.dateCandidature) }}</span>
      </div>
    </div>

    <!-- Compétences (Tags) -->
    <div class="competences-container">
      <span 
        v-for="(competence, index) in displayedCompetences" 
        :key="index"
        class="competence-tag"
      >
        {{ competence }}
      </span>
      <span 
        v-if="candidature.competences.length > 3" 
        class="competence-tag more"
      >
        +{{ candidature.competences.length - 3 }}
      </span>
    </div>

    <!-- Meta informations (Expérience, Salaire, Disponibilité) -->
    <div class="meta-grid">
      <div class="meta-item">
        <Briefcase class="w-4 h-4 text-gray-500" />
        <span class="meta-value">{{ candidature.experience }}</span>
      </div>
      <div class="meta-item">
        <Euro class="w-4 h-4 text-gray-500" />
        <span class="meta-value">{{ formatSalary(candidature.salaireSouhaite) }}</span>
      </div>
      <div class="meta-item">
        <Clock class="w-4 h-4 text-gray-500" />
        <span class="meta-value">{{ candidature.disponibilite }}</span>
      </div>
    </div>

    <!-- Footer avec commentaires et action -->
    <div class="card-footer">
      <div class="comments-count">
        <MessageCircle class="w-4 h-4 text-gray-400" />
        <span>{{ candidature.commentaires?.length || 0 }} commentaire{{ candidature.commentaires?.length !== 1 ? 's' : '' }}</span>
      </div>
      
      <!-- Sélecteur de statut rapide (apparaît au hover) -->
      <div class="quick-actions">
        <select 
          @click.stop
          @change="updateStatus($event)"
          :value="candidature.statut"
          class="quick-status-select"
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
        
        <button class="details-button" @click.stop="goToDetail">
          Voir détails →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CandidatureCard - Carte individuelle avec icônes Lucide
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
  MessageCircle 
} from 'lucide-vue-next'

// Props
const props = defineProps<{
  candidature: Candidature
}>()

// Événements
const emit = defineEmits<{
  (e: 'status-change', id: number, newStatus: string): void
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
 * @param event - Événement de changement
 */
const updateStatus = (event: Event) => {
  event.stopPropagation()
  const select = event.target as HTMLSelectElement
  const newStatus = select.value
  console.log('CandidatureCard: Changement de statut', props.candidature.id, newStatus)
  
  if (newStatus !== props.candidature.statut) {
    emit('status-change', Number(props.candidature.id), newStatus)
  }
}

/**
 * Retourne la classe CSS pour le statut
 * @param status - Nom du statut
 */
const getStatusClass = (status: string): string => {
  const statusMap: Record<string, string> = {
    'En attente': 'status-pending',
    'Entretien RH': 'status-rh',
    'Entretien technique': 'status-tech',
    'Accepté': 'status-accepted',
    'Refusé': 'status-rejected'
  }
  return statusMap[status] || 'status-pending'
}

/**
 * Formate la date pour l'affichage
 * @param dateStr - Date au format ISO
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
 * @param salary - Salaire en euros
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
.candidature-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.candidature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e0;
}

/* En-tête */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.candidate-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.4;
}

/* Badges de statut */
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

.status-rh {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

.status-tech {
  background: #ede9fe;
  color: #5b21b6;
  border: 1px solid #c4b5fd;
}

.status-accepted {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Poste */
.poste-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.9375rem;
}

.poste-text {
  font-weight: 500;
}

/* Ligne d'information */
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: #718096;
  font-size: 0.875rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.info-text {
  color: #4a5568;
}

/* Compétences */
.competences-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.competence-tag {
  background: #f7fafc;
  color: #2d3748;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.competence-tag:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.competence-tag.more {
  background: #edf2f7;
  color: #4a5568;
}

/* Grille meta */
.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  background: #f7fafc;
  padding: 0.75rem;
  border-radius: 12px;
  margin: 0.25rem 0;
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.meta-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2d3748;
}

/* Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #edf2f7;
}

.comments-count {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #718096;
  font-size: 0.8125rem;
}

/* Actions rapides (apparaissent au hover) */
.quick-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.2s ease;
}

.candidature-card:hover .quick-actions {
  opacity: 1;
  transform: translateX(0);
}

.quick-status-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.75rem;
  background: white;
  color: #2d3748;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.quick-status-select:hover {
  border-color: #a0aec0;
  background: #f7fafc;
}

.details-button {
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.details-button:hover {
  background: #3182ce;
}

/* Responsive */
@media (max-width: 640px) {
  .candidature-card {
    padding: 1rem;
  }

  .meta-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .meta-item {
    flex-direction: row;
    justify-content: space-between;
  }

  .quick-actions {
    opacity: 1;
    transform: none;
  }

  .card-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .quick-actions {
    width: 100%;
  }

  .quick-status-select {
    flex: 1;
  }
}

/* Animations */
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

.candidature-card {
  animation: cardAppear 0.3s ease-out;
}
</style>