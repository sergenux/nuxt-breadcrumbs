import defu from "defu";
import { type BreadcrumbsExtraMeta } from "../types/breadcrumbs";
import { withTrailingSlash, withoutTrailingSlash, joinURL } from "ufo";
import { useRoute, useRuntimeConfig } from "#imports";
import { computed, type ComputedRef } from "#imports";

export function useBreadcrumbs(params?: BreadcrumbsParams): Breadcrumbs {
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();

  const config = defu(params, runtimeConfig.public.breadcrumbsModule);

  const breadcrumbs = computed(() => {
    const rootLabel = { label: params?.rootLabel ?? "🏠", url: "/" };
    const matchedRoutes = route.matched.length ? route.matched : [route];

    return (
      matchedRoutes
        .flatMap((matchedRoute, index, array) => {
          const matchedRoutePath = withoutTrailingSlash(matchedRoute.path);
          const baseUrl = matchedRoutePath.replace(/[^/]*$/, "");

          const isLast = index == array.length - 1;
          const routeItem = isLast ? route : matchedRoute;

          const pageTitle = routeItem.meta[config.pageTitleKey];
          const label = routeItem.meta.breadcrumbsLabel ?? pageTitle;

          const breadcrumbsItem = {
            label: typeof label === "string" ? label : "",
            url: withoutTrailingSlash(routeItem.path),
          };

          return (
            [
              !index ? rootLabel : [],
              (routeItem.meta.breadcrumbsBefore as BreadcrumbsExtraMeta) ?? [],
              breadcrumbsItem,
              (routeItem.meta.breadcrumbsAfter as BreadcrumbsExtraMeta) ?? [],
            ]
              .flat()
              // Resolve URL
              .map((item) => {
                let url = item.url;

                // Resolve relative URL
                if (!/^(?:\w+:)?\/\/|^\//.test(url)) {
                  url = joinURL(baseUrl, url);
                }

                // Trailing slash
                url = config.trailingSlash
                  ? withTrailingSlash(url)
                  : withoutTrailingSlash(url);

                return { ...item, url };
              })
          );
        })
        // Remove empty label and nested route duplication
        .filter((item, index, array) => {
          const prev = index - 1;
          return item.label && (prev < 0 || item.url != array.at(prev)?.url);
        })
        // Enable/disable last link
        .map((item, index, array) => {
          const isLast = index == array.length - 1;
          return { ...item, disabled: isLast && !config.enableLastLink };
        })
    );
  });

  return breadcrumbs;
}

// Types

type Breadcrumbs = ComputedRef<BreadcrumbsItem[]>;

interface BreadcrumbsItem {
  label: string;
  url: string;
  disabled: boolean;
}

interface BreadcrumbsParams {
  pageTitleKey?: string;
  rootLabel?: string;
  enableLastLink?: boolean;
  trailingSlash?: boolean;
}
