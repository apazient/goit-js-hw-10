import './css/styles.css';
import Debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;

let userData;
const refs = getRefs();

refs.inputSearch.addEventListener(
  `input`,
  Debounce(onFilterCountry, DEBOUNCE_DELAY)
);


function onFilterCountry(event) {


  userData = event.target.value.trim()
  if (!userData) {
    clear(refs.list)
    clear(refs.cardContainer)
    return;
  }
  fetchCountries(userData)
    .then(country => {
      if (country.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
       renderedMarkup(country)
    })    
        .catch(() => {
          Notify.failure('Oops, there is no country with that name!');
          return;
        });
    }

function countryCard(country) {
  return country
    .map(({ flags, name, capital, population, languages }) => {
      return `<h2 class="country-info__title"><img src="${
        flags.svg
      }" class= "img" width=30 height=20 alt="${name.offizial}">${
        name.common 
      }</h2>
        <p class="country-info__el">Capital: <span>${capital[0]}</span></p>
        <p class="country-info__el">Population: <span>${population}</span></p>
        <p class="country-info__el">Languages: <span>${Object.values(
          languages
        )}</span></p>`;
    })
    .join(``);
}
function countryList(country) {
  return country
    .map(({ flags, name }) => {
      return `<li class="country-item"> <img src="${
        flags.svg
      }" class= "img" width=30 height=20 alt="${name.offizial}">
      ${name.common }</li>`;
    })
    .join(``);
}
function renderedMarkup(country) {
    if (country.length >= 2 && country.length <= 10) {
        const markup = countryList(country);
        clear(refs.list)
        clear(refs.cardContainer)
       
 refs.list.insertAdjacentHTML(`beforeend`, markup); 
      
  }
  if (country.length === 1) { 
       clear(refs.cardContainer)
        clear(refs.list)
         const markup = countryCard(country);
       refs.cardContainer.insertAdjacentHTML(`beforeend`, markup);
 } 
}

function clear(item) {
  item.innerHTML = ``;
}
