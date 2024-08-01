import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';
import { AutocompleteViewModel } from '../models/AutocompleteViewModel';
import styles from './AutocompleteControl.module.css';

interface AutocompleteControlProps {
    viewModel: AutocompleteViewModel;
}

const AutocompleteControl: React.FC<AutocompleteControlProps> = observer(({ viewModel }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [suggestionsPosition, setSuggestionsPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setSuggestionsPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [viewModel.suggestions]);

    const SuggestionsList = () => (
        <ul
            className={styles.suggestions}
            style={{
                position: 'absolute',
                top: suggestionsPosition.top,
                left: suggestionsPosition.left,
                width: suggestionsPosition.width,
            }}
        >
            {viewModel.suggestions.map((suggestion, index) => (
                <li key={index} className={styles.suggestionItem} onClick={() => viewModel.selectSuggestion(suggestion)}>
                    <img src={suggestion.flag} alt={`Flag of ${suggestion.name}`} />
                    <span className={styles.suggestionName}>{suggestion.name}</span>
                    <span className={styles.suggestionFullName}>{suggestion.fullName}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className={styles.autocompleteControl} ref={containerRef}>
            <input
                type="text"
                value={viewModel.value}
                onChange={(e) => viewModel.setValue(e.target.value)}
            />
            {viewModel.suggestions.length > 0 && ReactDOM.createPortal(
                <SuggestionsList />,
                document.body
            )}
        </div>
    );
});

export default AutocompleteControl;