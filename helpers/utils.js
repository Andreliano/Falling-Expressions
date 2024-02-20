import * as componentsCreator from "../ui/graphic-components-creator.js";
import {
    getScore
} from "../game/global-variables.js";

export function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export function getImagesFromArithmeticalExpression(expression, x = window.innerWidth * 0.03, p = 0.025) {
    let images = [], digit;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '*') {
            digit = componentsCreator.createDigit("../../assets/mul.png", p);
            digit.x(x);
            x += digit.width() + window.innerWidth * 0.001;
            images.push(digit);
        } else if (expression[i] === '+') {
            digit = componentsCreator.createDigit("../../assets/add.png", p);
            digit.x(x);
            x += digit.width() + window.innerWidth * 0.001;
            images.push(digit);
        } else if (expression[i] === '-') {
            digit = componentsCreator.createDigit("../../assets/minus.png", p)
            digit.x(x);
            x += digit.width() + window.innerWidth * 0.001;
            images.push(digit);
        } else {
            digit = componentsCreator.createDigit(`../../assets/${expression[i]}.png`, p)
            digit.x(x);
            x += digit.width() + window.innerWidth * 0.001;
            images.push(digit);
        }
    }
    return images;
}

export function getGroupImage(images, x, y) {
    let groupImage = new Konva.Group({
        x: x,
        y: y
    });
    images.forEach(function (image) {
        groupImage.add(image);
    });
    return groupImage;
}

export function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}

export function redirectToGameOverPage(lives, difficulty, backgroundColor, gameMode) {
    window.location.href = '../../game/game-over/game-over-page.html?score=' + encodeURIComponent(getScore()) +
        '&difficulty=' + encodeURIComponent(difficulty) +
        '&lives=' + encodeURIComponent(lives) +
        '&backgroundColor=' + encodeURIComponent(backgroundColor) +
        '&game-mode=' + encodeURIComponent(gameMode);
}