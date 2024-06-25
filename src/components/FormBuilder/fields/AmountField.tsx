import Field from "@/components/Field";
import NumericFormat from "./NumberFormat";
import { useFormContext } from "react-hook-form";
import { useAppContext } from "@/app/context";
import { useEffect, useState } from "react";

const getSum = (fieldList: any[]) => {
  return fieldList.reduce(
    (accumulator: any, currentValue: any) => parseFloat(accumulator) + parseFloat(currentValue),
    0,
  );
};

const parseToUf: any = (currency: any, value: any, currencies: any) => {
  if (currency === "pesos") {
    return (parseFloat(value) / parseFloat(currencies.UF))
  }
  if (currency === "dollar") {
    return ((parseFloat(value) * parseFloat(currencies.USD)) / parseFloat(currencies.UF))
  }
  if (currency === "IVP") {
    return ((parseFloat(value) * parseFloat(currencies.IPV)) / parseFloat(currencies.UF))
  }
  return parseFloat(value)
};

const parseToCLP: any = (currency: any, value: any, currencies: any) => {
  if (currency === "uf") {
    return (parseFloat(value) * parseFloat(currencies.UF))
  }
  if (currency === "dollar") {
    return (parseFloat(value) * parseFloat(currencies.USD)) 
  }
  if (currency === "IVP") {
    return (parseFloat(value) * parseFloat(currencies.IPV))
  }
  return parseFloat(value)
};


const SumField = (props: any) => {
  const { watch } = useFormContext();
  const { currencies } = useAppContext();
  const [value, setValue] = useState(props.defaultValue);
  const fields = [
    {
      currency: watch("mortgageCurrencyType"),
      fieldList: [
        parseFloat(watch("capital")),
        parseFloat(watch("mora")),
        parseFloat(watch("amortization")),
        parseFloat(watch("prepaidCost")),
        parseFloat(watch("interest"))
      ],
    },
    {
      currency: watch("collectionCurrencyType"),
      fieldList: [
        parseFloat(watch("collection")),
        parseFloat(watch("judicial")),
        parseFloat(watch("loanSubtotal")),
        parseFloat(watch("dividendAmount")),
        parseFloat(watch("totalCredit"))
      ],
    },
    {
      currency: watch("mortgageCurrencyTypeOther"),
      fieldList: [
        parseFloat(watch("capitalOther")),
        parseFloat(watch("interestOther")),
        parseFloat(watch("moraOther")),
      ],
    },
    {
      currency: watch("collectionCurrencyTypeOther"),
      fieldList: [
        parseFloat(watch("collectionOther")),
        parseFloat(watch("judicialOther")),
      ],
    },
  ];
  useEffect(() => {
    const totalFields = fields.map(({ currency, fieldList }) => {
      return { currency, total: parseFloat(getSum(fieldList)), fieldList };
    }, 0)
    let total: any = 0;
    if (props.id === "totalPrepaidToPayCLP") {
      total = parseFloat(totalFields.reduce((prev: any, current: any) => {
        return parseFloat(prev) + parseToCLP(current.currency, parseFloat(current.total), currencies)
      }, 0)).toFixed(2);
    } else {
      total = parseFloat(totalFields.reduce((prev: any, current: any) => {
        return parseFloat(prev) + parseToUf(current.currency, current.total, currencies)
      }, 0)).toFixed(4);
    }
    setValue(total);
  }, [fields]);
  return (
    <Field
      {...props}
      prefix="$"
      value={value}
      // type="number"
      // InputProps={{
      //   startAdornment: <InputAdornment position="start" sx={{ marginLeft: 0 }}>$</InputAdornment>,
      // }}
      InputProps={{
        inputComponent: NumericFormat
      }}
    />
  )
}

const AmountField = (props: any) => {
  if (props.id === "totalPrepaidToPayCLP" || props.id === "totalPrepaidToPayUF") {
    return <SumField {...props} />
  }
  return (
    <Field
      {...props}
      prefix="$"
      // type="number"
      // InputProps={{
      //   startAdornment: <InputAdornment position="start" sx={{ marginLeft: 0 }}>$</InputAdornment>,
      // }}
      InputProps={{
        inputComponent: NumericFormat
      }}
    />
  );
};

export default AmountField;