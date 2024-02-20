<script setup>
import { Tile } from '@emeraldcoder/riichi-ui-vue'

const props = defineProps({
  modelValue: {
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function toggleTileSelection (tile) {
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
      <div v-for="suit in ['m', 'p', 's', 'z']" :key="suit">
        <tile
          v-for="value in (suit === 'z' ? 7 : 9)"
          :key="`${value}${suit}`"
          :tile="`${value}${suit}`"
          :class="{ 'tile--selected': modelValue.includes(`${value}${suit}`) }"
          @click="toggleTileSelection(`${value}${suit}`)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tile--selected {
  border: 3px solid orange;
}
</style>
