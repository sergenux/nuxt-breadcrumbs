export interface BreadcrumbsItemMeta {
  label: string;
  url: string;
  [key: string]: unknown;
}

export type BreadcrumbsExtraMeta = BreadcrumbsItemMeta | BreadcrumbsItemMeta[];
