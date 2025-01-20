import CurrencyPopover from "@components/CurrencyPopover";
import { Box, TextField, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: string;
  items: { text: string; icon: string }[];
  onChangeCurrency: (currency: string) => void;
}

function CurrencyInput({
  label,
  value,
  onChange,
  currency,
  items,
  onChangeCurrency,
}: CurrencyInputProps) {
  return (
    <Box textAlign="left">
      <Typography mb="6px">{label}</Typography>
      <NumericFormat
        value={value}
        onChange={(event) => onChange(event.target.value)}
        customInput={TextField}
        thousandSeparator="."
        thousandsGroupStyle="thousand"
        decimalSeparator=","
        valueIsNumericString={false}
        allowNegative={false}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            sx: {
              pr: 0,
              fontSize: 24,
              fontWeight: 600,
              height: "68px",
              width: "420px",
            },
            endAdornment: (
              <CurrencyPopover
                items={items}
                currency={currency}
                onChangeCurrency={(currency: string) => {
                  onChangeCurrency(currency);
                }}
              />
            ),
          },
        }}
      />
    </Box>
  );
}

export default CurrencyInput;
