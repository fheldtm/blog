<script setup lang="ts"></script>

<template>
  <header class="header">
    <Wrap class="header__wrap">
      <HeaderLogo />
      <HeaderNav />
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
</style>
