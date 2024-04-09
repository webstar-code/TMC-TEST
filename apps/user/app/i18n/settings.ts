export const LOCALES = [
  "en",
  "hi",
  "zh",
  "ar",
  "ur",
  "fr",
  "ru",
  "es",
] as const;
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "ur", name: "Urdu" },
  { code: "fr", name: "French" },
  { code: "ru", name: "Russian" },
  { code: "es", name: "Spanish" },
];
export const DEFAULT_LOCALE = "en";

export const fallbackLng = DEFAULT_LOCALE;
export const languages = LOCALES;
export const defaultNS = "common";
export const cookieName = "i18next";

export const namepsaces = {
  landingPage: "landing-page",
};

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    saveMissing: true,
    backend: {
      projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID,
      apiKey: process.env.NEXT_PUBLIC_LOCIZE_API_KEY,
    },
  };
}
