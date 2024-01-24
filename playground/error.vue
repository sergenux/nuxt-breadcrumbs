<script setup lang="ts">
const { error } = defineProps<{
  error: {
    url: string;
    statusCode: number;
    statusMessage: string;
    message: string;
    description: string;
    data: any;
  };
}>();

const route = useRoute();

route.meta.pageTitle = `Error ${error.statusCode}`;
</script>

<template>
  <div>
    <NuxtLayout>
      <main>
        <h1>{{ $route.meta.pageTitle }}</h1>
        <p>Content...</p>
      </main>
    </NuxtLayout>
  </div>
</template>
