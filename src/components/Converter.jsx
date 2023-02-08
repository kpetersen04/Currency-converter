// import { InputUnstyled } from "@mui/base";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../const";
import { fetchData, getOneToOneConversion } from "../utils/helper-functions";

const Converter = () => {
  const [countryInfo, setCountryInfo] = useState({});

  const [conversionData, setConversionData] = useState({
    amount: "",
    base: "",
    convertTo: "",
  });

  const [exchangedAmount, setExchangedAmount] = useState("");
  const [oneToOneConversionText, setOneToOneConversionText] = useState("");

  useEffect(() => {
    fetchData(setCountryInfo, setConversionData);
  }, []);

  const onChange = (e) => {
    console.log("Change");
    setConversionData({ ...conversionData, [e.target.name]: e.target.value });
  };

  const onSubmitExchange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${API_URL}/latest?amount=${conversionData.amount}&from=${conversionData.base}&to=${conversionData.convertTo}`
      );
      const { rates } = data;
      const numb = Object.values(rates).toString();
      setExchangedAmount(numb);
      getOneToOneConversion(
        conversionData.base,
        conversionData.convertTo,
        setOneToOneConversionText
      );
    } catch (e) {
      console.log(e);
    }
  };
  // baseRate: "",
  // convertToRate: "",
  // const [returnedRates, setReturnedRates] = useState({
  // const getRates = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${API_URL}/latest?to=${conversionData.base},${conversionData.convertTo}`
  //     );
  //     const { rates } = data;
  //     const baseRate = rates[conversionData.base];
  //     const convertToRate = rates[conversionData.convertTo];
  //     console.log(baseRate);
  //     console.log(convertToRate);
  //     setConversionData({
  //       ...conversionData,
  //       baseRate,
  //       convertToRate,
  //     });
  //     console.log(conversionData);
  //   } catch {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <div className="converter-container">
        <h2>Currency Converter</h2>
        <form onSubmit={onSubmitExchange}>
          <div className="converter-container_currency-one">
            <p>Amount</p>
            <input
              type="text"
              placeholder="1000"
              onChange={onChange}
              value={conversionData.amount}
              name="amount"
            ></input>
            {/* <CountryNameDropDown /> */}
            <select name="base" id="currency-select" onChange={onChange}>
              <option value="">Select a Currency</option>
              {Object.entries(countryInfo).map(([currencyName]) => (
                <option key={currencyName} value={currencyName} name="base">
                  {countryInfo[currencyName]}
                </option>
              ))}
            </select>
          </div>
          <div className="converter-container_currency-two">
            <p>Convert to</p>
            <input
              type="text"
              placeholder="1000"
              readOnly
              value={exchangedAmount}
              name="amount"
            ></input>
            <select name="convertTo" id="currency-select" onChange={onChange}>
              <option value="">Select a Currency</option>
              {Object.entries(countryInfo).map(([code]) => (
                <option key={code} value={code} name="base">
                  {countryInfo[code]}
                </option>
              ))}
            </select>
          </div>
          <button>Submit</button>
        </form>
        <div className="one-to-one-conversion-container">
          <p className="result">{oneToOneConversionText}</p>
        </div>
      </div>
    </>
  );
};

export default Converter;
