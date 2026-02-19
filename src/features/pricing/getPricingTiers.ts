/**
 * Centralized pricing configuration for the landing page.
 *
 * This module is intentionally the single source of truth for all plan prices,
 * so price updates do not require editing multiple i18n locale files.
 *
 * Note: Only numeric/currency values live here; period labels remain in i18n.
 *
 * @returns An object containing formatted prices for each tier.
 */
export function getPricingTiers() {
  const CURRENCY_SYMBOL = '$';

  // Prices (kept as numbers for easy future manipulation)
  const BASIC_MONTHLY = 3;
  const BASIC_ANNUAL = 29;

  const PRO_MONTHLY = 7;
  const PRO_ANNUAL = 69;

  const FOUNDER_ONETIME = 79;

  const FREE = 0;

  const format = (amount: number): string => `${CURRENCY_SYMBOL}${amount}`;

  return {
    free: {
      price: format(FREE),
    },
    basic: {
      price: format(BASIC_MONTHLY),
      annualPrice: format(BASIC_ANNUAL),
    },
    pro: {
      price: format(PRO_MONTHLY),
      annualPrice: format(PRO_ANNUAL),
    },
    founder: {
      price: format(FOUNDER_ONETIME),
    },
  };
}
