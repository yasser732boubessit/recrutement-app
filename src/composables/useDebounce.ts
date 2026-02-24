/**
 * Composables : Fonctions réutilisables
 * useDebounce - Pour limiter les appels API lors de la recherche
 * Version corrigée - sans infinite loop
 */

import { ref, watch, unref } from 'vue'
import type { Ref } from 'vue'

/**
 * Hook pour déboucler les entrées utilisateur
 * @param value - La valeur à déboucler (peut être une ref ou une valeur primitive)
 * @param delay - Délai en millisecondes (défaut: 300ms)
 * @returns Une ref contenant la valeur débouclée
 */
export function useDebounce<T>(value: T | Ref<T>, delay: number = 300) {
  // Créer une ref pour la valeur débouclée
  const debouncedValue = ref<T>(unref(value)) as Ref<T>
  
  // Timer pour le debounce
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  // Nettoyer le timer précédent
  const clearPendingTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  // Surveiller les changements de la valeur source
  watch(
    () => unref(value),
    (newValue) => {
      clearPendingTimeout()
      
      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue as T
        timeoutId = null
      }, delay)
    },
    { 
      immediate: false, // ⚠️ IMPORTANT: immediate: false pour éviter la boucle
      flush: 'pre'      // Flush avant le render
    }
  )

  // Nettoyage à la destruction
  const stop = watch(() => unref(value), () => {})
  
  // Retourner la valeur débouclée
  return debouncedValue
}