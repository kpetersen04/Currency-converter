import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../const";

export const fetchData = async (setCountryInfo) => {
  try {
    const { data } = await axios.get(`${API_URL}/currencies`);
    setCountryInfo(data);
  } catch (e) {
    console.log(e);
  }
};

export const getOneToOneConversion = async (
  baseCurrency,
  convertToCurrency,
  setOneToOneConversionText
) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/latest?amount=1&from=${baseCurrency}&to=${convertToCurrency}`
    );
    console.log(data);
    const { rates } = data;
    const oneToOneConversionRate = Object.values(rates).toString();
    setOneToOneConversionText(
      `${data.amount} ${baseCurrency} = ${oneToOneConversionRate} ${convertToCurrency} `
    );
  } catch (e) {
    console.log(e);
  }
};
