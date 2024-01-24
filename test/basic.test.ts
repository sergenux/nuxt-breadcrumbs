import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("Breadcrumbs", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
  });

  // TODO: Add tests

  it("Page has breadcrumbs", async () => {
    const html = await $fetch("/blog/post-1");
    expect(html).toContain(`class="breadcrumbs"`);
  });
});
