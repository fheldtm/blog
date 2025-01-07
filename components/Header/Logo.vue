<script setup lang="ts"></script>

<template>
  <h1>
    <NuxtLink class="logo" :to="{ name: 'index' }">HaeRik</NuxtLink>
  </h1>
</template>

<style scoped>
h1 {
  margin: 0;
}
.logo {
  font-size: 36px;
  line-height: 1.5;
  font-weight: var(--fw-bold);
  color: #373d3a;
  margin: 0;
  font-family: 'Black Ops One';
  display: block;
}
</style>
