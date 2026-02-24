<!--
  AddCandidatureView - Page dédiée à l'ajout d'une candidature
  Design identique à DetailView pour une expérience cohérente
-->

<template>
  <div class="">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- ========== BOUTON RETOUR ========== -->


      <!-- ========== TITRE DE LA PAGE ========== -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
        <div class="flex items-center gap-3">
          <UserPlus class="w-8 h-8 text-blue-600" />
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            Nouvelle candidature
          </h1>
        </div>
        <p class="text-gray-500 mt-2">
          Remplissez les informations pour créer une nouvelle candidature
        </p>
      </div>

      <!-- ========== FORMULAIRE ========== -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        
        <!-- Barre de progression -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center flex-1">
              <!-- Étape 1 -->
              <div class="flex items-center flex-1">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                ]">
                  <Check v-if="step > 1" class="w-4 h-4" />
                  <span v-else>1</span>
                </div>
                <div :class="[
                  'flex-1 h-1 mx-2 transition-all',
                  step > 1 ? 'bg-blue-600' : 'bg-gray-200'
                ]"></div>
              </div>
              
              <!-- Étape 2 -->
              <div class="flex items-center flex-1">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                ]">
                  <Check v-if="step > 2" class="w-4 h-4" />
                  <span v-else>2</span>
                </div>
                <div :class="[
                  'flex-1 h-1 mx-2 transition-all',
                  step > 2 ? 'bg-blue-600' : 'bg-gray-200'
                ]"></div>
              </div>
              
              <!-- Étape 3 -->
              <div class="flex items-center">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                ]">
                  3
                </div>
              </div>
            </div>
          </div>

          <!-- Labels des étapes -->
          <div class="flex justify-between mt-2 px-1">
            <span class="text-xs font-medium" :class="step >= 1 ? 'text-blue-600' : 'text-gray-400'">
              Informations personnelles
            </span>
            <span class="text-xs font-medium" :class="step >= 2 ? 'text-blue-600' : 'text-gray-400'">
              Expérience & Compétences
            </span>
            <span class="text-xs font-medium" :class="step >= 3 ? 'text-blue-600' : 'text-gray-400'">
              Documents & Finalisation
            </span>
          </div>
        </div>

        <!-- ========== ÉTAPE 1 : INFORMATIONS PERSONNELLES ========== -->
        <div v-if="step === 1" class="space-y-6 animate-fade-in">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
            <User class="w-5 h-5 text-blue-500" />
            Informations personnelles
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <input v-model="form.nom" type="text" 
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     :class="{ 'border-red-300': errors.nom }"
                     placeholder="Sophie Martin">
              <p v-if="errors.nom" class="mt-1 text-xs text-red-600">{{ errors.nom }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Poste <span class="text-red-500">*</span>
              </label>
              <input v-model="form.poste" type="text" 
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     :class="{ 'border-red-300': errors.poste }"
                     placeholder="Développeur Full Stack">
              <p v-if="errors.poste" class="mt-1 text-xs text-red-600">{{ errors.poste }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <input v-model="form.email" type="email" 
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     :class="{ 'border-red-300': errors.email }"
                     placeholder="sophie.martin@email.com">
              <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span class="text-red-500">*</span>
              </label>
              <input v-model="form.telephone" type="tel" 
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     :class="{ 'border-red-300': errors.telephone }"
                     placeholder="+33 6 12 34 56 78">
              <p v-if="errors.telephone" class="mt-1 text-xs text-red-600">{{ errors.telephone }}</p>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Localisation <span class="text-red-500">*</span>
              </label>
              <input v-model="form.localisation" type="text" 
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     :class="{ 'border-red-300': errors.localisation }"
                     placeholder="Paris, France">
              <p v-if="errors.localisation" class="mt-1 text-xs text-red-600">{{ errors.localisation }}</p>
            </div>
          </div>
        </div>

        <!-- ========== ÉTAPE 2 : EXPÉRIENCE & COMPÉTENCES ========== -->
        <div v-if="step === 2" class="space-y-6 animate-fade-in">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
            <Briefcase class="w-5 h-5 text-blue-500" />
            Expérience & Compétences
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Expérience <span class="text-red-500">*</span>
              </label>
              <select v-model="form.experience" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :class="{ 'border-red-300': errors.experience }">
                <option value="">Sélectionner</option>
                <option value="Moins d'un an">Moins d'un an</option>
                <option value="1 an">1 an</option>
                <option value="2 ans">2 ans</option>
                <option value="3 ans">3 ans</option>
                <option value="4 ans">4 ans</option>
                <option value="5 ans">5 ans</option>
                <option value="5+ ans">5+ ans</option>
              </select>
              <p v-if="errors.experience" class="mt-1 text-xs text-red-600">{{ errors.experience }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Disponibilité <span class="text-red-500">*</span>
              </label>
              <select v-model="form.disponibilite" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :class="{ 'border-red-300': errors.disponibilite }">
                <option value="">Sélectionner</option>
                <option value="Immédiate">Immédiate</option>
                <option value="2 semaines">2 semaines</option>
                <option value="1 mois">1 mois</option>
                <option value="2 mois">2 mois</option>
                <option value="3 mois">3 mois</option>
              </select>
              <p v-if="errors.disponibilite" class="mt-1 text-xs text-red-600">{{ errors.disponibilite }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Salaire souhaité <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                <input v-model.number="form.salaireSouhaite" type="number" 
                       class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       :class="{ 'border-red-300': errors.salaireSouhaite }"
                       placeholder="45000">
              </div>
              <p v-if="errors.salaireSouhaite" class="mt-1 text-xs text-red-600">{{ errors.salaireSouhaite }}</p>
            </div>
          </div>

          <!-- Compétences -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Compétences
            </label>
            
            <div class="flex flex-wrap gap-2 mb-3 min-h-[3rem] p-3 border border-gray-200 rounded-lg bg-gray-50">
              <span v-for="skill in selectedCompetences" :key="skill"
                    class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {{ skill }}
                <button @click="removeCompetence(skill)" class="hover:text-blue-900">
                  <X class="w-3 h-3" />
                </button>
              </span>
              <span v-if="!selectedCompetences.length" class="text-sm text-gray-400 p-1">
                Aucune compétence sélectionnée
              </span>
            </div>
            
            <div class="flex gap-2">
              <select v-model="newCompetence" 
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Ajouter une compétence...</option>
                <option v-for="competence in competencesList" :key="competence.id" :value="competence.nom">
                  {{ competence.nom }}
                </option>
              </select>
              <button @click="addCompetence" 
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                      :disabled="!newCompetence">
                <Plus class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- ========== ÉTAPE 3 : DOCUMENTS & FINALISATION ========== -->
        <div v-if="step === 3" class="space-y-6 animate-fade-in">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
            <FileText class="w-5 h-5 text-blue-500" />
            Documents & Finalisation
          </h2>
          
          <!-- CV -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              CV (URL)
            </label>
            <div class="flex gap-2">
              <input v-model="form.cv" type="url" 
                     class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="https://example.com/cv.pdf">
              <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Upload class="w-5 h-5" />
              </button>
            </div>
            <p class="mt-1 text-xs text-gray-500">Lien vers le CV ou téléchargement</p>
          </div>

          <!-- Lettre de motivation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Lettre de motivation
            </label>
            <textarea v-model="form.lettreMotivation" rows="6"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Lettre de motivation..."></textarea>
          </div>

          <!-- Résumé -->
          <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 class="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Info class="w-4 h-4" />
              Récapitulatif
            </h4>
            <p class="text-sm text-blue-700">
              <span class="font-medium">{{ form.nom || 'Nom' }}</span> • 
              {{ form.poste || 'Poste' }} • 
              {{ form.experience || 'Expérience' }} • 
              {{ selectedCompetences.length }} compétence(s)
            </p>
          </div>
        </div>

        <!-- ========== BOUTONS DE NAVIGATION ========== -->
        <div class="flex justify-between gap-3 mt-8 pt-6 border-t border-gray-200">
          <button @click="step > 1 ? step-- : goBack()" 
                  class="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {{ step > 1 ? 'Précédent' : 'Annuler' }}
          </button>
          
          <div class="flex gap-3">
            <button v-if="step < 3" @click="nextStep" 
                    class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Suivant
            </button>
            <button v-if="step === 3" @click="submit" 
                    :disabled="loading"
                    class="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2">
              <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
              <Check v-else class="w-4 h-4" />
              {{ loading ? 'Création...' : 'Créer la candidature' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCandidatureStore } from '../stores/candidatureStore'
import { competenceApi } from '../api/api'
import type { Candidature } from '../types'

// Imports Lucide Icons
import { 
  ArrowLeft, UserPlus, Check, Loader2, 
  User, Briefcase, FileText, Info, Plus, X, Upload
} from 'lucide-vue-next'

const router = useRouter()
const store = useCandidatureStore()

// État
const step = ref(1)
const loading = ref(false)
const competencesList = ref<any[]>([])
const newCompetence = ref('')
const selectedCompetences = ref<string[]>([])

// Formulaire
const form = reactive({
  nom: '',
  poste: '',
  email: '',
  telephone: '',
  localisation: '',
  cv: '',
  experience: '',
  disponibilite: '',
  salaireSouhaite: null as number | null,
  lettreMotivation: ''
})

// Erreurs
const errors = ref<Record<string, string>>({})

// Charger les compétences
onMounted(async () => {
  try {
    competencesList.value = await competenceApi.getAll()
  } catch (error) {
    console.error('Erreur chargement compétences:', error)
  }
})

// Ajouter une compétence
const addCompetence = () => {
  if (newCompetence.value && !selectedCompetences.value.includes(newCompetence.value)) {
    selectedCompetences.value.push(newCompetence.value)
    newCompetence.value = ''
  }
}

// Supprimer une compétence
const removeCompetence = (competence: string) => {
  selectedCompetences.value = selectedCompetences.value.filter(c => c !== competence)
}

// Valider l'étape courante
const validateStep = (): boolean => {
  const newErrors: Record<string, string> = {}
  
  if (step.value === 1) {
    if (!form.nom) newErrors.nom = 'Le nom est requis'
    if (!form.poste) newErrors.poste = 'Le poste est requis'
    if (!form.email) newErrors.email = 'L\'email est requis'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Email invalide'
    if (!form.telephone) newErrors.telephone = 'Le téléphone est requis'
    if (!form.localisation) newErrors.localisation = 'La localisation est requise'
  }
  
  if (step.value === 2) {
    if (!form.experience) newErrors.experience = 'L\'expérience est requise'
    if (!form.disponibilite) newErrors.disponibilite = 'La disponibilité est requise'
    if (!form.salaireSouhaite) newErrors.salaireSouhaite = 'Le salaire est requis'
    else if (form.salaireSouhaite < 0) newErrors.salaireSouhaite = 'Le salaire doit être positif'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Étape suivante
const nextStep = () => {
  if (validateStep()) {
    step.value++
  }
}

// Soumettre
const submit = async () => {
  if (!validateStep()) return
  
  loading.value = true
  
  try {
    const nouvelleCandidature = {
      ...form,
      salaireSouhaite: Number(form.salaireSouhaite),
      competences: selectedCompetences.value,
      statut: 'En attente',
      dateCandidature: new Date().toISOString(),
      commentaires: []
    }
    
    await store.createCandidature(nouvelleCandidature)
    
    // Afficher une notification
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification('Candidature créée avec succès', 'success')
    }
    
    // Rediriger vers la liste
    router.push('/')
  } catch (error) {
    console.error('Erreur création:', error)
  } finally {
    loading.value = false
  }
}

// Retour
const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>