const convertCurrency = (amount, source, target) => {
  var exchangeRates = {
    $: 1,
    "£": 0.73,
    "¥": 110.15,
    C$: 1.26,
    A$: 1.37,
    S$: 1.34,
    元: 6.38,
    "₿": 0.000021,
  };
  return (amount / exchangeRates[source]) * exchangeRates[target];
};
export default convertCurrency;
