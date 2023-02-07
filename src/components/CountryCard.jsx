// import { useState, useEffect, Fragment } from "react";
// import axios from "axios";
// import { API_URL } from "../const";

// const CountryCard = () => {
//   const [countryInfo, setCountryInfo] = useState({});
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/currencies`);
//         setCountryInfo(data);
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {Object.entries(countryInfo).map(([key, value]) => (
//         <ul key={key}>
//           <li>{value}</li>
//           <li>{key}</li>
//           <li>One to One Rate - NEEDS UPDATING</li>
//           <button>Historical Data</button>
//         </ul>
//       ))}
//     </div>
//   );
// };

// export default CountryCard;
