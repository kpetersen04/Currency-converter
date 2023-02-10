import Header from "../components/Header";
import Chart from "../components/Chart";

const HistoricalDataPage = () => {
  return (
    <div className="page">
      <Header />
      <h1>This will show the graphs, hopefully!</h1>
      <body>
        <Chart />
      </body>
    </div>
  );
};

export default HistoricalDataPage;
