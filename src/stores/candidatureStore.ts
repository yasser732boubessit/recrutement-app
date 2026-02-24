/**
 * Store Pinia pour la gestion des candidatures
 * Version avec création et suppression
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
  
  const totalCandidatures = computed(() => pagination.value.totalItems)
  
  const hasNextPage = computed(() => 
    pagination.value.currentPage < pagination.value.totalPages
  )
  
  const hasPrevPage = computed(() => pagination.value.currentPage > 1)
  
  const statsParStatut = computed(() => {
    const stats: Record<string, number> = {}
    candidatures.value.forEach(c => {
      stats[c.statut] = (stats[c.statut] || 0) + 1
    })
    return stats
  })

  // ==================== ACTIONS ====================
  
  const initialize = async () => {
    if (initialized.value) return
    await loadStatuts()
    initialized.value = true
  }

  const loadStatuts = async () => {
    if (statuts.value.length > 0) return statuts.value
    
    loading.value = true
    error.value = null
    
    try {
      const data = await statutApi.getAll()
      statuts.value = data
      return data
    } catch (err: any) {
      error.value = err.message || 'Impossible de charger les statuts'
      statuts.value = [
      
      ]
      return statuts.value
    } finally {
      loading.value = false
    }
  }

  const loadCandidatures = async () => {
    if (loading.value) return
    
    loading.value = true
    error.value = null
    
    try {
      const result = await candidatureApi.getAll(filters.value)
      
      candidatures.value = result.data
      pagination.value = {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.total,
        itemsPerPage: result.limit
      }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement'
      candidatures.value = []
    } finally {
      loading.value = false
    }
  }

  const loadCandidatureById = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      currentCandidature.value = await candidatureApi.getById(id)
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement'
      currentCandidature.value = null
    } finally {
      loading.value = false
    }
  }

  /**
   * Crée une nouvelle candidature
   */
  const createCandidature = async (candidature: Omit<Candidature, 'id'>) => {
    loading.value = true
    error.value = null
    
    try {
      const nouvelleCandidature = await candidatureApi.create(candidature)
      
      // Ajouter à la liste locale
      candidatures.value = [nouvelleCandidature, ...candidatures.value]
      
      // Mettre à jour la pagination
      pagination.value.totalItems += 1
      pagination.value.totalPages = Math.ceil(pagination.value.totalItems / pagination.value.itemsPerPage)
      
      return nouvelleCandidature
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la création'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Supprime une candidature
   */
  const deleteCandidature = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      await candidatureApi.delete(id)
      
      // Supprimer de la liste locale
      candidatures.value = candidatures.value.filter(c => c.id !== id)
      
      // Mettre à jour la pagination
      pagination.value.totalItems -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.totalItems / pagination.value.itemsPerPage)
      
      // Si on est sur la page de détail, rediriger
      if (currentCandidature.value?.id === id) {
        currentCandidature.value = null
      }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la suppression'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateStatut = async (id: number, nouveauStatut: string) => {
    const previousCandidatures = [...candidatures.value]
    const previousCurrent = currentCandidature.value ? { ...currentCandidature.value } : null
    
    const index = candidatures.value.findIndex(c => c.id === id)
    if (index !== -1) {
      candidatures.value[index].statut = nouveauStatut
    }
    
    if (currentCandidature.value?.id === id) {
      currentCandidature.value.statut = nouveauStatut
    }
    
    try {
      await candidatureApi.update(id, { statut: nouveauStatut })
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour'
      candidatures.value = previousCandidatures
      currentCandidature.value = previousCurrent
    }
  }

  const ajouterCommentaire = async (id: number, contenu: string) => {
    try {
      const commentaire = {
        auteur: 'Recruteur',
        date: new Date().toISOString(),
        contenu
      }
      
      await candidatureApi.addCommentaire(id, commentaire)
      
      if (currentCandidature.value?.id === id) {
        await loadCandidatureById(id)
      }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'ajout'
    }
  }

  const setFilters = async (nouveauxFiltres: Partial<Filters>) => {
    if (nouveauxFiltres.statut !== undefined || 
        nouveauxFiltres.poste !== undefined || 
        nouveauxFiltres.search !== undefined) {
      nouveauxFiltres.page = 1
    }
    
    filters.value = { ...filters.value, ...nouveauxFiltres }
    await loadCandidatures()
  }

  const setPage = async (page: number) => {
    if (page < 1 || page > pagination.value.totalPages) return
    
    filters.value.page = page
    await loadCandidatures()
  }

  const resetFilters = async () => {
    filters.value = {
      statut: '',
      poste: '',
      search: '',
      page: 1,
      limit: 10
    }
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
    createCandidature,
    deleteCandidature,
    updateStatut,
    ajouterCommentaire,
    setFilters,
    setPage,
    resetFilters
  }
})