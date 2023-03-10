import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../const";

export const fetchData = async (
  setAllCurrencies,
  setDisplayCurrencies,
  setShowError,
  setErrorMessage
) => {
  try {
    const { data } = await axios.get(`${API_URL}/currencies`);
    const dataArray = Object.entries(data).map(([code, currencyName]) => {
      return { code, currencyName };
    });
    setAllCurrencies(dataArray);
    setDisplayCurrencies(dataArray);
    setShowError(false);
  } catch (e) {
    setShowError(true);
    setErrorMessage("Data can't be retrieved. Please try again later");
  }
};

export const getOneToOneConversion = async (
  baseCurrency,
  convertToCurrency,
  setOneToOneConversionText,
  setShowConversionError,
  setConversionErrorMessage
) => {
  try {
    if (baseCurrency === convertToCurrency) {
      setShowConversionError(true);
      setConversionErrorMessage(`1 ${baseCurrency} = 1 ${convertToCurrency} `);
    } else {
      setShowConversionError(false);
      const { data } = await axios.get(
        `${API_URL}/latest?amount=1&from=${baseCurrency}&to=${convertToCurrency}`
      );
      const { rates } = data;
      const oneToOneConversionRate = Object.entries(rates).map(
        ([code, conversionRate]) => {
          return conversionRate;
        }
      );
      setOneToOneConversionText(
        `${data.amount} ${baseCurrency} = ${oneToOneConversionRate} ${convertToCurrency} `
      );
    }
  } catch (e) {
    setShowConversionError(true);
    setConversionErrorMessage("Unable to provide the exchange rate.");
  }
};
