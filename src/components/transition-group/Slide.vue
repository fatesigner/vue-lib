<template>
  <transition-group :name="name">
    <slot></slot>
  </transition-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'TransitionGroupSlide'
})
export default class extends Vue {
  @Prop({ default: 'down' }) direction: 'up' | 'right' | 'down' | 'left';

  name = '';

  @Watch('direction', {
    immediate: true
  })
  onNameChange(val: string) {
    this.name = `transition-group-slide-${val}`;
  }
}
</script>

<style lang="scss" scoped>
.transition-group-slide-down-enter-active,
.transition-group-slide-down-leave-active,
.transition-group-slide-down-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-group-slide-down-enter,
.transition-group-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.transition-group-slide-up-enter-active,
.transition-group-slide-up-leave-active,
.transition-group-slide-up-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-group-slide-up-enter,
.transition-group-slide-up-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
