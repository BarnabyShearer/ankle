<template></template>
<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Client, Message } from "@stomp/stompjs"

@Component({
  props: {
    url: String,
    queue: String,
    login: String,
    passcode: String,
  },
})
export default class Stomp extends Vue {
  public data(): {
    client: Client | null,
  } {
    return {
      client: null,
    }
  }
  public mounted() {
    this.$data.client = new Client({
      brokerURL: this.$props.url,
      connectHeaders: {
        login: this.$props.login,
        passcode: this.$props.passcode,
      },
    })
    this.$data.client.onConnect =
      () => {
        this.$data.client.subscribe(
          this.$props.queue,
          (m: {body: string}) => this.$emit("msg", JSON.parse(m.body)),
        )
      }
    this.$data.client.activate()
  }
  public beforeDestroy() {
    this.$data.client.deactivate()
  }
}
</script>