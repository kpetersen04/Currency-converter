import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneToOneConversion } from "../utils/helper-functions";

const CurrencyDetails = ({ code, currencyName, baseCurrency }) => {
  const [oneToOneConversionText, setOneToOneConversionText] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (baseCurrency) {
      getOneToOneConversion(
        baseCurrency,
        code,
        setOneToOneConversionText,
        setShowError,
        setErrorMessage
      );
    }
  }, [baseCurrency]);

  return (
    <li className="currencies-page__country-details">
      <p className="currencies-page__currency-name">{currencyName}</p>
      <p>{code}</p>
      {showError ? (
        <p className="currencies-page__error">{errorMessage}</p>
      ) : (
        <p className="currencies-page__one-to-one-text">
          {oneToOneConversionText}
        </p>
      )}
      <Link to="/currencies/historical-data">
        <button className="currencies-page__link">Historical Data</button>
      </Link>
    </li>
  );
};

export default CurrencyDetails;
