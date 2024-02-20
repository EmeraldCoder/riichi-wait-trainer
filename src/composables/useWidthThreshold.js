import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export default function useWidthThreshold () {
  const { width } = useWindowSize()

  const isMobile = computed(() => {
    if (width.value < 500) return true
    return false
  })

  const isMedium = computed(() => {
    if (width.value >= 500 && width.value < 1920) return true
    return false
  })

  const isHd = computed(() => {
    if (width.value >= 1920) return true
    return false
  })

  const threshold = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isMedium.value) return 'medium'
    return 'hd'
  })

  return {
    isMobile,
    isMedium,
    isHd,
    threshold
  }
}
