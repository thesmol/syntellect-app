import { action, makeAutoObservable, runInAction } from 'mobx';
import { getCountryByName, CountryInfo } from '../api/apiService';

export class AutocompleteViewModel {
    value: string = '';
    suggestions: CountryInfo[] = [];
    maxSuggestions: number;

    /**
     * Initializes a new instance of the AutocompleteViewModel class with the specified maximum number of suggestions.
     *
     * @param {number} maxSuggestions - The maximum number of suggestions to display.
     */
    constructor(maxSuggestions: number) {
        this.maxSuggestions = maxSuggestions;
        makeAutoObservable(this, {
            setValue: action,
            updateSuggestions: action,
            selectSuggestion: action,
        });
    }

    /**
     * Sets the value of the AutocompleteViewModel and updates the suggestions.
     *
     * @param {string} newValue - The new value to set.
     * @return {void} This function does not return anything.
     */
    setValue(newValue: string): void {
        this.value = newValue;
        this.updateSuggestions();
    }

    /**
     * Asynchronously updates the suggestions based on the current value.
     * If the value is not empty, fetches all suggestions matching the value from the API and updates the suggestions list.
     * If the value is empty, clears the suggestions list.
     *
     * @return {Promise<void>} A promise that resolves when the suggestions are updated.
     */
    async updateSuggestions(): Promise<void> {
        if (this.value.length > 0) {
            const allSuggestions = await getCountryByName(this.value);
            runInAction(() => {
                this.suggestions = allSuggestions.slice(0, this.maxSuggestions);
            });
        } else {
            this.suggestions = [];
        }
    }

    /**
     * Selects a suggestion and updates the value and suggestions list.
     *
     * @param {CountryInfo} suggestion - The suggestion to select.
     * @return {void} This function does not return anything.
     */
    selectSuggestion(suggestion: CountryInfo): void {
        this.value = suggestion.name;
        this.suggestions = [];
    }
}