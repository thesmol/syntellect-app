import { makeAutoObservable } from 'mobx';

export class TextControlViewModel {
    value: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Sets the value of the TextControlViewModel.
     *
     * @param {string} newValue - The new value to set.
     */
    setValue(newValue: string) {
        this.value = newValue;
    }

    /**
     * Clears the value of the TextControlViewModel.
     */
    clear() {
        this.value = '';
    }
}