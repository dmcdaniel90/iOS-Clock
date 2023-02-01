'use strict';

const keys = document.querySelectorAll('.key');
const displayElem = document.querySelector('.calc-screen');
let input = '';
let entryLog = [];
let storageLog = [];
let userNumber = 0;
let displayNum = 0;
let total = '';

for (const key of keys) {
  key.addEventListener('click', function buttonPressed(e) {
    input = convertNums(e.target.id);
    //console.log(e.target.id);

    if (input === 'clear') {
      clearAllLog();
      clearStorage();
    } else if (input === 'negate') {
      userNumber = String(userNumber * -1);
      updateDisplay(userNumber);
    } else {
      addToLog(input);
    }
    //console.log(input, entryLog, userNumber);
  });
}

function convertNums(id) {
  switch (id) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    case 'zero':
      return '0';
    case 'clear':
      return 'clear';
    case 'negate':
      return 'negate';
    case 'remainder':
      return '%';
    case 'divide':
      return '/';
    case 'multiply':
      return '*';
    case 'addition':
      return '+';
    case 'subtract':
      return '-';
    case 'equals':
      return '=';
    case 'decimal':
      return '.';

    default:
      break;
  }
}

function addToLog(input) {
  if (Number(input) || input == 0 || input === '.') {
    entryLog.push(input);
    userNumber = entryLog.join('');
    updateDisplay(userNumber);
  } else if (entryLog.length === 0 && input !== 'clear' && input !== 'negate') {
    alert('Please enter a number first');
  } else if (input === '=') {
    //!Disable number keys. Only allow clear, negate, mathOper
    calculateTotal();
  } else if (!Number(input)) {
    addMathOper();
  }

  //console.log(entryLog);
}

function addMathOper() {
  storageLog.push(userNumber);
  storageLog.push(input);
  updateDisplay(userNumber);
  clearLog();
}

function calculateTotal() {
  storageLog.push(userNumber);
  console.log(storageLog);

  let evalString = '';
  const postfix = ' ';

  for (let i = 0; i < storageLog.length; i++) {
    storageLog[i] += postfix;
    evalString += storageLog[i];
  }
  total = eval(evalString);

  displayNum = total;
  updateDisplay(displayNum);
  //clearLog();
  //clearStorage();
}

function clearLog() {
  displayNum += Number(userNumber);
  updateDisplay(displayNum);
  entryLog.length = 0;
  userNumber = 0;
}

function clearAllLog() {
  entryLog.length = 0;
  userNumber = 0;
  updateDisplay(userNumber);
}

function clearStorage() {
  storageLog.length = 0;
}

function updateDisplay(element) {
  displayElem.innerHTML = element;
}
