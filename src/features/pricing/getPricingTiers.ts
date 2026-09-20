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

  // TranslitPro has one paid SKU. Notylus Basic and Pro prices deliberately
  // do not belong on this site (SPLIT_CONTRACT.md §6).
  const PLUS_MONTHLY = 3;
  const PLUS_ANNUAL = 29;

  const FREE = 0;

  const formatWithCurrency = (amount: number): string =>
    `${CURRENCY_SYMBOL}${amount}`;

  /** Annual savings (numeric) = (monthly × 12) − annual price. */
  const computeAnnualSavingsAmount = (monthly: number, annual: number): number =>
    monthly * 12 - annual;

  const plusAnnualSavingsAmount = computeAnnualSavingsAmount(PLUS_MONTHLY, PLUS_ANNUAL);

  return {
    /** Shared currency symbol so the UI can render it separately. */
    currencySymbol: CURRENCY_SYMBOL,

    free: {
      /** Numeric amount for the Free tier (used for the large number). */
      amount: FREE,
      /** Formatted string with currency, e.g. "$0". */
      price: formatWithCurrency(FREE),
    },

    plus: {
      /** Numeric monthly amount. */
      amount: PLUS_MONTHLY,
      /** Monthly price formatted with currency, e.g. "$3". */
      price: formatWithCurrency(PLUS_MONTHLY),

      /** Numeric annual billing amount. */
      annualAmount: PLUS_ANNUAL,
      /** Annual billing price formatted with currency, e.g. "$29". */
      annualPrice: formatWithCurrency(PLUS_ANNUAL),

      /** Numeric savings when billed annually instead of monthly. */
      annualSavingsAmount: plusAnnualSavingsAmount,
      /** Savings formatted with currency, e.g. "$7". */
      annualSavings: formatWithCurrency(plusAnnualSavingsAmount),
    },

  };
}
