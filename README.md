# Currency Converter

Using the public Frankfurter API, I built a front-end React web app with a currency converter for up to 30 different currencies. The user can select the two different currencies and input the amount they want to convert.

There is a seperate page which lists each currency name and code and links to a graph of the past exchange rates for each currency (the graph is still in production). This page also allows you to set a base currency and get the exchange rate for each listed currency.

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

Once I decided on what I wanted to do for my project, I started researching APIs to ensure that I could find one that would include the data I needed. I ended up choosing Frankfurter API. While it has a limited number of currencies compared to others, it allows you umlimited requests and includes the historical data for each currency.

I then wireframed the functionality of my web app. This helped me to identifty my core requirements for the project as well make a plan for the individual components I might need.

<p align='center'>
<img alt='Excalidraw plan' style='width: 550px' src='https://i.imgur.com/FMX9zN9.png'>
</p>

#### Stage Two: Core Requirements

- A currency converter that allowed the user to input the amount they wanted to convert and to select the two currencies from the available options.
- A currencies page that includes a list of all currency names, currency codes, and the exchange rate for each one based on the user selected base currency.
- The ability to search the list of currencies and filter out the ones that don't match the search characters.

#### Stage Three: Stretch Goals

Unfortunatley I didn't have the time to meet my stretch goals but you can see them listed in Stage Four. Instead of the stretch goals, any extra time I had during the week went towards polishing up the core requirements. This included:

- Refactoring code to be easier to understand and more succinct.
- Setting up the search bar to search for currency name, currency code and to take into account the user searching in lowercase.
- Identifying and resloving errors resulting from the API used. For example when the user selects the same currency for the base and the convertTo currency.

```javascript
catch (e) {
      setShowError(true);
      if (conversionData.base === conversionData.convertTo) {
        setErrorMessage(
          "You've selected the same currencies, please choose different currencies and try again."
        );
        setOneToOneConversionText("");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
```

#### Stage Four: With More Time...

With more time, I would like to:

- Make the conversion happen with onChange and not onSubmit.
- Add the historical exchange rate data with a visual graph.

## The Wins

Refactoring my code to reduce repetition and make it more acccessible. For example, I created a helper-functions file which included different functions that could be used within different pages and components. One of these functions, the getOneToOneConversion() is called in the CurrencyDetails component when the user sets the baseCurrency as well as the Converter component.

```javascript
export const getOneToOneConversion = async (
  baseCurrency,
  convertToCurrency,
  setOneToOneConversionText,
  setShowConversionError,
  setConversionErrorMessage
) => {
  try {
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
    setShowConversionError(false);
  } catch (e) {
    setShowConversionError(true);
    if (baseCurrency === convertToCurrency) {
      setConversionErrorMessage(`1 ${baseCurrency} = 1 ${convertToCurrency} `);
    }
  }
};
```

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

- The importance of version control. I refactored a good portion of my code, which always involved breaking it. Because I regulary commited and pushed my work I was able to confidently refactor with the knowledge that I had a 'useable' version to revert to if my amendments weren't successful.
