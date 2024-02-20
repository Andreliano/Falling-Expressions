import {getGroupImage, getImagesFromArithmeticalExpression} from "../helpers/utils.js";
import {getArithmeticalExpressions} from "../game/global-variables.js";

export function updateImagePosition(boxImg, initialStageWidth, initialStageHeight) {

    let x = boxImg.x() + boxImg.width();
    let y = boxImg.y() + boxImg.height();
    const newSize = calculateAspectRatioFit(
        boxImg.image().naturalWidth,
        boxImg.image().naturalHeight,
        window.innerWidth * 0.2,
        window.innerHeight * 0.2
    );
    let newX = (x / initialStageWidth) * window.innerWidth - newSize.width;
    let newY = (y / initialStageHeight) * window.innerHeight - newSize.height;
    boxImg.x(newX);
    boxImg.width(newSize.width);
    boxImg.y(newY);
    boxImg.height(newSize.height);
}

export function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {width: srcWidth * ratio, height: srcHeight * ratio};
}

export function resizeExpressions(layer, expressions) {
    let x = window.innerWidth * 0.01;
    for (let i = 0; i < getArithmeticalExpressions().length; i++) {
        let images = getImagesFromArithmeticalExpression(getArithmeticalExpressions()[i][0]);
        let expressionImage = getGroupImage(images, x, 20);
        x += expressionImage.width() + window.innerWidth * 0.2;
        expressions.push(expressionImage);
    }
    expressions.forEach(function (expression) {
        layer.add(expression);
    });
}