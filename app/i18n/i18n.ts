import * as RNLocalize from "react-native-localize"
import i18n from "i18n-js"

const en = require("./en")
const vi = require("./vi")

i18n.fallbacks = true
i18n.translations = { en, vi }

const fallback = { languageTag: "vi", isRTL: false }

// const { languageTag } =
//   RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback

const { languageTag } = fallback
i18n.locale = languageTag
