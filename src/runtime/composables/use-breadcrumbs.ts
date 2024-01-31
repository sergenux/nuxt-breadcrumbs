import { type BreadcrumbsProps } from "../types/breadcrumbs-props";
import defu from "defu";
import {
  computed,
  useRoute,
  useRuntimeConfig,
  type ComputedRef,
} from "#imports";

export function useBreadcrumbs(props?: BreadcrumbsProps): ComputedRef<
  Array<{
    label: string;
    url: string;
    disabled: boolean;
  }>
> {
  const runtimeConfig = useRuntimeConfig();
  const currentRoute = useRoute();

  const config = defu(props, runtimeConfig.public.breadcrumbsModule);

  return computed(() => {
    const matchedRoutes = currentRoute.matched.length
      ? currentRoute.matched
      : [currentRoute];

    // Nav items
    const navItems = matchedRoutes
      .flatMap((matchedRoute, index, array) => {
        const isLast = index == array.length - 1;
        const route = isLast ? currentRoute : matchedRoute;
        const label =
          route.meta.breadcrumbsLabel ?? route.meta[config.pageTitleKey];
        return [
          route.meta.breadcrumbsBefore ?? [],
          typeof label === "string" ? { label, url: "" } : [],
          route.meta.breadcrumbsAfter ?? [],
        ]
          .flat()
          .filter((item) => item.label)
          .map((item) => ({
            routePath: route.path,
            data: { ...item },
          }));
      })
      //Resolve URL
      .flatMap((item) => {
        const isCustomUrl = item.data.url ? true : false;
        item.data.url ||= item.routePath;

        // Resolve relative url
        if (!/^(?:\w+:)?\/\/|^\//.test(item.data.url)) {
          const baseUrl = item.routePath.replace(/[^/]*$/, "");
          item.data.url = baseUrl + item.data.url.replace(/^\.\//, "");
        }

        //Add/remove trailing slash for not custom url
        if (!isCustomUrl && item.data.url != "/") {
          item.data.url = config.trailingSlash
            ? item.data.url.replace(/\/?(\?|$)/, "/$1")
            : item.data.url.replace(/\/+(?=\?|$)/, "");
        }

        return [item.data];
      });

    // Add root item
    navItems.unshift({ label: config.rootLabel, url: "/" });

    // Breadcrumbs
    const breadcrumbs = navItems.map((item, index, array) => {
      const { label, url, ...other } = item;
      const isLast = index == array.length - 1;
      return {
        label,
        url,
        disabled: isLast ? !config.enableLastLink : false,
        ...other,
      };
    });

    return breadcrumbs;
  });
}
