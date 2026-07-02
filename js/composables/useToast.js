import { ref } from 'vue';

export function useToast() {
  const toastMsg = ref('');
  let toastTimer = null;

  function showToast(msg) {
    toastMsg.value = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastMsg.value = ''), 2200);
  }

  return { toastMsg, showToast };
}
