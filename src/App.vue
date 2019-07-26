<template>
  <div id="app">
    <stomp
      url="ws://localhost:15674/ws"
      queue="/topic/point"
      login="guest"
      passcode="guest"
      @msg="onMsg"
    ></stomp>
    <globe ref="globe" style="width: 100vw; height: 100vh" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Globe from "./components/Globe.vue"
import Stomp from "./components/Stomp.vue"

@Component({
  components: {
    Globe,
    Stomp,
  },
})
export default class App extends Vue {
  private onMsg($event: { lat: number, long: number }) {
    (this.$refs.globe as Globe).add($event.lat, $event.long)
  }
}
</script>
<style>
html,
body {
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
</style>