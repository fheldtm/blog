<script setup lang="ts"></script>

<template>
  <nav class="header__nav">
    <RouterLink class="header__link" to="/">Home</RouterLink>
    <RouterLink class="header__link" to="/blog">Blog</RouterLink>
  </nav>
</template>

<style scoped>
.header__nav {
  display: flex;
  gap: 30px;
}
.header__link {
  padding: 20px 0px;
  font-weight: var(--fw-regular);
  position: relative;
}

.header__link::before,
.header__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  display: block;
  background: #000;
  transition-property: width;
  transition-duration: .2s;
}
.header__link::before {
  right: 50%;
}
.header__link::after {
  left: 50%;
}
.header__link:hover::before,
.header__link:hover::after {
  width: 50%;
}
</style>
