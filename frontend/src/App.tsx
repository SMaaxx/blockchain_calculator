import React, {useState} from 'react';
import styles from './App.module.scss'
import ButtonsBlock from "./ButtonsBlock/ButtonsBlock";

const App: React.FC  = () => {
  const [expression, setExpression] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const onChange = (event: string) => {
    const newValue = event.replace(/[^0-9.+\-*/ ]/g, '');
    setExpression(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.panel}>
          <input
            className={styles.expression}
            value={expression}
            onChange={(event) => onChange(event.target.value)}
          />
          <ButtonsBlock expression={expression} changeExpression={setExpression} changeHistory={setHistory} history={history}/>
        </div>
        <div className={styles.history}>
          {history.map((operation) =>
            <div className={styles.operation}>
              {operation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
