import countries from "./countries.json";

export interface CountryInfo {
  name: string;
  fullName: string;
  flag: string;
}

/**
 * Asynchronously fetches country information based on the provided country name.
 * Supports request cancellation via AbortSignal.
 *
 * @param {string} countryName - The name of the country to search for.
 * @param {AbortSignal} [signal] - Optional AbortSignal to cancel the request.
 * @return {Promise<CountryInfo[]>} A promise that resolves with an array of matching country information.
 */
export function getCountryByName(countryName: string, signal?: AbortSignal): Promise<CountryInfo[]> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (typeof countryName !== "string" || !countryName) {
        resolve([]);
        return;
      }

      const searchText = countryName.toLocaleLowerCase();

      const filteredCountries = countries.filter(
        (x) =>
          x.name.toLocaleLowerCase().startsWith(searchText) ||
          x.fullName.toLocaleLowerCase().startsWith(searchText)
      );

      resolve(filteredCountries);
    }, getRandom(100, 800));

    // Set up request cancellation
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
