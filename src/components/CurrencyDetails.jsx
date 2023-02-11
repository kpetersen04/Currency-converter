import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneToOneConversion } from "../utils/helper-functions";

const CurrencyDetails = ({ code, currencyName, baseCurrency }) => {
  const [oneToOneConversionText, setOneToOneConversionText] = useState("");
  const [showConversionError, setShowConversionError] = useState(false);
  const [conversionErrorMessage, setConversionErrorMessage] = useState("");

  useEffect(() => {
    getOneToOneConversion(
      baseCurrency,
      code,
      setOneToOneConversionText,
      setShowConversionError,
      setConversionErrorMessage
    );
  }, [baseCurrency]);

  return (
    <li className="currencies-page__country-details">
      <p className="currencies-page__currency-name">{currencyName}</p>
      <p>{code}</p>
      {showConversionError ? (
        <p className="currencies-page__error">{conversionErrorMessage}</p>
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
