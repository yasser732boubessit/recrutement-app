<!--
  Composant de liste des candidatures
  Affiche toutes les candidatures sous forme de grille
-->

<template>
  <div class="candidature-list">
    <!-- Message si aucune candidature -->
    <div v-if="candidatures.length === 0" class="empty-state">
      <p>Aucune candidature trouvée</p>
      <p class="empty-hint">Essayez de modifier vos filtres</p>
    </div>

    <!-- Grille des candidatures -->
    <div v-else class="grid">
      <CandidatureCard
        v-for="candidature in candidatures"
        :key="candidature.id"
        :candidature="candidature"
        @status-change="handleStatusChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CandidatureList - Affiche une grille de cartes de candidatures
 */

import CandidatureCard from './CandidatureCard.vue'
import type { Candidature } from '../types'

// Props
defineProps<{
  candidatures: Candidature[]
  loading: boolean
}>()

// Événements
const emit = defineEmits<{
  (e: 'status-change', id: number, newStatus: string): void
}>()

// ===== MÉTHODES =====

/**
 * Gère le changement de statut d'une candidature
 * @param id - ID de la candidature
 * @param newStatus - Nouveau statut
 */
const handleStatusChange = (id: number, newStatus: string) => {
  emit('status-change', id, newStatus)
}
</script>

<style scoped>
.candidature-list {
  min-height: 400px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 8px;
  color: #6b7280;
}

.empty-hint {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: #9ca3af;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>