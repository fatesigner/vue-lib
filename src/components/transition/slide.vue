<template>
  <transition :name="name">
    <slot />
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'TransitionSlide'
})
export default class extends Vue {
  @Prop({ default: 'down' }) direction: 'up' | 'right' | 'down' | 'left';

  name = '';

  @Watch('direction', {
    immediate: true
  })
  onNameChange(val: string) {
    this.name = `transition-slide-${val}`;
  }
}
</script>

<style lang="scss" scoped>
.transition-slide-down-enter-active,
.transition-slide-down-leave-active,
.transition-slide-down-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-slide-down-enter,
.transition-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.transition-slide-up-enter-active,
.transition-slide-up-leave-active,
.transition-slide-up-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-slide-up-enter,
.transition-slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.transition-slide-right-enter-active,
.transition-slide-right-leave-active,
.transition-slide-right-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-slide-right-enter,
.transition-slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.transition-slide-left-enter-active,
.transition-slide-left-leave-active,
.transition-slide-left-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-slide-left-enter,
.transition-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
