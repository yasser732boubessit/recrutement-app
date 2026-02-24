/**
 * Service API pour communiquer avec JSON Server
 * Version optimisée avec gestion d'erreurs avancée
 */

import axios from 'axios'
import type { Candidature, Commentaire, Filters, ApiResponse, Statut, Poste, Competence } from '../types'

// Configuration de base
const API_BASE_URL = 'http://localhost:3000'

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
   * Ajoute un commentaire
   */
  addCommentaire: async (id: number, commentaire: Omit<Commentaire, 'id'>): Promise<Candidature> => {
    try {
      // Récupérer la candidature
      const candidature = await candidatureApi.getById(id)
      
      // Créer le nouveau commentaire
      const nouveauCommentaire = {
        ...commentaire,
        id: Date.now() + Math.random() // ID unique
      }
      
      // Mettre à jour
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
  /**
   * Récupère tous les statuts
   */
  getAll: async (): Promise<Statut[]> => {
    try {
      const response = await api.get<Statut[]>('/statuts')
      return response.data
    } catch (error) {
      console.error('Erreur statuts:', error)
      // Données par défaut en cas d'erreur
      return [
        { id: 1, nom: 'En attente', couleur: '#94a3b8', ordre: 1 },
        { id: 2, nom: 'Entretien RH', couleur: '#3b82f6', ordre: 2 },
        { id: 3, nom: 'Entretien technique', couleur: '#f59e0b', ordre: 3 },
        { id: 4, nom: 'Accepté', couleur: '#10b981', ordre: 4 },
        { id: 5, nom: 'Refusé', couleur: '#ef4444', ordre: 5 }
      ]
    }
  }
}

// ==================== SERVICE POSTES ====================

export const posteApi = {
  /**
   * Récupère tous les postes
   */
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
  /**
   * Récupère toutes les compétences
   */
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

/**
 * Vérifie le statut de l'API
 */
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get('/candidatures?_limit=1')
    return response.status === 200
  } catch {
    return false
  }
}

export default api