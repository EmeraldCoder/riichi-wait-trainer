<script setup>
import { Tile } from '@emeraldcoder/riichi-ui-vue'
import useWidthTreshold from '../composables/useWidthThreshold'

const props = defineProps({
  modelValue: {
    required: true
  },
  suits: {
    required: true
  },
  readOnly: {
    required: false,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const { isMobile, isMedium } = useWidthTreshold()

function toggleTileSelection (tile) {
  if (props.readOnly) return

  if (props.modelValue.includes(tile)) {
    emit('update:modelValue', props.modelValue.filter(x => x !== tile))
  } else {
    emit('update:modelValue', [...props.modelValue, tile])
  }
}
</script>

<template>
  <div class="stack gap-txt">
    <div class="stack gap-0">
      <div v-for="suit in suits" :key="suit">
        <tile
          v-for="value in (suit === 'z' ? 7 : 9)"
          :key="`${value}${suit}`"
          :tile="`${value}${suit}`"
          :class="{ 'tile--selected': modelValue.includes(`${value}${suit}`) }"
          :small="isMobile || isMedium"
          @click="toggleTileSelection(`${value}${suit}`)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tile--selected {
  border-color: orange;
  position: relative;
}
.tile--selected::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: gold;
  opacity: 0.3;
}
</style>
