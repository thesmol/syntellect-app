# Syntellect Test Task

This repository contains the implementation of a test task that includes developing two control components using the MobX state management library and the MVVM design pattern. Below is a detailed explanation of the project structure, setup, and usage instructions.

## Project Structure

```
syntellect-app/
├── src/
│   ├── App.tsx
│   ├── api/
│   │   └── apiService.ts
│   ├── components/
│   │   ├── AutocompleteControl.tsx
│   │   └── TextControlWithButtons.tsx
│   ├── index.tsx
│   ├── models/
│   │   ├── AutocompleteViewModel.ts
│   │   ├── ButtonConfig.ts
│   │   └── TextControlViewModel.ts
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── package.json
├── tsconfig.json
├── README.md
└── ... (other config files)
```

## Components

### TextControlWithButtons

This component renders a text input with customizable buttons on the left and right sides. The buttons can have custom text and callback functions, which are triggered upon clicking.

#### Example Usage

1. Control with 2 buttons on the right:
    - First button clears the input.
    - Second button sets the input text to 'Hello world!'.

2. Control with 1 button on the right and 1 on the left:
    - Right button shows an alert with the text from the input.
    - Left button checks if the input is a number, and if so, shows an alert with the number.

### AutocompleteControl

This component provides an input field with autocomplete functionality. It fetches and displays suggestions based on user input, and updates the input value when a suggestion is selected. Each suggestion includes a name, full name, and flag.

#### Example Usage

1. Control with a maximum of 3 suggestions.
2. Control with a maximum of 10 suggestions.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd syntellect-app
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Code Overview

### `src/App.tsx`

The main application component sets up two instances of `TextControlWithButtons` and two instances of `AutocompleteControl` with different configurations.

### `src/api/apiService.ts`

Contains a mock API service that simulates fetching country data by name. The response includes country name, full name, and flag.

### `src/components/AutocompleteControl.tsx`

The `AutocompleteControl` component handles the rendering of the input field and suggestions list, using MobX for state management.

### `src/components/TextControlWithButtons.tsx`

The `TextControlWithButtons` component manages the text input and associated buttons, utilizing MobX to manage the input value.

### `src/models/AutocompleteViewModel.ts`

Defines the MobX view model for the `AutocompleteControl` component, including actions for updating the input value and fetching suggestions.

### `src/models/ButtonConfig.ts`

Defines the interface for button configuration, including button text and click handler.

### `src/models/TextControlViewModel.ts`

Defines the MobX view model for the `TextControlWithButtons` component, including actions for setting and clearing the input value.

## Styling

Basic styling is applied using CSS modules. Styles are defined in the corresponding `.module.css` files within the `src/components` directory.

## Conclusion

This project demonstrates the implementation of two control components with customizable buttons and autocomplete functionality using React and MobX. The MVVM pattern is employed to manage state and business logic efficiently.
