import { defineNuxtRouteMiddleware } from "#imports";

export default defineNuxtRouteMiddleware((route) => {
  ["breadcrumbsBefore", "breadcrumbsLabel", "breadcrumbsAfter"].map((item) => {
    if (route.meta[item] !== undefined) {
      route.meta[item] = route.matched.at(-1)?.meta[item];
    }
  });
});
