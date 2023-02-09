import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneToOneConversion } from "../utils/helper-functions";

const CountryDetails = ({ code, currencyName, baseCurrency }) => {
  const [oneToOneConversionText, setOneToOneConversionText] = useState("");
  useEffect(() => {
    if (baseCurrency) {
      getOneToOneConversion(baseCurrency, code, setOneToOneConversionText);
    }
  }, [baseCurrency]);

  return (
    <ul className="currencies-page__country-details" key={code}>
      <li>{currencyName}</li>
      <li>{code}</li>
      <li className="currencies-page__one-to-one-text">
        {oneToOneConversionText}
      </li>
      <Link to="/currencies/historical-data">
        <button className="currencies-page__link">Historical Data</button>
      </Link>
    </ul>
  );
};

export default CountryDetails;
