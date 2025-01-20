import SwitchIcon from "@assets/icons/switch.svg?react";
import CurrencyInput from "@components/CurrencyInput";
import { usePriceItems } from "@components/hooks/usePriceItems";
import { CalculatorContainer } from "@components/styled/Calculator";
import Spinner from "@components/styled/Spinner";
import { Box, IconButton, Typography } from "@mui/material";
import {
  formatNumberToLocaleString,
  parseNumberFromString,
} from "@utils/number";
import { useEffect, useMemo, useState } from "react";

function CalculatorBox() {
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [sendCurrency, setSendCurrency] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");

  const { priceItems, isFetching } = usePriceItems();

  useEffect(() => {
    // Set default currency
    if (priceItems.length > 0) {
      setSendCurrency(priceItems[0].text);
      setReceiveCurrency(priceItems[1].text);
    }
  }, [priceItems]);

  const getCurrencyPrice = useMemo(
    () => (currency: string) => {
      return priceItems.find((item) => item.text === currency)?.price;
    },
    [priceItems]
  );

  const onChangeSendAmount = (newAmount: string) => {
    setSendAmount(newAmount);
    updateReceiveAmount({ newSendAmount: newAmount });
  };

  const onChangeSendCurrency = (newCurrency: string) => {
    setSendCurrency(newCurrency);
    updateReceiveAmount({ newSendCurrency: newCurrency });
  };

  const updateReceiveAmount = ({
    newSendAmount,
    newSendCurrency,
  }: {
    newSendAmount?: string;
    newSendCurrency?: string;
  }) => {
    const sendPrice = getCurrencyPrice(newSendCurrency || sendCurrency);
    const receivePrice = getCurrencyPrice(receiveCurrency);

    if (sendPrice && receivePrice) {
      const sendAmountParsed = parseNumberFromString(
        newSendAmount || sendAmount
      );
      const newReceiveAmount = formatNumberToLocaleString(
        (sendAmountParsed * sendPrice) / receivePrice
      );
      setReceiveAmount(newReceiveAmount);
    }
  };

  const updateSendAmount = (newReceiveAmount?: string) => {
    const sendPrice = getCurrencyPrice(sendCurrency);
    const receivePrice = getCurrencyPrice(receiveCurrency);

    if (sendPrice && receivePrice) {
      const receiveAmountParsed = parseNumberFromString(
        newReceiveAmount || receiveAmount
      );
      const newSendAmount = formatNumberToLocaleString(
        (receiveAmountParsed * receivePrice) / sendPrice
      );
      setSendAmount(newSendAmount);
    }
  };

  const onChangeReceiveAmount = (newAmount: string) => {
    setReceiveAmount(newAmount);
    updateSendAmount(newAmount);
  };

  const onChangeReceiveCurrency = (newCurrency: string) => {
    setReceiveCurrency(newCurrency);
    const sendPrice = getCurrencyPrice(sendCurrency);
    const receivePrice = getCurrencyPrice(newCurrency);

    if (sendPrice && receivePrice) {
      const newReceiveAmount = formatNumberToLocaleString(
        (sendPrice / receivePrice) * Number(sendAmount)
      );
      setReceiveAmount(newReceiveAmount);
    }
  };

  const renderCurrencyExchange = () => {
    const sendPrice = getCurrencyPrice(sendCurrency);
    const receivePrice = getCurrencyPrice(receiveCurrency);
    if (!sendPrice || !receivePrice) return;
    return (
      <Typography fontWeight={600} fontSize={22}>
        1 {sendCurrency} ={" "}
        <span style={{ color: "#008026" }}>{sendPrice / receivePrice}</span>{" "}
        {receiveCurrency}
      </Typography>
    );
  };

  const handleSwitch = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
    const sendPrice = getCurrencyPrice(receiveCurrency);
    const receivePrice = getCurrencyPrice(sendCurrency);
    if (!sendPrice || !receivePrice) return;
    setReceiveAmount(
      formatNumberToLocaleString(
        (parseNumberFromString(sendAmount) * sendPrice) / receivePrice
      )
    );
  };

  return (
    <CalculatorContainer>
      <Typography variant="h3">Currency Swap 🔁</Typography>
      {isFetching ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: {
              lg: 2,
              xs: 0,
            },
            alignItems: "center",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
          }}
        >
          <CurrencyInput
            label="Amount to send"
            value={sendAmount}
            onChange={onChangeSendAmount}
            currency={sendCurrency}
            items={priceItems}
            onChangeCurrency={onChangeSendCurrency}
          />

          <IconButton sx={{ mt: 2 }} onClick={handleSwitch}>
            <SwitchIcon />
          </IconButton>

          <CurrencyInput
            label="Amount to receive"
            value={receiveAmount}
            onChange={onChangeReceiveAmount}
            currency={receiveCurrency}
            items={priceItems}
            onChangeCurrency={onChangeReceiveCurrency}
          />
        </Box>
      )}
      {renderCurrencyExchange()}
    </CalculatorContainer>
  );
}

export default CalculatorBox;
