import Header from "../components/Header";
import Chart from "../components/Chart";

const HistoricalDataPage = () => {
  return (
    <div className="page">
      <Header />
      <h1 className="title">Exchange Rate Over Time</h1>
      <section>
        <Chart />
      </section>
    </div>
  );
};

export default HistoricalDataPage;
