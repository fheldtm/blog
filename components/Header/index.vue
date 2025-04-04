<script setup lang="ts"></script>

<template>
  <header class="header">
    <Wrap class="header__wrap">
      <div class="header-logo">
        <NuxtLink class="logo-link" :to="{ name: 'index' }">
          <div class="logo-container">
            <Logo :size="34" />
            <span class="logo-text">HaeRik</span>
          </div>
        </NuxtLink>
      </div>
      <!-- <nav class="header__nav">
        <NuxtLink class="header__link" to="/dev">개발</NuxtLink>
      </nav> -->
    </Wrap>
  </header>
</template>

<style scoped>
.header {
  padding: 10px 0;
  margin-bottom: 0px;
}
.header__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-logo {
  margin: 0;
}
.logo-link {
  display: block;
  margin: 0;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 7px;
}
.logo-text {
  font-size: 28px;
  font-weight: var(--fw-bold);
  color: #373d3a;
  font-family: 'Black Ops One', sans-serif;
}
.header__nav {
  display: flex;
  gap: 16px;
}
.header__link {
  padding: 8px 0px;
  font-weight: var(--fw-regular);
  position: relative;
  font-size: 14px;
}

.header__link::before,
.header__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 1px;
  display: block;
  background: #000;
  transition-property: width;
  transition-duration: 0.2s;
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
