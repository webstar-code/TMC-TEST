module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-console": ["error", { allow: ["error"] }],
    "no-unused-vars": "off",
  },
};
