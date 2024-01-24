<template>
  <main>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <p>Content...</p>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  pageTitle: "Post 1",
});
</script>
