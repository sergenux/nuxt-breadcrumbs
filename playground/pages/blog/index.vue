<template>
  <main>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <ul>
      <li><NuxtLink to="/blog/post-1">Post 1</NuxtLink></li>
      <li><NuxtLink to="/blog/post-2">Post 2</NuxtLink></li>
      <li><NuxtLink to="/blog/post-3">Post 3</NuxtLink></li>
    </ul>
  </main>
</template>
