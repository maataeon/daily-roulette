<script lang="ts" setup>
import { ref } from 'vue'

const message = ref('')
const onEnter = () => console.log(message)
</script>

<template>
  <div>
    <input v-model="message" type="text" v-on:keyup.enter="onEnter" />
    <div></div>
  </div>
</template>