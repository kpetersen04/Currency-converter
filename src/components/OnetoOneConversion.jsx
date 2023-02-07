// const GetOneToOneConversion = async () => {
//   try {
//     const { data } = await axios.get(
//       `${API_URL}/latest?amount=1&from=${conversionData.base}&to=${conversionData.convertTo}`
//     );
//     console.log(data);
//     const { rates } = data;
//     const oneToOneConversionRate = Object.values(rates).toString();
//     setOneToOneConversionText(
//       `${data.amount} ${conversionData.base} = ${oneToOneConversionRate} ${conversionData.convertTo} `
//     );
//     console.log(oneToOneConversionText);
//   } catch {
//     console.log(e);
//   }
// };
// export default GetOneToOneConversion;
