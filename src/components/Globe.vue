<template>
  <div ref="globe"></div>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SMAA from "../smaa"
import Sun from "../sun"
import Sphere from "../sphere"
import Points from "../points"
@Component
export default class Globe extends Vue {
  @Prop({default: 50})
  public lat: number| undefined
  @Prop({default: 3})
  public long: number| undefined
  private composer: SMAA
  private points: Points

  constructor() {
    super()
    this.composer = new SMAA()
    this.composer.add(new Sun(new Date()))
    this.composer.add(new Sphere("earth.jpg"))
    this.composer.set(this.lat || 0, this.long || 0)
    this.points = new Points()
    this.composer.add(this.points)
    this.points.set(50, -5)
    this.composer.set(50, -5)
  }
  public add(lat: number, long: number) {
    this.points.set(lat, long)
    this.composer.set(lat, long)
  }
  private mounted() {
    this.composer.setElement(this.$refs.globe as Element)
    requestAnimationFrame(this.animate)
  }
  private animate() {
    this.composer.render()
    requestAnimationFrame(this.animate)
  }

}
</script>