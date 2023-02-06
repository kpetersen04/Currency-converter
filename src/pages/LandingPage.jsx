import Header from "../components/Header";
import Converter from "../components/Converter";

const LandingPage = () => {
  return (
    <div className="page">
      <Header />
      <h2>Currency Converter</h2>
      <Converter />
    </div>
  );
};

export default LandingPage;
