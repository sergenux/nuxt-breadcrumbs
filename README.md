# Nuxt Breadcrumbs

Breadcrumbs for Nuxt 3 pages.

## Setup

```bash
# Using npm
npm install @sergenux/nuxt-breadcrumbs

# Using pnpm
pnpm add @sergenux/nuxt-breadcrumbs

# Using yarn
yarn add @sergenux/nuxt-breadcrumbs
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@sergenux/nuxt-breadcrumbs"],
  breadcrumbsModule: {
    // componentsPrefix: "",
    // composablesPrefix: "",
    // pageTitleKey: "pageTitle",
    // rootLabel: "🏠",
    // enableLastLink: false,
    // trailingSlash: false,
  },
});
```

```bash
# Prepare types
npx nuxi prepare
```

## Usage

### Page Meta Fields

```vue
<template>
  <main>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <p>...</p>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  // STATIC VALUES

  // PAGE TITLE AND BREADCRUMBS LABEL
  pageTitle: "List of posts",

  // OVERRIDE
  // breadcrumbsLabel: "Posts",

  // REMOVE
  // breadcrumbsLabel: false,

  // HIDE COMPONENT
  // hideBreadcrumbs: true,

  // EXTRA BREADCRUMBS

  // ONE BEFORE
  // breadcrumbsBefore: {
  //  label: "...",
  //  url: "...",
  // },

  // MANY BEFORE
  // breadcrumbsBefore: [
  //  { label: "...", url: "..." },
  //  { label: "...", url: "..." },
  // ],

  // ONE AFTER
  // breadcrumbsAfter: {
  //  label: "...",
  //  url: "...",
  // },

  // MANY AFTER
  // breadcrumbsAfter: [
  //  { label: "...", url: "..." },
  //  { label: "...", url: "..." },
  // ]

  // DYNAMIC VALUES

  middleware: async (route) => {
    const { someParam } = route.params;

    // const data = await fetchSomeData(someParam);

    // PAGE TITLE AND BREADCRUMBS LABEL
    // route.meta.pageTitle = data.title;

    // OVERRIDE
    // route.meta.breadcrumbsLabel = data.title + "..."

    // EXTRA BREADCRUMBS

    // MANY BEFORE
    // route.meta.breadcrumbsBefore = data.categories.map((category) => {
    //   return { label: category.name, url: "/categories/" + category.code };
    // });
  },
});
</script>
```

Along with breadcrumbsBefore, breadcrumbsAfter can be used on list page like product list with filter. Last breadcrumbs item can have url "/products?brand=some-brand" with label "Products (Brand: Some Brand)" and previous item will be "Products" with url "/products" which resets the filter.

### Components

#### Breadcrumbs

Basic usage with default component template:

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

Override component template:

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
</Breadcrumbs>
```

### Composables

#### useBreadcrumbs

Basic usage:

`MyBreadcrumbs.vue`

```vue
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
<script setup lang="ts">
const breadcrumbs = useBreadcrumbs({
  // pageTitleKey: "pageTitle",
  // rootLabel: "🏠",
  // enableLastLink: false,
  // trailingSlash: false,
});
</script>
```

## Example with nested pages

Page structure:

```bash [Directory Structure]
-| blog/
---| index.vue
---| post-1.vue
-| blog.vue
-| index.vue
```

The chain starts with the `rootLabel`(default: 🏠) defined in the module settings so we don't need to do anything:

`/index.vue`

```vue
<script setup lang="ts">
definePageMeta({
  pageTitle: "Home",
});
</script>
```

Parent component for blog section:

`/blog.vue`

```vue
<script setup lang="ts">
definePageMeta({
  pageTitle: "Blog",
});
</script>
```

Nested component for blog section (we don't need to do anything as it is defined in the parent component):

`/blog/index.vue`

```vue
<script setup lang="ts">
definePageMeta({
  // ...
});
</script>
```

`/blog/post-1.vue`

```vue
<script setup lang="ts">
definePageMeta({
  pageTitle: "Post 1",
});
</script>
```

Finally you will see breadcrumbs for post page: 🏠 > Blog > Post 1

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

# Code checks
npm run format
npm run format:fix
npm run lint
npm run lint:fix
npm run typecheck

# Test
npm run test
```
