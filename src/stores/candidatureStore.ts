/**
 * Store Pinia pour la gestion des candidatures
 * Version optimisée avec gestion d'état robuste
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { candidatureApi, statutApi } from '../api/api'
import type { Candidature, Filters, Statut, PaginationMeta } from '../types'

export const useCandidatureStore = defineStore('candidature', () => {
  // ==================== ÉTAT ====================
  
  const candidatures = ref<Candidature[]>([])
  const currentCandidature = ref<Candidature | null>(null)
  const statuts = ref<Statut[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const initialized = ref<boolean>(false)
  
  // Pagination
  const pagination = ref<PaginationMeta>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })
  
  // Filtres
  const filters = ref<Filters>({
    statut: '',
    poste: '',
    search: '',
    page: 1,
    limit: 10
  })

  // ==================== GETTERS ====================
  
  /**
   * Nombre total de candidatures
   */
  const totalCandidatures = computed(() => pagination.value.totalItems)
  
  /**
   * Vérifie s'il y a une page suivante
   */
  const hasNextPage = computed(() => 
    pagination.value.currentPage < pagination.value.totalPages
  )
  
  /**
   * Vérifie s'il y a une page précédente
   */
  const hasPrevPage = computed(() => pagination.value.currentPage > 1)
  
  /**
   * Statistiques des candidatures par statut
   */
  const statsParStatut = computed(() => {
    const stats: Record<string, number> = {}
    candidatures.value.forEach(c => {
      stats[c.statut] = (stats[c.statut] || 0) + 1
    })
    return stats
  })

  // ==================== ACTIONS ====================
  
  /**
   * Initialise le store (charge les statuts)
   */
  const initialize = async () => {
    if (initialized.value) {
      console.log('📊 Store déjà initialisé')
      return
    }
    
    console.log('🚀 Initialisation du store...')
    await loadStatuts()
    initialized.value = true
  }

  /**
   * Charge les statuts
   */
  const loadStatuts = async () => {
    // Éviter les appels multiples
    if (statuts.value.length > 0) {
      console.log('📊 Statuts déjà chargés:', statuts.value.length)
      return statuts.value
    }
    
    loading.value = true
    error.value = null
    
    try {
      console.log('📡 Chargement des statuts...')
      const data = await statutApi.getAll()
      statuts.value = data
      console.log('✅ Statuts chargés:', statuts.value.length)
      return data
    } catch (err: any) {
      console.error('❌ Erreur chargement statuts:', err)
      error.value = err.message || 'Impossible de charger les statuts'
      
      // Données par défaut
      statuts.value = [
        { id: 1, nom: 'En attente', couleur: '#94a3b8', ordre: 1 },
        { id: 2, nom: 'Entretien RH', couleur: '#3b82f6', ordre: 2 },
        { id: 3, nom: 'Entretien technique', couleur: '#f59e0b', ordre: 3 },
        { id: 4, nom: 'Accepté', couleur: '#10b981', ordre: 4 },
        { id: 5, nom: 'Refusé', couleur: '#ef4444', ordre: 5 }
      ]
      return statuts.value
    } finally {
      loading.value = false
    }
  }

  /**
   * Charge les candidatures
   */
  const loadCandidatures = async () => {
    // Protection contre les appels multiples
    if (loading.value) {
      console.log('⏳ Chargement déjà en cours...')
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      console.log('📡 Chargement des candidatures...', filters.value)
      
      const result = await candidatureApi.getAll(filters.value)
      
      candidatures.value = result.data
      pagination.value = {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.total,
        itemsPerPage: result.limit
      }
      
      console.log('✅ Candidatures chargées:', {
        count: candidatures.value.length,
        total: pagination.value.totalItems,
        page: pagination.value.currentPage,
        pages: pagination.value.totalPages
      })
      
    } catch (err: any) {
      console.error('❌ Erreur chargement candidatures:', err)
      error.value = err.message || 'Erreur lors du chargement'
      candidatures.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Charge une candidature spécifique
   */
  const loadCandidatureById = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      console.log('📡 Chargement candidature:', id)
      currentCandidature.value = await candidatureApi.getById(id)
      console.log('✅ Candidature chargée:', currentCandidature.value?.nom)
    } catch (err: any) {
      console.error('❌ Erreur chargement candidature:', err)
      error.value = err.message || 'Erreur lors du chargement'
      currentCandidature.value = null
    } finally {
      loading.value = false
    }
  }

  /**
   * Met à jour le statut d'une candidature
   */
  const updateStatut = async (id: number, nouveauStatut: string) => {
    // Sauvegarder l'état pour rollback
    const previousCandidatures = [...candidatures.value]
    const previousCurrent = currentCandidature.value ? { ...currentCandidature.value } : null
    
    // Optimistic update
    const index = candidatures.value.findIndex(c => c.id === id)
    if (index !== -1) {
      candidatures.value[index].statut = nouveauStatut
    }
    
    if (currentCandidature.value?.id === id) {
      currentCandidature.value.statut = nouveauStatut
    }
    
    try {
      console.log('📡 Mise à jour statut:', id, nouveauStatut)
      await candidatureApi.update(id, { statut: nouveauStatut })
      console.log('✅ Statut mis à jour')
    } catch (err: any) {
      console.error('❌ Erreur mise à jour statut:', err)
      error.value = err.message || 'Erreur lors de la mise à jour'
      
      // Rollback
      candidatures.value = previousCandidatures
      currentCandidature.value = previousCurrent
    }
  }

  /**
   * Ajoute un commentaire
   */
  const ajouterCommentaire = async (id: number, contenu: string) => {
    try {
      console.log('📡 Ajout commentaire:', id)
      
      const commentaire = {
        auteur: 'Recruteur',
        date: new Date().toISOString(),
        contenu
      }
      
      await candidatureApi.addCommentaire(id, commentaire)
      console.log('✅ Commentaire ajouté')
      
      // Recharger si c'est la candidature courante
      if (currentCandidature.value?.id === id) {
        await loadCandidatureById(id)
      }
      
    } catch (err: any) {
      console.error('❌ Erreur ajout commentaire:', err)
      error.value = err.message || 'Erreur lors de l\'ajout'
    }
  }

  /**
   * Met à jour les filtres
   */
  const setFilters = async (nouveauxFiltres: Partial<Filters>) => {
    // Reset page si les filtres changent
    if (nouveauxFiltres.statut !== undefined || 
        nouveauxFiltres.poste !== undefined || 
        nouveauxFiltres.search !== undefined) {
      nouveauxFiltres.page = 1
    }
    
    filters.value = { ...filters.value, ...nouveauxFiltres }
    console.log('🔍 Nouveaux filtres:', filters.value)
    
    await loadCandidatures()
  }

  /**
   * Change de page
   */
  const setPage = async (page: number) => {
    if (page < 1 || page > pagination.value.totalPages) return
    
    filters.value.page = page
    await loadCandidatures()
  }

  /**
   * Réinitialise les filtres
   */
  const resetFilters = async () => {
    filters.value = {
      statut: '',
      poste: '',
      search: '',
      page: 1,
      limit: 10
    }
    console.log('🔄 Filtres réinitialisés')
    await loadCandidatures()
  }

  return {
    // State
    candidatures,
    currentCandidature,
    statuts,
    loading,
    error,
    filters,
    pagination,
    
    // Getters
    totalCandidatures,
    hasNextPage,
    hasPrevPage,
    statsParStatut,
    
    // Actions
    initialize,
    loadStatuts,
    loadCandidatures,
    loadCandidatureById,
    updateStatut,
    ajouterCommentaire,
    setFilters,
    setPage,
    resetFilters
  }
})