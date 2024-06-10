import styles from './ButtonsBlock.module.scss';
import React from "react";
import {calculate} from "../service/api";
import {CalculationResult} from "../types";

interface Props {
  changeExpression: React.Dispatch<string>,
  expression: string
  changeHistory: React.Dispatch<string[]>,
  history: string[]
}

type Button = {
  value: string,
  type: string,
  onClick: () => void
}

type Row = {
  rowId: number,
  buttons: Button[]
}

const ButtonsBlock: React.FC<Props> = ({ changeExpression, expression, changeHistory, history }) => {

  const removeItem = () => {
    if (expression.charAt(expression.length - 2) === ' ') {
      changeExpression(expression.slice(0, -2));
    } else {
      changeExpression(expression.slice(0, -1));
    }
  }

  const addSymbol = (symbol: string) => {
    if (/[+\-*/]$/.test(expression) || /[+\-*/]/.test(symbol)) {
      changeExpression(expression + ' ' + symbol)
    } else {
      changeExpression(expression + symbol)
    }
  }

  const getResult = async (): Promise<void> => {
    calculate(expression).then((result: CalculationResult)=> {
      changeExpression(result.result);
      changeHistory([...history, ...result.history]);
    })
  }

  const rows: Row[]  = [
    {
      rowId: 1,
      buttons: [
        {
          value: 'AC',
          type: 'functional',
          onClick: () => changeExpression(''),
        },
        {
          value: 'C',
          type
            :
            'functional',
          onClick
            :
          removeItem,
        }
        ,
        {
          value: '*',
          type
            :
            'functional',
          onClick
            :
            () => addSymbol('*'),
        }
      ]
    },

    {
      rowId: 2,
      buttons: [
        {
          value: '7',
          type: 'number',
          onClick: () => addSymbol('7'),
        },
        {
          value: '8',
          type: 'number',
          onClick: () => addSymbol('8'),
        },
        {
          value: '9',
          type: 'number',
          onClick: () => addSymbol('9'),

        },
        {
          value: '/',
          type: 'functional',
          onClick: () => addSymbol('/'),
        }
      ],
    },
    {
      rowId: 3,
      buttons: [
        {
          value: '4',
          type: 'number',
          onClick: () => addSymbol('4'),
        },
        {
          value: '5',
          type: 'number',
          onClick: () => addSymbol('5'),

        },
        {
          value: '6',
          type: 'number',
          onClick: () => addSymbol('6'),

        },
        {
          value: '+',
          type: 'functional',
          onClick: () => addSymbol('+'),
        }
      ]
    },

    {
      rowId: 3,
      buttons: [
        {
          value: '1',
          type: 'number',
          onClick: () => addSymbol('1'),

        },
        {
          value: '2',
          type: 'number',
          onClick: () => addSymbol('2'),

        },
        {
          value: '3',
          type: 'number',
          onClick: () => addSymbol('3'),
        },
        {
          value: '-',
          type: 'functional',
          onClick: () => addSymbol('-'),
        }
      ]
    },
    {
      rowId: 4,
      buttons: [
        {
          value: '0',
          type: 'number',
          onClick: () => addSymbol('0'),
        },
        {
          value: '=',
          type: 'result',
          onClick: async () => await getResult(),
        },
      ]
    }
  ]


  return (
    <div className={styles.container}>
      {rows.map((row: Row) => {
        return(
          <div className={styles.row} key={row.rowId}>
            {row.buttons.map((button: Button) => {
              return(
                <div
                  className={`${styles.button} ${styles[button.type]}`}
                  onClick={button.onClick}
                  key={button.value}
                >
                  {button.value}
                </div>
              );
            })}
          </div>
        )
      })}
    </div>
  );
}

export default ButtonsBlock;