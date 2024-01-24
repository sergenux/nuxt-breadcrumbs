module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "prettier"],
  overrides: [
    {
      files: ["**/components/**/*.{js,ts,jsx,tsx,vue}"],
      rules: { "vue/multi-word-component-names": "off" },
    },
  ],
};
