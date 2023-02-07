import axios from "axios";
import { API_URL } from "../const";

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
  } catch {
    console.log(e);
  }
};
