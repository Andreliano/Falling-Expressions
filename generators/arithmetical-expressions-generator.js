export function buildMultiplicativeDecompositionsMap() {
    let multiplicativeDecompositionsMap = new Map();
    let decompositions;
    let i, j;
    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 9; j++) {
            if (!multiplicativeDecompositionsMap.has(i * j)) {
                multiplicativeDecompositionsMap.set(i * j, [`${i}*${j}`]);
            } else {
                decompositions = multiplicativeDecompositionsMap.get(i * j);
                decompositions.push(`${i}*${j}`);
                multiplicativeDecompositionsMap.set(i * j, decompositions);
            }
        }
    }
    return multiplicativeDecompositionsMap;
}

export function generateArithmeticalExpressions(multiplicativeDecompositionsMap) {
    let arithmeticalExpressions = [];
    let operators = ['+', '-', '*'];
    let operatorIndex;
    let firstOperand;
    let secondOperand;
    let i;
    for (i = 1; i <= 5; i++) {
        operatorIndex = Math.floor(Math.random() * operators.length);
        if (operators[operatorIndex] === '+' || operators[operatorIndex] === '-') {
            firstOperand = Math.floor(Math.random() * 81) + 1;
            secondOperand = Math.floor(Math.random() * 19) + 1;
            if (operators[operatorIndex] === '+') {
                checkIfExpressionAlreadyExists(`${Math.abs(firstOperand - secondOperand)}+${secondOperand}`, arithmeticalExpressions)
                    ?
                    arithmeticalExpressions.push(regenerateExpressionUntilIsDifferentFromOthers(arithmeticalExpressions, operators, multiplicativeDecompositionsMap))
                    :
                    arithmeticalExpressions.push([`${Math.abs(firstOperand - secondOperand)}+${secondOperand}`, Math.abs(firstOperand - secondOperand) + secondOperand]);
            } else {
                checkIfExpressionAlreadyExists(`${firstOperand + secondOperand}-${secondOperand}`, arithmeticalExpressions)
                    ?
                    arithmeticalExpressions.push(regenerateExpressionUntilIsDifferentFromOthers(arithmeticalExpressions, operators, multiplicativeDecompositionsMap))
                    :
                    arithmeticalExpressions.push([`${firstOperand + secondOperand}-${secondOperand}`, firstOperand]);
            }
        } else if (operators[operatorIndex] === '*') {
            let randomExpressionFromMultiplicativeDecompositionsMap = getRandomExpressionFromMultiplicativeDecompositionsMap(multiplicativeDecompositionsMap);
            checkIfExpressionAlreadyExists(randomExpressionFromMultiplicativeDecompositionsMap, arithmeticalExpressions)
                ?
                arithmeticalExpressions.push(regenerateExpressionUntilIsDifferentFromOthers(arithmeticalExpressions, operators, multiplicativeDecompositionsMap))
                :
                arithmeticalExpressions.push([randomExpressionFromMultiplicativeDecompositionsMap, eval(randomExpressionFromMultiplicativeDecompositionsMap)]);
        }
    }

    return arithmeticalExpressions;
}

export function shuffle(arithmeticalExpressions) {
    for (let i = arithmeticalExpressions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [arithmeticalExpressions[i], arithmeticalExpressions[j]] = [arithmeticalExpressions[j], arithmeticalExpressions[i]];
    }
    return arithmeticalExpressions;
}

function checkIfExpressionAlreadyExists(expression, currentExpressions) {
    let found = false;
    currentExpressions.forEach((currentExpression) => {
        if (currentExpression[0] === expression) {
            found = true;
        }
    })

    return found;
}

function getRandomExpressionFromMultiplicativeDecompositionsMap(multiplicativeDecompositionsMap) {
    let keys = Array.from(multiplicativeDecompositionsMap.keys());
    let randomKeyIndex = Math.floor(Math.random() * keys.length);
    let valueArray = multiplicativeDecompositionsMap.get(keys[randomKeyIndex]);
    let randomValueIndex = Math.floor(Math.random() * valueArray.length);
    return valueArray[randomValueIndex];
}

function regenerateExpressionUntilIsDifferentFromOthers(expressions,
                                                        operators,
                                                        multiplicativeDecompositionsMap) {
    let operatorIndex;
    let firstOperand;
    let secondOperand;
    let expression;
    do {
        operatorIndex = Math.floor(Math.random() * operators.length);
        if (operators[operatorIndex] === '+' || operators[operatorIndex] === '-') {
            firstOperand = Math.floor(Math.random() * 81) + 1;
            secondOperand = Math.floor(Math.random() * 19) + 1;
            if (operators[operatorIndex] === '+') {
                expression = `${Math.abs(firstOperand - secondOperand)}+${secondOperand}`;
            } else {
                expression = `${firstOperand + secondOperand}-${secondOperand}`;
            }
        } else {
            expression = getRandomExpressionFromMultiplicativeDecompositionsMap(multiplicativeDecompositionsMap);
        }
    } while (checkIfExpressionAlreadyExists(expression, expressions));

    if (operators[operatorIndex] === '+' || operators[operatorIndex] === '-') {
        return [expression, firstOperand];
    } else {
        return [expression, eval(expression)];
    }
}