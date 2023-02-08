import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../const";
import Header from "../components/Header";
import { fetchData, getOneToOneConversion } from "../utils/helper-functions";

const Currencies = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [conversionData, setConversionData] = useState({
    amount: "",
    base: "",
    convertTo: "",
  });
  const [oneToOneConversionText, setOneToOneConversionText] = useState("");

  const [search, setSearch] = useState("");
  const [filteredCurrenices, setfilteredCurrenices] = useState([]);
  const [filteredCurrencyCode, setfilteredCurrencyCode] = useState([]);

  useEffect(() => {
    fetchData(setCountryInfo, setConversionData);
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  //   console.log("change");
  //   setConversionData({
  //     ...conversionData,
  //     [e.target.name]: e.target.value,
  //     convertTo: currencyName,
  //   });
  //   // -->I need to set the base to the code of the countries - the above is only updating the base currency
  //   getOneToOneConversion(
  //     conversionData.base,
  //     conversionData.convertTo,
  //     setOneToOneConversionText
  //   );
  //   const currenceyCode = Object.key(countryInfo).map(
  //     (currencyName) => countryInfo[currencyName]
  //   );
  //   const filteredCurrencyCode = this.state.currencyCode.filter((currency) =>
  //     currency.name.toLowerCase().includes(search.toLowerCase())
  //   );

  //   this.setSearch(filteredCurrencyCode);
  // };

  // const filteredCountries = countryInfo.filter((country) => {
  //   return searchParams.some((newCountryInfo) => country[newCountryInfo]);
  // });
  // const filterCountries = () => {};
  // If the search input matches the countryInfo value than make that country card appendOwnerState, otherwise hide it
  // };

  // console.log(conversionData);
  return (
    <div className="page currencies-page">
      <Header />
      <input
        className="currencies-page_search-bar"
        type="search"
        name="search"
        placeholder="Search for..."
        value={search}
        onChange={onChange}
      ></input>
      {/* const filterCountries ={" "}
      {Object.keys(countryInfo).filter((key) => {
        return key.includes(search).reduce();
      })} */}
      <p>Change the base rate by selecting a diffferent currency</p>
      <select name="base" id="currency-select">
        <option>Set base rate</option>
        {Object.entries(countryInfo).map(([code, currencyName]) => (
          <option key={currencyName} value={code} name="base">
            {currencyName}
          </option>
        ))}
      </select>
      <div className="currencies-page__country-card">
        {Object.entries(countryInfo).map(([code, currencyName]) => (
          <ul className="currencies-page__country-details" key={code}>
            <li>{currencyName}</li>
            <li>{code}</li>
            <li>{oneToOneConversionText}</li>
            <button>Historical Data</button>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Currencies;
