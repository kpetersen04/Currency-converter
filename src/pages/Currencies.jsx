import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../const";
import Header from "../components/Header";
import { appendOwnerState } from "@mui/base";
// import { Params } from "react-router-dom";
// import CountryCard from "../components/CountryCard";
// import { Fragment } from "react";

const Currencies = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCurrenices, setfilteredCurrenices] = useState([]);
  const [filteredCurrencyCode, setfilteredCurrencyCode] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/currencies`);
        setCountryInfo(data);
        console.log(countryInfo);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
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
  };
  return (
    <Fragment>
      <Header />
      <input
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
      <select>
        <option>Set base rate</option>
        {Object.entries(countryInfo).map(([currencyName]) => (
          <option key={currencyName} value={currencyName} name="base">
            {countryInfo[currencyName]}
          </option>
        ))}
      </select>
      <div className="countryCard">
        {Object.entries(countryInfo).map(([code, currencyName]) => (
          <ul key={code}>
            <li>{currencyName}</li>
            <li>{code}</li>
            <li>One to One Rate - NEEDS UPDATING</li>
            <button>Historical Data</button>
          </ul>
        ))}
      </div>
    </Fragment>
  );
};
export default Currencies;
