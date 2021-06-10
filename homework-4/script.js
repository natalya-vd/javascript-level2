//Решение задачи 1

const replacingQuotation = /'{1}/g;

const text = "It's a 'well-known fact' that the geographical position very often influences the 'climate and weather' of any country.";

console.log(text)
console.log(text.replace(replacingQuotation, '"'));

//Решение задачи 2

const replacingQuotationNew = /(\b'{1}\B|\B'{1}\b)/g;

console.log(text.replace(replacingQuotationNew, '"'));