import { InputUnstyled } from "@mui/base";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../const";

const Converter = () => {
  const [countryInfo, setCountryInfo] = useState({});

  const [conversionData, setConversionData] = useState({
    amount: "",
    base: "",
    convertTo: "",
  });

  const [exchangedAmount, setExchangedAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/currencies`);
        setCountryInfo(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  console.log(conversionData);

  const onChange = (e) => {
    console.log("Change");
    setConversionData({ ...conversionData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${API_URL}/latest?amount=${conversionData.amount}&from=${conversionData.base}&to=${conversionData.convertTo}`
      );
      const { rates } = data;
      const numb = Object.values(rates).toString();
      setExchangedAmount(numb);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="converter-container">
        <form onSubmit={onSubmit}>
          <div className="converter-container_currency-one">
            <input
              type="text"
              placeholder="1000"
              onChange={onChange}
              value={conversionData.amount}
              name="amount"
            ></input>
            <select name="base" id="currency-select" onChange={onChange}>
              <option value="">Select a Currency</option>
              {Object.keys(countryInfo).map((key) => (
                <option key={key} value={key} name="base">
                  {countryInfo[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="converter-container_currency-two">
            <input
              type="text"
              placeholder="1000"
              // onChange={onChange}
              readOnly
              value={exchangedAmount}
              name="amount"
            ></input>
            <select name="convertTo" id="currency-select" onChange={onChange}>
              <option value="">Select a Currency</option>
              {Object.keys(countryInfo).map((key) => (
                <option key={key} value={key} name="convertToCurrency">
                  {countryInfo[key]}
                </option>
              ))}
            </select>
          </div>
          <button>Submit</button>
        </form>
        <div className="one-one-conversion-container">
          <p>One to One Conversion will go here</p>
        </div>
      </div>
    </>
  );
};

export default Converter;
