/**
 * Service API pour communiquer avec JSON Server
 * Version avec création et suppression de candidatures
 */

import axios from 'axios'
import type { Candidature, Commentaire, Filters, ApiResponse, Statut, Poste, Competence } from '../types'

// Configuration de base
const API_BASE_URL = 'https://recrutement-api.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Intercepteur pour les requêtes
api.interceptors.request.use(
  config => {
    console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`, config.params)
    return config
  },
  error => {
    console.error('❌ Erreur requête:', error)
    return Promise.reject(error)
  }
)

// Intercepteur pour les réponses
api.interceptors.response.use(
  response => {
    console.log(`✅ ${response.status} ${response.config.url}`, response.data?.length || '')
    return response
  },
  error => {
    console.error('❌ Erreur API:', error.message)
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('⏱️ Délai d\'attente dépassé - Vérifiez que JSON Server est lancé')
    }
    
    if (!error.response) {
      throw new Error('🔌 Erreur réseau - JSON Server est-il lancé sur le port 3000 ?')
    }
    
    switch (error.response.status) {
      case 404:
        throw new Error('📭 Ressource non trouvée (404)')
      case 500:
        throw new Error('🔥 Erreur serveur (500)')
      default:
        throw new Error(`❌ Erreur ${error.response.status}: ${error.response.statusText}`)
    }
  }
)

// ==================== SERVICE CANDIDATURES ====================

export const candidatureApi = {
  /**
   * Récupère toutes les candidatures avec filtres
   */
  getAll: async (filters: Filters): Promise<ApiResponse<Candidature>> => {
    const params = new URLSearchParams()
    
    // Filtres
    if (filters.statut) params.append('statut', filters.statut)
    if (filters.poste) params.append('poste', filters.poste)
    if (filters.search) params.append('q', filters.search)
    
    // Pagination
    params.append('_page', filters.page.toString())
    params.append('_limit', filters.limit.toString())
    
    // Tri
    params.append('_sort', 'dateCandidature')
    params.append('_order', 'desc')
    
    try {
      const response = await api.get<Candidature[]>('/candidatures', { params })
      
      // Récupération du total depuis les headers
      const totalCount = parseInt(response.headers['x-total-count'] || '0')
      
      return {
        data: response.data,
        total: totalCount,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(totalCount / filters.limit)
      }
    } catch (error) {
      console.error('Erreur getAll:', error)
      throw error
    }
  },

  /**
   * Récupère une candidature par ID
   */
  getById: async (id: number): Promise<Candidature> => {
    try {
      const response = await api.get<Candidature>(`/candidatures/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erreur getById ${id}:`, error)
      throw error
    }
  },

  /**
   * Crée une nouvelle candidature
   */
  create: async (candidature: Omit<Candidature, 'id'>): Promise<Candidature> => {
    try {
      const response = await api.post<Candidature>('/candidatures', candidature)
      console.log('✅ Candidature créée:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Erreur création candidature:', error)
      throw error
    }
  },

  /**
   * Met à jour une candidature
   */
  update: async (id: number, data: Partial<Candidature>): Promise<Candidature> => {
    try {
      const response = await api.patch<Candidature>(`/candidatures/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Erreur update ${id}:`, error)
      throw error
    }
  },

  /**
   * Supprime une candidature
   */
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/candidatures/${id}`)
      console.log(`✅ Candidature ${id} supprimée`)
    } catch (error) {
      console.error(`❌ Erreur suppression ${id}:`, error)
      throw error
    }
  },

  /**
   * Ajoute un commentaire
   */
  addCommentaire: async (id: number, commentaire: Omit<Commentaire, 'id'>): Promise<Candidature> => {
    try {
      const candidature = await candidatureApi.getById(id)
      
      const nouveauCommentaire = {
        ...commentaire,
        id: Date.now() + Math.random()
      }
      
      const response = await api.patch<Candidature>(`/candidatures/${id}`, {
        commentaires: [...(candidature.commentaires || []), nouveauCommentaire]
      })
      
      return response.data
    } catch (error) {
      console.error('Erreur addCommentaire:', error)
      throw error
    }
  },

  /**
   * Récupère les statistiques
   */
  getStats: async () => {
    try {
      const response = await api.get<Candidature[]>('/candidatures')
      const candidatures = response.data
      
      const stats = {
        total: candidatures.length,
        parStatut: {} as Record<string, number>
      }
      
      candidatures.forEach(c => {
        stats.parStatut[c.statut] = (stats.parStatut[c.statut] || 0) + 1
      })
      
      return stats
    } catch (error) {
      console.error('Erreur getStats:', error)
      throw error
    }
  }
}

// ==================== SERVICE STATUTS ====================

export const statutApi = {
  getAll: async (): Promise<Statut[]> => {
    try {
      const response = await api.get<Statut[]>('/statuts')
      return response.data
    } catch (error) {
      console.error('Erreur statuts:', error)
      return [
 
      ]
    }
  }
}

// ==================== SERVICE POSTES ====================

export const posteApi = {
  getAll: async (): Promise<Poste[]> => {
    try {
      const response = await api.get<Poste[]>('/postes')
      return response.data
    } catch (error) {
      console.error('Erreur postes:', error)
      return []
    }
  }
}

// ==================== SERVICE COMPÉTENCES ====================

export const competenceApi = {
  getAll: async (): Promise<Competence[]> => {
    try {
      const response = await api.get<Competence[]>('/competences')
      return response.data
    } catch (error) {
      console.error('Erreur compétences:', error)
      return []
    }
  }
}

// ==================== UTILITAIRES ====================

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get('/candidatures?_limit=1')
    return response.status === 200
  } catch {
    return false
  }
}

export default api