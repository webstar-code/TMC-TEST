import { LOCALES, DEFAULT_LOCALE } from "./app/i18n/settings";

module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
  react: { useSuspense: false }, //this line
};
