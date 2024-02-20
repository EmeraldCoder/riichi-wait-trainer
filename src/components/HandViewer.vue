<script setup>
import { Tile, TileGroup } from '@emeraldcoder/riichi-ui-vue'
import useWidthTreshold from '../composables/useWidthThreshold'

defineProps({
  hand: {
    required: true
  }
})

const { isMobile, isMedium, isHd } = useWidthTreshold()
</script>

<template>
  <div :class="{ stack: !isHd, row: isHd, 'row-v-bottom': isHd, 'gap-0': isHd }">
    <div>
      <tile-group>
        <tile
          v-for="(tile, tileIndex) in hand.hand"
          :key="`hand.${tileIndex}`"
          :tile="tile"
          :x-small="isMobile"
          :small="isMedium"
        />
      </tile-group>
    </div>

    <div style="max-width: 100%; overflow: auto;" class="row gap-0">
      <tile-group
        v-for="(call, callIndex) in hand.calls"
        :key="`call.${callIndex}`"
        :class="{ 'm-l': isHd || callIndex !== 0 }"
      >
        <tile
          v-for="(tile, tileIndex) in call.tiles"
          :key="`call.${callIndex}.${tileIndex}`"
          :tile="tile"
          :sided="tileIndex === 0 && call.type !== 'ankan'"
          :reversed="call.type === 'ankan' && (tileIndex === 0 || tileIndex === 3)"
          :x-small="isMobile"
          :small="isMedium"
        />
      </tile-group>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 500px) {
  .m-l {
    margin-left: calc(var(--gap-size) / 4);
  }
}
</style>
