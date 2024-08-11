import { action, makeAutoObservable, runInAction } from 'mobx';
import { getCountryByName, CountryInfo } from '../api/apiService';

export class AutocompleteViewModel {
    // Current value of the input
    value: string = '';
    // List of suggestions
    suggestions: CountryInfo[] = [];
    // Maximum number of suggestions to display
    maxSuggestions: number;
    // Timer for debouncing the suggestions update
    private debounceTimeout: NodeJS.Timeout | null = null;
    // Controller for cancelling the current request
    private currentRequest: AbortController | null = null;

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
     * Sets the value of the AutocompleteViewModel and triggers a debounced update of suggestions.
     *
     * @param {string} newValue - The new value to set.
     * @return {void} This function does not return anything.
     */
    setValue(newValue: string): void {
        this.value = newValue;
        this.debouncedUpdateSuggestions();
    }

    // Debounces the suggestions update to prevent excessive API calls
    private debouncedUpdateSuggestions(): void {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = setTimeout(() => {
            this.updateSuggestions();
        }, 300); // 300ms delay
    }

    /**
     * Asynchronously updates the suggestions based on the current value.
     * Cancels any ongoing request before making a new one.
     *
     * @return {Promise<void>} A promise that resolves when the suggestions are updated.
     */
    async updateSuggestions(): Promise<void> {
        if (this.currentRequest) {
            this.currentRequest.abort(); // Cancel the previous request
        }

        if (this.value.length > 0) {
            this.currentRequest = new AbortController();
            try {
                const allSuggestions = await getCountryByName(this.value, this.currentRequest.signal);
                runInAction(() => {
                    this.suggestions = allSuggestions.slice(0, this.maxSuggestions);
                });
            } catch (error) {
                // Check if error is an instance of Error before accessing its properties
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Error fetching suggestions:', error);
                }
            } finally {
                this.currentRequest = null;
            }
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