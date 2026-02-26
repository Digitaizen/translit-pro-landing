/**
 * Centralized pricing configuration for the landing page.
 *
 * This module is intentionally the single source of truth for all plan prices,
 * so price updates do not require editing multiple i18n locale files.
 *
 * Note:
 * - Only numeric/currency values live here; period labels remain in i18n.
 * - Both the raw numeric amounts and their formatted (with currency symbol)
 *   representations are exposed so that the UI can style the number and
 *   currency text separately. This is important for integrations like
 *   browser translation extensions, which may translate the currency symbol
 *   into a word (e.g. "$" → "dollar") and should not inherit the large
 *   font-size used for the numeric amount.
 *
 * @returns An object containing pricing data for each tier, including the
 *          shared currency symbol, numeric amounts, and formatted strings.
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

  const formatWithCurrency = (amount: number): string =>
    `${CURRENCY_SYMBOL}${amount}`;

  /** Annual savings (numeric) = (monthly × 12) − annual price. */
  const computeAnnualSavingsAmount = (monthly: number, annual: number): number =>
    monthly * 12 - annual;

  const basicAnnualSavingsAmount = computeAnnualSavingsAmount(
    BASIC_MONTHLY,
    BASIC_ANNUAL,
  );
  const proAnnualSavingsAmount = computeAnnualSavingsAmount(
    PRO_MONTHLY,
    PRO_ANNUAL,
  );

  return {
    /** Shared currency symbol so the UI can render it separately. */
    currencySymbol: CURRENCY_SYMBOL,

    free: {
      /** Numeric amount for the Free tier (used for the large number). */
      amount: FREE,
      /** Formatted string with currency, e.g. "$0". */
      price: formatWithCurrency(FREE),
    },

    basic: {
      /** Numeric monthly amount. */
      amount: BASIC_MONTHLY,
      /** Monthly price formatted with currency, e.g. "$3". */
      price: formatWithCurrency(BASIC_MONTHLY),

      /** Numeric annual billing amount. */
      annualAmount: BASIC_ANNUAL,
      /** Annual billing price formatted with currency, e.g. "$29". */
      annualPrice: formatWithCurrency(BASIC_ANNUAL),

      /** Numeric savings when billed annually instead of monthly. */
      annualSavingsAmount: basicAnnualSavingsAmount,
      /** Savings formatted with currency, e.g. "$7". */
      annualSavings: formatWithCurrency(basicAnnualSavingsAmount),
    },

    pro: {
      /** Numeric monthly amount. */
      amount: PRO_MONTHLY,
      /** Monthly price formatted with currency, e.g. "$7". */
      price: formatWithCurrency(PRO_MONTHLY),

      /** Numeric annual billing amount. */
      annualAmount: PRO_ANNUAL,
      /** Annual billing price formatted with currency, e.g. "$69". */
      annualPrice: formatWithCurrency(PRO_ANNUAL),

      /** Numeric savings when billed annually instead of monthly. */
      annualSavingsAmount: proAnnualSavingsAmount,
      /** Savings formatted with currency, e.g. "$15". */
      annualSavings: formatWithCurrency(proAnnualSavingsAmount),
    },

    founder: {
      /** Numeric one-time Founder price. */
      amount: FOUNDER_ONETIME,
      /** One-time price formatted with currency, e.g. "$79". */
      price: formatWithCurrency(FOUNDER_ONETIME),
    },
  };
}
