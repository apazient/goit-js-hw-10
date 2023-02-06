// import { Notify } from 'notiflix';
const BASE_URL = `https://restcountries.com/v3.1/name`;

export const fetchCountries = name => {
  return fetch(`${BASE_URL}/${name}`).then(r => {
    if (r.ok) {
      return r.json();
      }
      throw new Error((error));
    
  });
};
