import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../const";
import Header from "../components/Header";
import CurrencyDetails from "../components/CurrencyDetails";

const Currencies = () => {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [displayCurrencies, setDisplayCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/currencies`);
      const dataArray = Object.entries(data).map(([code, currencyName]) => {
        return { code, currencyName };
      });
      setAllCurrencies(dataArray);
      setDisplayCurrencies(dataArray);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onBaseChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    const filterCountries = allCurrencies.filter(
      (currency) =>
        currency.currencyName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        currency.code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayCurrencies(filterCountries);
  };

  return (
    <div className=" page currencies-page">
      <Header />

      <div className="currencies-page__top-options-section">
        <h2 className="title">Browse all Currencies</h2>
        <input
          className="currencies-page__search-bar"
          type="search"
          name="search"
          placeholder="Search for..."
          value={search}
          onChange={onSearchChange}
        ></input>
        <select
          className="currencies-page__base-selector"
          name="base"
          id="currency-select"
          onChange={onBaseChange}
        >
          <option>Select your base rate</option>
          {allCurrencies.map(({ code, currencyName }) => (
            <option key={currencyName} value={code} name="base">
              {currencyName}
            </option>
          ))}
        </select>
      </div>
      <ul className="currencies-page__cards-container">
        {displayCurrencies.map(({ code, currencyName }) => (
          <CurrencyDetails
            code={code}
            currencyName={currencyName}
            baseCurrency={baseCurrency}
            key={code}
          />
        ))}
      </ul>
    </div>
  );
};
export default Currencies;
