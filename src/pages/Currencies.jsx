import Header from "../components/Header";
import CountryCard from "../components/CountryCard";

const Currencies = () => {
  return (
    <>
      <Header />
      <h2>This will show all the currencies</h2>
      <input placeholder="Currency Name Search"></input>
      <p>Change the base rate by selecting a diffferent currency</p>
      <select>
        <option>Set base rate</option>
      </select>
      <CountryCard />
    </>
  );
};

export default Currencies;
