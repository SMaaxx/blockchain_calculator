const useContractMethod = require("./useContractMethod");

const getPrecedence = (operator) => {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}


const calculation = async ({ expression })  => {

  expression = expression.replace(/\s/g, "");

  if (!/^[0-9+\-*/()]+$/.test(expression)) {
    return("Недопустимое выражение");
  }

  const tokens = [];
  let currentToken = "";
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (/[0-9]/.test(char)) {
      currentToken += char;
    } else if (["+", "-", "*", "/"].includes(char)) {
      tokens.push(currentToken);
      tokens.push(char);
      currentToken = ''
    } else if (char === "(") {
      tokens.push("(");
    } else if (char === ")") {
      tokens.push(")");
    }
  }
  tokens.push(currentToken);

  const postfix = [];
  const operators = [];
  for (let token of tokens) {
    if (!isNaN(token)) {
      postfix.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        postfix.push(operators.pop());
      }
      operators.pop();
    } else {
      while (operators.length > 0 && getPrecedence(token) <= getPrecedence(operators[operators.length - 1])) {
        postfix.push(operators.pop());
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    postfix.push(operators.pop());
  }

  const history = []
  const stack = [];
  for (let token of postfix) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+":
          await useContractMethod({
            type: 'add',
            payload: {
              firstArg: a,
              secondArg: b
            }
          }).then(result => {
            history.push(`${a} + ${b} = ${result.toString()}`);
            stack.push(Number(result.toString()))
          })
          break;
        case "-":
          await useContractMethod({
            type: 'subtract',
            payload: {
              firstArg: a,
              secondArg: b
            }
          }).then(result => {
            history.push(`${a} - ${b} = ${result.toString()}`);
            stack.push(Number(result.toString()))
          })
          break;
        case "*":
          await useContractMethod({
            type: 'multiply',
            payload: {
              firstArg: a,
              secondArg: b
            }
          }).then(result => {
            history.push(`${a} * ${b} = ${result.toString()}`);
            stack.push(Number(result.toString()))
          })
          break;
        case "/":
          await useContractMethod({
            type: 'divide',
            payload: {
              firstArg: a,
              secondArg: b
            }
          }).then(result => {
            history.push(`${a} / ${b} = ${result.toString()}`);
            stack.push(Number(result.toString()))
          })
          break;
      }
    }
  }

  return {
    result: stack[0].toString(),
    history: history
  };
}

module.exports = calculation;