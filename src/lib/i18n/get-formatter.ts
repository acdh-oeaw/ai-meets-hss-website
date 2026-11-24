import { createFormatter } from "use-intl";

import { formats } from "@/lib/i18n/formats";
import { type IntlLocale, timeZone } from "@/lib/i18n/locales";

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export function getFormatter(locale: IntlLocale) {
	return createFormatter({ formats, locale, timeZone });
}
