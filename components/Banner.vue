<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <section class="banner" :class="{ 'is-loaded': isLoaded }">
    <div class="banner__bg">
      <div class="banner__shape shape-1"></div>
      <div class="banner__shape shape-2"></div>
      <div class="banner__shape shape-3"></div>
      <div class="banner__shape shape-4"></div>
      <div class="banner__particles">
        <span
          v-for="n in 20"
          :key="n"
          class="banner__particle"
          :style="{
            '--delay': `${n * 0.1}s`,
            '--size': `${Math.random() * 15 + 5}px`,
            '--left': `${Math.random() * 90 + 5}%`,
            '--top': `${Math.random() * 90 + 5}%`,
            '--color': `hsl(${Math.random() * 60 + 80}, 70%, 60%)`,
          }"
        ></span>
      </div>
    </div>
    <div class="banner__inner">
      <div class="banner__content">
        <div class="banner__header">
          <div class="banner__logo">
            <Logo :size="70" />
          </div>
          <div class="banner__title-wrapper">
            <div class="banner__title">HaeRik <span>Tech</span></div>
            <p class="banner__subtitle">Story of HaeRik Developer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  padding: 0;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f3f5 0%, #e6e9ef 100%);
  height: 280px;
  display: flex;
  align-items: center;
}

.banner__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.banner__shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(70px);
  transition: all 1.2s ease;
  transform: scale(0.8);
}

.is-loaded .banner__shape {
  transform: scale(1);
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #8bc34a 0%, #4caf50 100%);
  top: -150px;
  right: -100px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #2196f3 0%, #03a9f4 100%);
  bottom: -150px;
  left: -50px;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  top: 40px;
  left: 30%;
}

.shape-4 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%);
  bottom: 20px;
  right: 20%;
}

.banner__particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.banner__particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: var(--color);
  border-radius: 50%;
  left: var(--left);
  top: var(--top);
  opacity: 0;
  transform: scale(0);
  filter: blur(5px);
  animation: float 10s ease-in-out infinite;
  animation-delay: var(--delay);
}

.is-loaded .banner__particle {
  opacity: 0.3;
  transform: scale(1);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: var(--delay);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.1);
  }
}

.banner__inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  width: 100%;
}

.banner__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.banner__header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 30px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
}

.is-loaded .banner__header {
  transform: translateY(0);
  opacity: 1;
}

.banner__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
}

.banner__title-wrapper {
  display: flex;
  flex-direction: column;
}

.banner__title {
  font-size: 38px;
  font-weight: var(--fw-bold);
  font-family: 'Black Ops One', sans-serif;
  margin: 0;
  color: #333;
  line-height: 1;
}

.banner__title span {
  background: linear-gradient(135deg, #8bc34a 0%, #4caf50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.banner__subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .banner {
    height: 240px;
    margin-bottom: 10px;
  }

  .banner__header {
    flex-direction: column;
    gap: 15px;
    padding: 15px 25px;
    text-align: center;
  }

  .banner__title {
    font-size: 32px;
  }

  .banner__subtitle {
    font-size: 14px;
  }
}
</style>
