<template>
  <main>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <ul>
      <li><NuxtLink to="/blog">Blog</NuxtLink></li>
    </ul>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  pageTitle: "Home",
  breadcrumbsLabel: false,
});
</script>
