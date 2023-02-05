import Header from "../components/Header";
import Converter from "../components/Converter";

const LandingPage = () => {
  return (
    <div className="page">
      <Header />
      <h2>This is the landing page</h2>
      <Converter />
    </div>
  );
};

export default LandingPage;
