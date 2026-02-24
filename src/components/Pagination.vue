<!--
  Composant de pagination
  Permet de naviguer entre les pages
-->

<template>
  <div class="pagination">
    <button 
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="pagination-button prev"
    >
      ← Précédent
    </button>
    
    <div class="page-numbers">
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="$emit('page-change', page as number)"
        class="page-button"
        :class="{ active: page === currentPage }"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>
    </div>
    
    <button 
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="pagination-button next"
    >
      Suivant →
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * Pagination - Navigation entre les pages
 */

import { computed } from 'vue'

// Props
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

// Événements
defineEmits<{
  (e: 'page-change', page: number): void
}>()

// ===== COMPUTED =====

/**
 * Calcule les pages à afficher dans la pagination
 * Affiche max 5 pages avec des ...
 */
const displayedPages = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    // Affiche toutes les pages
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Toujours afficher la première page
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    // Pages autour de la page courante
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    // Toujours afficher la dernière page
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #374151;
}

.pagination-button:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.page-button {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.page-button:hover:not(:disabled) {
  background: #f3f4f6;
}

.page-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.page-button:disabled {
  border: none;
  background: none;
  cursor: default;
}

@media (max-width: 640px) {
  .pagination {
    flex-direction: column;
  }
  
  .page-numbers {
    order: -1;
  }
}
</style>