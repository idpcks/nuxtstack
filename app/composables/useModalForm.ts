export const useModalForm = <T extends Record<string, any>>(initialState: T) => {
  const isOpen = ref(false)

  const form = ref<T>({ ...initialState })

  const open = (data?: Partial<T>) => {
    form.value = { ...initialState, ...data }
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    form.value = { ...initialState }
  }

  return {
    isOpen,
    form,
    open,
    close
  }
}