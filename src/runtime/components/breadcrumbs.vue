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

<script lang="ts">
import { defineComponent } from "#imports";
import { useBreadcrumbs } from "../composables/use-breadcrumbs";

export default defineComponent({
  props: {
    pageTitleKey: {
      type: String,
      default: undefined,
    },
    rootLabel: {
      type: String,
      default: undefined,
    },
    enableLastLink: {
      type: Boolean,
      default: undefined,
    },
    trailingSlash: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props) {
    const breadcrumbs = useBreadcrumbs(props);

    return { breadcrumbs };
  },
});
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
