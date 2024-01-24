# Nuxt Breadcrumbs

Breadcrumbs for Nuxt 3 pages.

## Installation

1. Add `@sergenux/nuxt-breadcrumbs` dependency to your project

```bash
# Using npm
npm install --save-dev @sergenux/nuxt-breadcrumbs

# Using pnpm
pnpm add -D @sergenux/nuxt-breadcrumbs

# Using yarn
yarn add --dev @sergenux/nuxt-breadcrumbs
```

2. Add `@sergenux/nuxt-breadcrumbs` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@sergenux/nuxt-breadcrumbs"],
  breadcrumbsModule: {
    // Module options
    //
    // Auto-import components with prefix
    // componentsPrefix: "",
    //
    // Auto-import composables with prefix
    // composablesPrefix: "",
    //
    // Route meta key for page title
    // pageTitleKey: "pageTitle",
    //
    // Label for root item
    // rootLabel: "🏠",
    //
    // Enable last link in breadcrumbs
    // enableLastLink: false,
    //
    // Add/remove trailing slash in non-custom item URLs
    // trailingSlash: false,
  },
});
```

## Usage

Add Breadcrumbs component to layout or app.vue:

```vue
<template>
  <div>
    <Breadcrumbs />
    <NuxtPage />
  </div>
</template>
```

### Options in page components

```vue
<template>
  <main>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <p>Content...</p>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  // Page title and breadcrumbs label.
  pageTitle: "List of posts",
  //
  // Override breadcrumbs label
  // breadcrumbsLabel: "Posts",
  //
  // Remove breadcrumbs item
  // breadcrumbsLabel: false,
  //
  // Hide breadcrumbs component
  // hideBreadcrumbs: true,
  //
  // Extra breadcrumbs
  //
  // Add one item before
  // breadcrumbsBefore: {
  //  label: "...",
  //  url: "...",
  // },
  //
  // Add many items before
  // breadcrumbsBefore: [
  //  { label: "...", url: "..." },
  //  { label: "...", url: "..." },
  // ],
  //
  // Add one item After
  // breadcrumbsBefore: {
  //  label: "...",
  //  url: "...",
  // },
  //
  // Add many items after
  // breadcrumbsBefore: [
  //  { label: "...", url: "..." },
  //  { label: "...", url: "..." },
  // ]
});
</script>
```

### Example page meta for nested pages

Page structure:

```bash [Directory Structure]
-| blog/
---| index.vue
---| post-1.vue
-| blog.vue
-| index.vue
```

"/index.vue":

```vue
...
<script setup lang="ts">
definePageMeta({
  pageTitle: "Home",
  breadcrumbsLabel: false,
});
</script>
...
```

Parent component for blog section "/blog.vue":

```vue
...
<script setup lang="ts">
definePageMeta({
  pageTitle: "Blog",
});
</script>
...
```

Nested component for blog section "/blog/index.vue":

```vue
...
<script setup lang="ts">
definePageMeta({
  breadcrumbsLabel: false,
});
</script>
...
```

"/blog/post-1.vue":

```vue
...
<script setup lang="ts">
definePageMeta({
  pageTitle: "Post 1",
});
</script>
...
```

Finally you will see breadcrumbs for post page: 🏠 > Blog > Post 1

### Dynamic pages

Fetch data in middleware and set fields:

```vue
...
<script setup lang="ts">
definePageMeta({
  middleware: async (route) => {
    const data = await fetchSomeData(route.params.id);
    route.meta.pageTitle = data.title;
    //
    // Override breadcrumbs label if needed
    // route.meta.breadcrumbsLabel = data.title + "..."
    //
    // Add categories before item if needed
    route.meta.breadcrumbsBefore = data.categories.map((category) => {
      return { label: category.name, url: "/categories/" + category.code };
    });
  },
});
</script>
...
```

Along with breadcrumbsBefore, breadcrumbsAfter can be used on list pages like product or post list with filtering. Last item can be with label "Products (Brand: Some Brand)" and url "/products?brand=some-brand" and previous item will be "Products" with url "/products" which resets the filter.

## Component

Basic usage with default template:

```vue
<Breadcrumbs />
```

Override module settings:

```vue
<Breadcrumbs
  page-title-key="pageTitle"
  root-label="🏠"
  :enable-last-link="false"
  :trailing-slash="false"
/>
```

Override template in slot usign items data with v-slot="{ items }":

```vue
<Breadcrumbs v-slot="{ items }">
  <ul >
    <li v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="!item.disabled" :to="item.url">
        {{ item.label }}
      </NuxtLink>
      <span v-else>{{ item.label }}</span>
    </li>
  </ul>
</<Breadcrumbs>
```

## Composable

Basic usage:

MyComponent.vue

```vue
MyComponent.vue

<template>
  <ul>
    <li v-for="(item, index) in breadcrumbs" :key="index">
      <NuxtLink v-if="!item.disabled" :to="item.url">
        {{ item.label }}
      </NuxtLink>
      <span v-else>{{ item.label }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
const breadcrumbs = useBreadcrumbs();
</script>
```

Override module settings:

```vue
...
<script setup lang="ts">
const breadcrumbs = useBreadcrumbs({
  pageTitleKey: "pageTitle",
  rootLabel: "🏠",
  enableLastLink: false,
  trailingSlash: false,
});
</script>
...
```
## Development

```bash
# Clone repository
git clone https://github.com/sergenux/nuxt-breadcrumbs.git

# Change directory 
cd nuxt-breadcrumbs

# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build
```
