<template>
  <div v-if="!$route.meta.hideBreadcrumbs">
    <slot :items="breadcrumbs">
      <ul class="breadcrumbs">
        <li v-for="(item, index) in breadcrumbs" :key="index">
          <NuxtLink v-if="!item.disabled" :to="item.url">
            {{ item.label }}
          </NuxtLink>
          <span v-else>{{ item.label }}</span>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from "../composables/use-breadcrumbs";
import { type BreadcrumbsProps } from "../types/breadcrumbs-props";

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
  rootLabel: undefined,
  enableLastLink: undefined,
  trailingSlash: undefined,
});

const breadcrumbs = useBreadcrumbs(props);
</script>

<style scoped>
.breadcrumbs {
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumbs li {
  margin: 0;
  padding: 0;
  display: inline-block;
}

.breadcrumbs li:not(:last-child):after {
  content: ">";
  margin: 0 0.5rem;
}
</style>
