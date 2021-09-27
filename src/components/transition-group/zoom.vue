<template>
  <transition-group :name="name" :tag="tag">
    <slot />
  </transition-group>
</template>

<script lang="ts">
// import Velocity from 'velocity-animate';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'TransitionGroupZoom'
})
export default class extends Vue {
  @Prop({ default: 'div' }) tag: string;
  @Prop({ default: 'xy' }) direction: 'x' | 'y' | 'xy';

  name = '';

  @Watch('direction', {
    immediate: true
  })
  onNameChange(val: string) {
    this.name = `transition-group-zoom-${val}`;
  }
}
</script>

<style lang="scss">
/*.transition-group-zoom-xy-enter-active,
.transition-group-zoom-xy-leave-active,
.transition-group-zoom-xy-move {
 transition: 10s cubic-bezier(0.59, 0.12, 0.34, 0.95);
 transition-property: transform;
}

.transition-group-zoom-xy-enter,
.transition-group-zoom-xy-leave-to {
 transform: scaleX(0.2) scaleY(0.2);
}

.transition-group-zoom-xy-leave,
.transition-group-zoom-xy-enter-to {
 transform: scaleX(1) scaleY(1);
}

.transition-group-zoom-xy-leave-active {
 position: absolute !important;
}*/
</style>
