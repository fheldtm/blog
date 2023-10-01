<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<template>
  <iframe :src="src" frameborder="0" class="playground" />
</template>

<style scoped>
iframe {
  width: 100%;
  height: 400px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
  margin: 0 0 20px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
