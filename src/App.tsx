import { TextControlViewModel } from './models/TextControlViewModel';
import { AutocompleteViewModel } from './models/AutocompleteViewModel';
import TextControlWithButtons from './components/TextControlWithButtons';
import AutocompleteControl from './components/AutocompleteControl';
import styles from './App.module.css';

function App() {
  const textControl1 = new TextControlViewModel();
  const textControl2 = new TextControlViewModel();
  const autocomplete1 = new AutocompleteViewModel(3);
  const autocomplete2 = new AutocompleteViewModel(10);

  return (
    <div className={styles.app}>
      <h2 className={styles.sectionTitle}>Text Control with Buttons</h2>
      <TextControlWithButtons
        viewModel={textControl1}
        rightButtons={[
          { text: 'Clear', onClick: () => textControl1.clear() },
          { text: 'Hello', onClick: () => textControl1.setValue('Hello world!') },
        ]}
      />

      <TextControlWithButtons
        viewModel={textControl2}
        leftButtons={[
          {
            text: 'Check Number',
            onClick: () => {
              const value = textControl2.value;
              if (!isNaN(Number(value))) {
                alert(value);
              } else {
                alert('Not a number');
              }
            },
          },
        ]}
        rightButtons={[
          { text: 'Alert', onClick: () => alert(textControl2.value) },
        ]}
      />

      <h2 className={styles.sectionTitle}>Autocomplete Control</h2>
      <AutocompleteControl viewModel={autocomplete1} />
      <AutocompleteControl viewModel={autocomplete2} />
    </div>
  );
}

export default App;
