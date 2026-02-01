import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useSweepOnHash = (targetRef, hash) => {
  const route = useRoute();

  const triggerSweep = () => {
    if (!targetRef.value) return;
    targetRef.value.classList.remove('sweep-animate');
    void targetRef.value.offsetWidth;
    targetRef.value.classList.add('sweep-animate');
  };

  onMounted(() => {
    if (route.hash === hash) triggerSweep();
  });

  watch(
    () => route.hash,
    (newHash) => {
      if (newHash === hash) triggerSweep();
    }
  );
};
