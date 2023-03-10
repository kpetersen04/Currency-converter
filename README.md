# Currency Converter

For my second individual project, I used the public Frankfurter API to build a front-end React web app with a currency converter for up to 30 different currencies. The user can select two different currencies and input the amount they want to convert.

There is a separate page which lists each currency name and code and links to a graph of the past exchange rates for each currency (the graph is still in production). This page also allows the user to set a base currency and get the one to one exchange rate for each listed currency.

Check out the deployed [Currency Converter](https://musical-pothos-740b29.netlify.app/)

## Demo

<p>
<img width='400px' alt='LandingPage' src='https://i.imgur.com/uBfmXGP.png'>
<img width='398px' alt='AllCurrenciesPage' src='https://i.imgur.com/Cntxt86.png'>
</p>

## Tech Stack

React, Axios, JavaScript, HTML, CSS, Sass, Git, GitHub, Netlify

## Installation Instructions

- Clone or Download Repo
  - npm install --> npm run dev

## Project Overview

#### The Brief

The application was required to:

- Consume a public API
- Have multiple components
- Include wireframes that are designed before building the app
- Be deployed online
- Be completed within 1 week or about 20 course hours

#### Stage One: Planning

Once I decided on what I wanted to do for my project, I started researching APIs to ensure that I could find one that would include the data I needed. I ended up choosing Frankfurter API. While it has a limited number of currencies compared to others, it allows you unlimited requests and includes the historical data for each currency which would be needed for the graph of the past exchange rates.

I then wireframed the functionality of my web app. This helped me to identify my core requirements for the project as well as make a plan for the individual components I might need.

<p align='center'>
<img alt='Excalidraw plan' style='width: 550px' src='https://i.imgur.com/8vMDAfY.png'>
</p>

#### Stage Two: Core Requirements

My landing page included a ‘Header’ component which was used across all pages of the application and ‘Converter’ component that offered the ability for the user to select two different currencies and get their required conversion amount.

On each load or re-render of the application, I used my global fetchData function to set the allCurrencies array as well as any relevant error messages. If there were any issues obtaining the currency information from the API the user would be notified with an error message, otherwise they would be able to complete the required conversion as normal.

To obtain the data required for the conversion, I created a converstionData useState object which included the amount, amountConverted, base rate and the convertTo rate. By placing an onChange event listener on the currency form inputs I was able to update the converstionData state and use that information to request the most recent rates from the API and set the amountConverted to the relevant number provided by the API.

```javascript
const { data } = await axios.get(
  `${API_URL}/latest?amount=${conversionData.amount}&from=${conversionData.base}&to=${conversionData.convertTo}`
);
const { rates } = data;
const numb = Object.values(rates);
setConversionData({ ...conversionData, amountConverted: numb });
```

Along with allowing the user to get a conversion amount I wanted to automatically provide them with the one to one conversion rate for the two currencies they selected. I did this by calling the getOneToOneConversion function, which was included in a global helper-functions file, and included the relevant inputs for the required data as well as the setOneToOneConverstionText. The oneToOneConversionText would then be used to show the one to one rate to the user.

The second core requirement was an all currency page that includes a list of all currency names, codes and the exchange rate for each one based on the user selected base currency. The generic country information is obtained from the API on each render of the page and displayed automatically.

The user also has the ability to select a currency and get the one to one conversion for each listed currency. When the user selects a new currency an onChange event listener updates the baseCurrency state to the event target value. The CurrencyDetails component takes in the currency code, currencyName and baseCurrency as parameters and uses those within the global getOneToOneConversion function to return the one to one conversion rate. This function is called each time the baseCurrency is changed by the user.

#### Stage Three: Refactoring The Code

Any extra time I had during this project went towards polishing up the core requirements by:

- Refactoring code to be easier to understand and more succinct.
- Setting up the search bar to search for currency name, currency code and to take into account the user searching in lowercase.
- Identifying and resolving errors resulting from the API used.

For example when the user selects the same currency for the base and the convertTo currency on the landing page no conversion can be made from the API. In this case, I set the ErrorMessage to notify the user to select different currencies and then try again. I also set the OneToOneConverstionText to blank when this happened.

```javascript
const onSubmitExchange = async (e) => {
    e.preventDefault();
    try {
      if (conversionData.base === conversionData.convertTo) {
        setShowError(true);
        setErrorMessage(
          "You've selected the same currencies, please choose different currencies and try again."
        );
        setOneToOneConversionText("");
      }
```

#### Stage Four: Future Features

With more time, I would like to:

- Make the conversion happen with onChange and not onSubmit.
- Add the historical exchange rate data with a visual graph.

## The Wins

Refactoring my code to reduce repetition and make it more accessible. For example, I created a helper-functions file which included different functions that could be used within different pages and components. One of these functions, the getOneToOneConversion() is called in the CurrencyDetails component when the user sets the baseCurrency as well as the Converter component.

```javascript
export const getOneToOneConversion = async (
  baseCurrency,
  convertToCurrency,
  setOneToOneConversionText,
  setShowConversionError,
  setConversionErrorMessage
) => {
  try {
    if (baseCurrency === convertToCurrency) {
      setShowConversionError(true);
      setConversionErrorMessage(`1 ${baseCurrency} = 1 ${convertToCurrency} `);
    } else {
      setShowConversionError(false);
      const { data } = await axios.get(
        `${API_URL}/latest?amount=1&from=${baseCurrency}&to=${convertToCurrency}`
      );
      const { rates } = data;
      const oneToOneConversionRate = Object.entries(rates).map(
        ([code, conversionRate]) => {
          return conversionRate;
        }
      );
      setOneToOneConversionText(
        `${data.amount} ${baseCurrency} = ${oneToOneConversionRate} ${convertToCurrency} `
      );
    }
  } catch (e) {
    setShowConversionError(true);
    setConversionErrorMessage("Unable to provide the exchange rate.");
  }
};
```

## Challenges

I initially struggled with the search bar and using the filter array method but managed to get this working. My code ensured the user could search by currency name and code as well as taking into account individual user input style with the inclusion of the .toLowerCase().

```javascript
const onSearchChange = (e) => {
  setSearch(e.target.value);
  const filterCountries = allCurrencies.filter(
    (currency) =>
      currency.currencyName
        .toLowerCase()
        .includes(e.target.value.toLowerCase()) ||
      currency.code.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setDisplayCurrencies(filterCountries);
};
```

## Lessons Learned

- De-structuring the API data into the best possible format can have a big impact on my ability to produce quality code. At first, I used Object.values(data) to get all the values in the key value pairs returned by the API but I later changed this and converted the data into any array which made it much easier to access the information I needed.

- Project deployment on Netlify.

- The importance of version control. I refactored a good portion of my code, which always involved breaking it. Because I regularly committed and pushed my work I was able to confidently refactor with the knowledge that I had a 'usable' version to revert to if my amendments weren't successful.
