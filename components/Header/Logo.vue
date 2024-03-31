<script setup lang="ts"></script>

<template>
  <h1>
    <NuxtLink class="logo" :to="{ name: 'index' }">
      <span>KK</span>A<span>M</span>ANG
    </NuxtLink>
  </h1>
</template>

<style scoped>
h1 {
  margin: 0;
}
.logo {
  font-size: 20px;
  line-height: 1.5;
  font-weight: var(--fw-bold);
  color: #373d3a;
  margin: 0;
  font-family: 'Black Ops One';
  display: block;
}
.logo span {
  font-size: 36px;
}
</style>
