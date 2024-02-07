import { type BreadcrumbsExtraMeta } from "../types/breadcrumbs";
import { withTrailingSlash, withoutTrailingSlash } from "ufo";
import defu from "defu";
import {
  computed,
  useRoute,
  useRuntimeConfig,
  type ComputedRef,
} from "#imports";

export function useBreadcrumbs(params?: {
  pageTitleKey?: string;
  rootLabel?: string;
  enableLastLink?: boolean;
  trailingSlash?: boolean;
}): ComputedRef<
  Array<{
    label: string;
    url: string;
    disabled: boolean;
  }>
> {
  const runtimeConfig = useRuntimeConfig();
  const currentRoute = useRoute();

  const config = defu(params, runtimeConfig.public.breadcrumbsModule);

  const breadcrumbs = computed(() => {
    const matchedRoutes = currentRoute.matched.length
      ? currentRoute.matched
      : [currentRoute];

    return matchedRoutes
      .flatMap((matchedRoute, index, array) => {
        const isLast = index == array.length - 1;
        const route = isLast ? currentRoute : matchedRoute;
        const label =
          route.meta.breadcrumbsLabel ?? route.meta[config.pageTitleKey];
        return [
          !index ? { label: config.rootLabel, url: "/" } : [],
          (route.meta.breadcrumbsBefore as BreadcrumbsExtraMeta) ?? [],
          typeof label === "string" ? { label, url: route.path } : [],
          (route.meta.breadcrumbsAfter as BreadcrumbsExtraMeta) ?? [],
        ]
          .flat()
          .map((item) => {
            let url = item.url;

            if (!/^(?:\w+:)?\/\/|^\//.test(url)) {
              const baseUrl = matchedRoute.path.replace(/[^/]*$/, "");
              url = baseUrl + url.replace(/^\.\//, "");
            }

            url = config.trailingSlash
              ? withTrailingSlash(url)
              : withoutTrailingSlash(url);
            return { ...item, url };
          });
      })
      .filter((item, index, array) => {
        const prev = index - 1;

        return item.label && (prev < 0 || item.url != array.at(prev)?.url);
      })
      .map((item, index, array) => {
        const { label, url, ...other } = item;
        const isLast = index == array.length - 1;
        return {
          label,
          url,
          disabled: isLast ? !config.enableLastLink : false,
          ...other,
        };
      });
  });

  return breadcrumbs;
}
