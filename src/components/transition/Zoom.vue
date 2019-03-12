<template>
  <transition :name="name">
    <slot />
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'TransitionZoom'
})
export default class extends Vue {
  @Prop({ default: 'xy' }) direction: 'x' | 'y' | 'xy';

  name = '';

  @Watch('direction', {
    immediate: true
  })
  onNameChange(val: string) {
    this.name = `transition-zoom-${val}`;
  }
}
</script>

<style lang="scss" scoped>
.transition-zoom-xy-enter-active,
.transition-zoom-xy-leave-active,
.transition-zoom-xy-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-zoom-xy-enter,
.transition-zoom-xy-leave-to {
  opacity: 0;
  transform: scaleX(0.2) scaleY(0.2);
}
</style>
