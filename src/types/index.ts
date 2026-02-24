/**
 * Types pour l'application de gestion des candidatures
 */

// Interface pour les commentaires des recruteurs
export interface Commentaire {
  id: number
  auteur: string
  date: string
  contenu: string
}

// Interface principale pour une candidature
export interface Candidature {
  id: number | string  // ✅ Accepte number OU string
  nom: string
  poste: string
  statut: string
  competences: string[]
  experience: string
  dateCandidature: string
  email: string
  telephone: string
  cv: string
  lettreMotivation: string
  salaireSouhaite: number
  disponibilite: string
  localisation: string
  commentaires: Commentaire[]
}

// Interface pour les statuts
export interface Statut {
  id: number
  nom: string
  couleur: string
  ordre: number
}

// Interface pour les postes
export interface Poste {
  id: number
  titre: string
  description: string
  competencesRequises: string[]
}

// Interface pour les compétences
export interface Competence {
  id: number
  nom: string
  categorie: string
}

// Interface pour les filtres
export interface Filters {
  statut: string
  poste: string
  search: string
  page: number
  limit: number
}

// Interface pour la pagination
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

// Interface pour la réponse API
export interface ApiResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}