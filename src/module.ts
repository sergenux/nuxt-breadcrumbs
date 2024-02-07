import { name, version } from "../package.json";
import { defu } from "defu";
import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImports,
  addRouteMiddleware,
  addTypeTemplate,
} from "@nuxt/kit";

export interface ModuleOptions {
  componentsPrefix: string;
  composablesPrefix: string;
  pageTitleKey: string;
  rootLabel: string;
  enableLastLink: boolean;
  trailingSlash: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "breadcrumbsModule",
  },
  defaults: {
    componentsPrefix: "",
    composablesPrefix: "",
    pageTitleKey: "pageTitle",
    rootLabel: "🏠",
    enableLastLink: false,
    trailingSlash: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.breadcrumbsModule = defu(
      nuxt.options.runtimeConfig.public.breadcrumbsModule,
      {
        pageTitleKey: options.pageTitleKey,
        rootLabel: options.rootLabel,
        enableLastLink: options.enableLastLink,
        trailingSlash: options.trailingSlash,
      },
    );

    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      prefix: options.componentsPrefix,
    });

    const composables = [
      ["useBreadcrumbs", "./runtime/composables/use-breadcrumbs"],
    ];

    composables.forEach(([name, from]) =>
      addImports({
        name,
        as: name.replace("use", `use${options.composablesPrefix}`),
        from: resolver.resolve(from),
      }),
    );

    addRouteMiddleware({
      name: "breadcrumbs",
      path: resolver.resolve("./runtime/middleware/breadcrumbs.global.ts"),
      global: true,
    });

    addTypeTemplate({
      filename: "./types/breadcrumbs.d.ts",
      getContents: () => `
      import { type BreadcrumbsExtraMeta } from "${resolver.resolve("./runtime/types/breadcrumbs.ts")}";
      declare module "#app" {
        interface PageMeta {
          breadcrumbsBefore?: BreadcrumbsExtraMeta;
          breadcrumbsLabel?: string | false;
          breadcrumbsAfter?: BreadcrumbsExtraMeta;
          hideBreadcrumbs?: boolean;
        }
      }
      export {}`,
    });
  },
});
