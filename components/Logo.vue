<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 40,
  },
  color: {
    type: String,
    default: '#8BC34A',
  },
});
</script>

<template>
  <div
    class="logo-wrapper"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      class="logo-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="color" />
          <stop
            offset="100%"
            :stop-color="color === '#8BC34A' ? '#4CAF50' : color"
          />
        </linearGradient>
      </defs>

      <!-- Background rounded rectangle -->
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="15"
        fill="url(#logoGradient)"
      />

      <!-- Code brackets -->
      <path
        d="M34,35 L26,50 L34,65"
        stroke="white"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M66,35 L74,50 L66,65"
        stroke="white"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- H letter -->
      <path
        d="M44,40 L44,60 M56,40 L56,60 M44,50 L56,50"
        stroke="white"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
