import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../const";

const CountryCard = () => {
  const [countryInfo, setCountryInfo] = useState({});
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
    console.log(countryInfo);
  }, []);

  return (
    <div>
      {Object.entries(countryInfo).map(([key, value]) => (
        <ul key={key}>
          <li>{value}</li>
          <li>{key}</li>
          <li>
            <button>Historical Data</button>
          </li>
        </ul>
      ))}

      {/* {Object.enteries(currencies).map(([code, currency]) => {
        <ul key={code}>
          <li>{currency}</li>
          <li>{code}</li>
        </ul>;
      })} */}

      <p>Rate</p>
    </div>
  );
};

export default CountryCard;
