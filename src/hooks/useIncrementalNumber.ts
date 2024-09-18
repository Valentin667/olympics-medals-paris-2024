import { ref, onMounted } from "vue";

/**
 * Make a number increment over time in Vue
 */
export function useIncrementalNumber(n: number, duration: number = 1000, delay: number = 0) {
  const count = ref(0);  // Le compteur réactif
  const start = ref<number | null>(null);  // La date de début

  const updateValue = () => {
    const elapsedRatio = Math.max((Date.now() - (start.value || 0) - delay) / duration, 0);

    if (elapsedRatio >= 1) {
      count.value = n;  // Fixe la valeur maximale lorsque l'animation est terminée
    } else {
      count.value = Math.floor(n * elapsedRatio);  // Incrémentation progressive
      requestAnimationFrame(updateValue);  // Continue la mise à jour
    }
  };

  // L'animation démarre une fois que le composant est monté
  onMounted(() => {
    start.value = Date.now();  // Initialisation du point de départ
    requestAnimationFrame(updateValue);  // Démarre l'animation
  });

  return count;
}
