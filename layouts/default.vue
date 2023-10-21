<script setup lang="ts">
function backToTop() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(backToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  }
}
</script>

<template>
  <a-layout>
    <Header />
    <main class="min-h-[calc(100vh-64px)] color-#252933">
      <slot />
    </main>
    <Bottom />
    <a-back-top />
  </a-layout>
</template>

<style>

</style>

<style lang="scss" scoped>

</style>
