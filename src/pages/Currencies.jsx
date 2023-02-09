import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../const";
import Header from "../components/Header";
import CountryDetails from "../components/CountryDetails";

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
    const filterCountries = allCurrencies.filter((currency) =>
      currency.currencyName.includes(e.target.value)
    );
    setDisplayCurrencies(filterCountries);
  };
  console.log(search);

  return (
    <div className="currencies-page">
      <Header />
      <div className="currencies-page__top-options-section">
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
      <div className="currencies-page__country-card">
        {displayCurrencies.map(({ code, currencyName }) => (
          <CountryDetails
            code={code}
            currencyName={currencyName}
            baseCurrency={baseCurrency}
          />
        ))}
      </div>
    </div>
  );
};
export default Currencies;
