<!--
  Section des commentaires
  Affiche et permet d'ajouter des commentaires sur une candidature
-->

<template>
  <div class="comment-section">
    <h3 class="comment-title">
      💬 Commentaires ({{ commentaires.length }})
    </h3>
    
    <!-- Liste des commentaires -->
    <div class="comments-list">
      <div 
        v-for="comment in sortedCommentaires" 
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-header">
          <span class="comment-author">{{ comment.auteur }}</span>
          <span class="comment-date">{{ formatDate(comment.date) }}</span>
        </div>
        <p class="comment-content">{{ comment.contenu }}</p>
      </div>
      
      <!-- Message si aucun commentaire -->
      <div v-if="commentaires.length === 0" class="no-comments">
        <p>Aucun commentaire pour le moment</p>
        <p class="no-comments-hint">Soyez le premier à commenter</p>
      </div>
    </div>
    
    <!-- Formulaire d'ajout -->
    <div class="add-comment">
      <textarea
        v-model="newComment"
        placeholder="Ajouter un commentaire..."
        class="comment-input"
        rows="3"
      ></textarea>
      
      <button 
        @click="submitComment"
        :disabled="!newComment.trim() || loading"
        class="submit-button"
      >
        {{ loading ? 'Envoi...' : 'Envoyer' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CommentSection - Gestion des commentaires
 */

import { ref, computed } from 'vue'
import type { Commentaire } from '../types'

// Props
const props = defineProps<{
  commentaires: Commentaire[]
  loading?: boolean
}>()

// Événements
const emit = defineEmits<{
  (e: 'add-comment', contenu: string): void
}>()

// État local
const newComment = ref('')

// ===== COMPUTED =====

/**
 * Trie les commentaires du plus récent au plus ancien
 */
const sortedCommentaires = computed(() => {
  return [...props.commentaires].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})

// ===== MÉTHODES =====

/**
 * Formate la date d'un commentaire
 * @param dateStr - Date au format ISO
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

/**
 * Soumet un nouveau commentaire
 */
const submitComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', newComment.value)
    newComment.value = ''
  }
}
</script>

<style scoped>
.comment-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.comments-list {
  margin-bottom: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.comment-item {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 3px solid #3b82f6;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
}

.comment-date {
  color: #6b7280;
}

.comment-content {
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
}

.no-comments {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  background: #f8fafc;
  border-radius: 8px;
}

.no-comments-hint {
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: #9ca3af;
}

.add-comment {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  font-family: inherit;
}

.comment-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-button {
  align-self: flex-end;
  padding: 0.625rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>