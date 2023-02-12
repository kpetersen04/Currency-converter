import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../const";
import { fetchData, getOneToOneConversion } from "../utils/helper-functions";

const Converter = () => {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [conversionData, setConversionData] = useState({
    amount: "",
    amountConverted: "",
    base: "",
    convertTo: "",
  });
  const [oneToOneConversionText, setOneToOneConversionText] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConversionError, setShowConversionError] = useState(false);
  const [conversionErrorMessage, setConversionErrorMessage] = useState("");

  useEffect(() => {
    fetchData(setAllCurrencies, setShowError, setErrorMessage);
  }, []);

  const onChange = (e) => {
    setConversionData({ ...conversionData, [e.target.name]: e.target.value });
  };

  const onSubmitExchange = async (e) => {
    e.preventDefault();
    try {
      if (conversionData.base === conversionData.convertTo) {
        setShowError(true);
        setErrorMessage(
          "You've selected the same currencies, please choose different currencies and try again."
        );
        setOneToOneConversionText("");
      } else {
        const { data } = await axios.get(
          `${API_URL}/latest?amount=${conversionData.amount}&from=${conversionData.base}&to=${conversionData.convertTo}`
        );
        const { rates } = data;
        const numb = Object.values(rates);
        setConversionData({ ...conversionData, amountConverted: numb });

        getOneToOneConversion(
          conversionData.base,
          conversionData.convertTo,
          setOneToOneConversionText,
          setShowConversionError,
          setConversionErrorMessage
        );
        setShowError(false);
      }
    } catch (e) {
      setShowError(true);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="converter-container">
        {showError && (
          <div className="error">
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <form onSubmit={onSubmitExchange}>
          <section className="converter-container__form-inputs">
            <div className="converter-container__currency-one">
              <p>Amount</p>
              <input
                type="text"
                placeholder="1000"
                onChange={onChange}
                value={conversionData.amount}
                name="amount"
              ></input>
              <select name="base" id="currency-select" onChange={onChange}>
                <option value="">Select a Currency</option>
                {allCurrencies.map(({ code, currencyName }) => (
                  <option key={code} value={code} name="base">
                    {currencyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="converter-container__currency-two">
              <p className="converter-container__convert-text">Converted to</p>
              <input
                type="text"
                placeholder="1000"
                readOnly
                value={conversionData.amountConverted}
                name="amount"
              ></input>
              <select name="convertTo" id="currency-select" onChange={onChange}>
                <option value="">Select a Currency</option>
                {allCurrencies.map(({ code, currencyName }) => (
                  <option key={code} value={code} name="code">
                    {currencyName}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className="converter-container__button-conversion-container">
            <div className="converter-container__one-to-one-conversion-container">
              <p className="converter-container__result">
                {oneToOneConversionText}
              </p>
            </div>
            <button>Convert</button>
          </section>
        </form>
      </div>
    </>
  );
};

export default Converter;
