import React from 'react';
import { observer } from 'mobx-react-lite';
import { TextControlViewModel } from '../models/TextControlViewModel';
import { ButtonConfig } from '../models/ButtonConfig';
import styles from './TextControlWithButtons.module.css';

interface TextControlWithButtonsProps {
    viewModel: TextControlViewModel;
    leftButtons?: ButtonConfig[];
    rightButtons?: ButtonConfig[];
}

const TextControlWithButtons: React.FC<TextControlWithButtonsProps> = observer(({ viewModel, leftButtons, rightButtons }) => {
    return (
        <div className={styles.textControlWithButtons}>
            {leftButtons && leftButtons.map((button, index) => (
                <button key={`left-${index}`} onClick={button.onClick}>{button.text}</button>
            ))}
            <input
                type="text"
                value={viewModel.value}
                onChange={(e) => viewModel.setValue(e.target.value)}
            />
            {rightButtons && rightButtons.map((button, index) => (
                <button key={`right-${index}`} onClick={button.onClick}>{button.text}</button>
            ))}
        </div>
    );
});

export default TextControlWithButtons;