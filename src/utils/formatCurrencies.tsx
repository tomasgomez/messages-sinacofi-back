function createCurrencyFormatter({
  currency,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  currencyDisplay = null
} : {
  currency: string,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  currencyDisplay?: string | null
}) {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
    ...(currencyDisplay ? { currencyDisplay } : {}),
  });

  return function(number: any) {
    return formatter.format(number);
  };
}

export const formatToCLP = createCurrencyFormatter({ currency: 'CLP' });
export const formatToUF = createCurrencyFormatter({ currency: 'CLF', minimumFractionDigits: 4, maximumFractionDigits: 4, currencyDisplay: "narrowSymbol" });
