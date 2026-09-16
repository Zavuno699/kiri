// Configuration-driven internationalization
// In production, these would come from app configuration/environment
export const APP_CONFIG = {
  defaultLocale: 'en-US', // Sensible default, not hardcoded to en-UG
  defaultCurrency: 'USD', // Sensible default
  defaultTimezone: 'UTC',
} as const

export type Locale = string
export type Currency = string
export type Timezone = string

// Locale context interface - would be populated from config in production
export interface LocaleContext {
  locale: Locale
  currency: Currency
  timezone: Timezone
}

// Get the current locale context (placeholder for config-driven implementation)
export function getLocaleContext(): LocaleContext {
  // In production, this would read from app configuration
  // For now, using sensible defaults
  return {
    locale: APP_CONFIG.defaultLocale,
    currency: APP_CONFIG.defaultCurrency,
    timezone: APP_CONFIG.defaultTimezone,
  }
}

// Format currency using the payment's own currency, falling back to app default
export function formatCurrency(
  amount?: number,
  currency?: string,
  locale?: string
): string {
  if (amount == null) return "—"

  const context = getLocaleContext()
  const currencyToUse = currency || context.currency
  const localeToUse = locale || context.locale

  return new Intl.NumberFormat(localeToUse, {
    style: 'currency',
    currency: currencyToUse,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format integer/number using app locale
export function formatInteger(
  value?: number,
  locale?: string
): string {
  if (value == null) return "—"

  const context = getLocaleContext()
  const localeToUse = locale || context.locale

  return new Intl.NumberFormat(localeToUse).format(value)
}

// Format percentage
export function formatPercentage(
  value?: number
): string {
  return value == null ? "—" : `${value}%`
}

// Format date using app locale
export function formatDate(
  value?: string,
  locale?: string
): string {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  const context = getLocaleContext()
  const localeToUse = locale || context.locale

  return new Intl.DateTimeFormat(localeToUse, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// Format date-time using app locale
export function formatDateTime(
  value?: string,
  locale?: string
): string {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  const context = getLocaleContext()
  const localeToUse = locale || context.locale

  return new Intl.DateTimeFormat(localeToUse, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Format monetary amount from integer minor units to display
// Never introduce floating-point money math - amounts remain integer minor units
export function formatMonetaryAmount(
  amountInMinorUnits?: number,
  currency?: string,
  locale?: string
): string {
  if (amountInMinorUnits == null) return "—"

  // Convert minor units to major units for display only
  // e.g., cents to dollars, but calculation remains in minor units
  const majorUnits = amountInMinorUnits / 100
  
  return formatCurrency(majorUnits, currency, locale)
}
