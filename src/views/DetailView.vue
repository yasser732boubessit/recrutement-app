<!--
  DetailView - Page de détail d'une candidature
  Version premium avec Design System et Lucide Icons
  Layout optimisé pour une expérience de lecture confortable
-->

<template>

      <section class="relative bg-gradient-to-r from-blue-600 to-purple-700 pt-12 pb-8 px-4 md:px-8 overflow-hidden shadow-lg">
      <!-- Background pattern décoratif -->
      <div class="absolute inset-0 opacity-5" 
           style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
      </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ========== BOUTON RETOUR ========== -->
      <button @click="goBack" 
              class="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 group">
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="text-sm font-medium">Retour à la liste</span>
      </button>

      <!-- ========== ÉTATS DE CHARGEMENT ========== -->
      <div v-if="store.loading" class="flex flex-col items-center justify-center py-20">
        <Loader2 class="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p class="text-gray-600 font-medium">Chargement des détails...</p>
      </div>

      <!-- ========== MESSAGE D'ERREUR ========== -->
      <div v-else-if="store.error" class="max-w-md mx-auto my-12">
        <div class="bg-red-50 rounded-xl p-8 text-center border border-red-200">
          <AlertCircle class="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Une erreur est survenue</h3>
          <p class="text-sm text-gray-600 mb-6">{{ store.error }}</p>
          <button @click="loadData" 
                  class="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Réessayer
          </button>
        </div>
      </div>

      <!-- ========== DÉTAILS DE LA CANDIDATURE ========== -->
      <div v-else-if="candidature" class="space-y-8">
        
        <!-- ========== EN-TÊTE ========== -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div class="flex flex-col md:flex-row justify-between items-start gap-6">
            
            <!-- Nom et poste -->
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {{ candidature.nom }}
              </h1>
              <p class="text-lg text-gray-600 flex items-center gap-2">
                <Briefcase class="w-5 h-5 text-gray-400" />
                {{ candidature.poste }}
              </p>
            </div>
            
            <!-- Statut et sélecteur -->
            <div class="flex flex-col items-end gap-3 w-full md:w-auto">
              <span class="px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
                    :class="getStatusClass(candidature.statut)">
                {{ candidature.statut }}
              </span>
              
              <div class="flex items-center gap-2 w-full md:w-auto">
                <span class="text-sm text-gray-500">Changer:</span>
                <select v-model="selectedStatus"
                        @change="updateStatus"
                        class="flex-1 md:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option v-for="statut in store.statuts" 
                          :key="statut.id" 
                          :value="statut.nom">
                    {{ statut.nom }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- ========== GRILLE D'INFORMATIONS ========== -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Carte Contact -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <Mail class="w-5 h-5 text-blue-500" />
              <h3 class="font-semibold text-gray-900">Contact</h3>
            </div>
            <div class="space-y-3">
              <p class="flex items-center gap-3 text-sm">
                <Mail class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ candidature.email }}</span>
              </p>
              <p class="flex items-center gap-3 text-sm">
                <Phone class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ candidature.telephone }}</span>
              </p>
              <p class="flex items-center gap-3 text-sm">
                <MapPin class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ candidature.localisation }}</span>
              </p>
            </div>
          </div>

          <!-- Carte Candidature -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <Calendar class="w-5 h-5 text-green-500" />
              <h3 class="font-semibold text-gray-900">Candidature</h3>
            </div>
            <div class="space-y-3">
              <p class="flex items-center gap-3 text-sm">
                <Calendar class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ formatDate(candidature.dateCandidature) }}</span>
              </p>
              <p class="flex items-center gap-3 text-sm">
                <Briefcase class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ candidature.experience }}</span>
              </p>
              <p class="flex items-center gap-3 text-sm">
                <Clock class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ candidature.disponibilite }}</span>
              </p>
            </div>
          </div>

          <!-- Carte Prétentions -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <Euro class="w-5 h-5 text-yellow-500" />
              <h3 class="font-semibold text-gray-900">Prétentions</h3>
            </div>
            <div class="space-y-3">
              <p class="flex items-center gap-3 text-sm">
                <Euro class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ formatSalary(candidature.salaireSouhaite) }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- ========== COMPÉTENCES ========== -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <Code class="w-5 h-5 text-purple-500" />
            <h3 class="font-semibold text-gray-900">Compétences</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="competence in candidature.competences" 
                  :key="competence"
                  class="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">
              {{ competence }}
            </span>
          </div>
        </div>

        <!-- ========== LETTRE DE MOTIVATION ========== -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <FileText class="w-5 h-5 text-orange-500" />
            <h3 class="font-semibold text-gray-900">Lettre de motivation</h3>
          </div>
          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
            {{ candidature.lettreMotivation }}
          </p>
        </div>

        <!-- ========== DOCUMENTS ========== -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <Paperclip class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-gray-900">Documents</h3>
          </div>
          <a :href="candidature.cv" 
             target="_blank"
             class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
            <FileText class="w-4 h-4" />
            <span class="text-sm font-medium">Télécharger le CV</span>
            <Download class="w-4 h-4 ml-2" />
          </a>
        </div>

        <!-- ========== SECTION COMMENTAIRES ========== -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <CommentSection
            :commentaires="candidature.commentaires"
            :loading="store.loading"
            @add-comment="handleAddComment"
          />
        </div>
      </div>
    </div>
    
     </section>

</template>

<script setup lang="ts">
/**
 * DetailView - Page de détail d'une candidature
 * Version avec Design System et Lucide Icons
 */

import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCandidatureStore } from '../stores/candidatureStore'
import CommentSection from '../components/CommentSection.vue'

// Imports Lucide Icons
import { 
  ArrowLeft,
  Loader2,
  AlertCircle,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Euro,
  Code,
  FileText,
  Paperclip,
  Download
} from 'lucide-vue-next'

// ========== ROUTER & STORE ==========
const route = useRoute()
const router = useRouter()
const store = useCandidatureStore()

// ========== STATE ==========
const selectedStatus = ref('')

// ========== COMPUTED ==========
const candidature = computed(() => store.currentCandidature)

// ========== WATCHERS ==========
watch(candidature, (newVal) => {
  if (newVal) {
    selectedStatus.value = newVal.statut
  }
}, { immediate: true })

// ========== METHODS ==========

/**
 * Charge les données au montage
 */
onMounted(() => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    router.push('/')
    return
  }
  loadData()
})

/**
 * Charge les données de la candidature
 */
const loadData = async () => {
  const id = parseInt(route.params.id as string)
  await store.loadCandidatureById(id)
}

/**
 * Retourne à la liste des candidatures
 */
const goBack = () => {
  router.push('/')
}

/**
 * Met à jour le statut de la candidature
 */
const updateStatus = async () => {
  if (candidature.value && selectedStatus.value !== candidature.value.statut) {
    await store.updateStatut(Number(candidature.value.id), selectedStatus.value)
    
    // Afficher une notification de succès
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      ;(window as any).showNotification('Statut mis à jour avec succès', 'success')
    }
  }
}

/**
 * Ajoute un commentaire
 */
const handleAddComment = async (contenu: string) => {
  if (candidature.value) {
    await store.ajouterCommentaire(Number(candidature.value.id), contenu)
  }
}

/**
 * Retourne la classe CSS pour le statut
 */
const getStatusClass = (status: string): string => {
  const classes: Record<string, string> = {
    'En attente': 'bg-amber-50 text-amber-800 border border-amber-200',
    'Entretien RH': 'bg-blue-50 text-blue-800 border border-blue-200',
    'Entretien technique': 'bg-purple-50 text-purple-800 border border-purple-200',
    'Accepté': 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    'Refusé': 'bg-red-50 text-red-800 border border-red-200'
  }
  return classes[status] || 'bg-gray-50 text-gray-800 border border-gray-200'
}

/**
 * Formate la date
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
/* Animations personnalisées */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transitions pour le bouton retour */
button .w-4 {
  transition: transform 0.2s ease;
}
</style>