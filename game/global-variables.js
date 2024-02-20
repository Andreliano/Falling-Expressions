let moveLeft = false;
let moveRight = false;
let isMoving = false;

let nrLives = 3;
let nrLivesImage;
let score = 0;
let arithmeticalExpressions = [];

export function getMoveLeft() {
    return moveLeft;
}

export function setMoveLeft(newMoveLeft) {
    moveLeft = newMoveLeft;
}

export function getMoveRight() {
    return moveRight;
}

export function setMoveRight(newMoveRight) {
    moveRight = newMoveRight;
}

export function getIsMoving() {
    return isMoving;
}

export function setIsMoving(newIsMoving) {
    isMoving = newIsMoving;
}

export function getNrLives() {
    return nrLives;
}

export function setNrLives(newNrLives) {
    nrLives = newNrLives;
}

export function getNrLivesImage() {
    return nrLivesImage;
}

export function setNrLivesImage(newNrLivesImage) {
    nrLivesImage = newNrLivesImage;
}

export function getArithmeticalExpressions() {
    return arithmeticalExpressions;
}

export function setArithmeticalExpressions(newArithmeticalExpressions) {
    arithmeticalExpressions = newArithmeticalExpressions;
}

export function getScore() {
    return score;
}

export function setScore(newScore) {
    score = newScore;
}
