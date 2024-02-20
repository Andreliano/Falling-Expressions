import {calculateAspectRatioFit} from "../layouts/layout-resize.js";
import {getGroupImage, getImagesFromArithmeticalExpression} from "../helpers/utils.js";
import {getNrLives, getNrLivesImage, setNrLivesImage} from "../game/global-variables.js";

export function createStage() {
    return new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
    });
}

export function createDigit(imagePath, percentage) {
    let imgObj = new Image();
    imgObj.src = imagePath

    const initialSizeImg = calculateAspectRatioFit(
        80,
        80,
        window.innerWidth * percentage,
        window.innerHeight * percentage
    );

    return new Konva.Image({
        image: imgObj,
        x: 20,
        y: 20,
        width: initialSizeImg.width,
        height: initialSizeImg.height
    });
}

export function createBox(imagePath, percentage, stage) {
    let imgObj = new Image();
    imgObj.src = imagePath

    const initialSizeImg = calculateAspectRatioFit(
        80,
        80,
        window.innerWidth * percentage,
        window.innerHeight * percentage
    );

    return new Konva.Image({
        image: imgObj,
        x: stage.width() / 2 - initialSizeImg.width,
        y: stage.height() - initialSizeImg.height,
        width: initialSizeImg.width,
        height: initialSizeImg.height
    });
}

export function createNrLivesImage() {
    let heartImage = createHeartImage('../../assets/heart.png', 0.07);
    let nrLivesImages = [];
    nrLivesImages.push(heartImage);
    heartImage.x(window.innerWidth * 0.025);
    let numberImages = getImagesFromArithmeticalExpression(getNrLives().toString(), window.innerWidth * 0.025 + heartImage.width(), 0.05);
    numberImages.forEach(function (image) {
        nrLivesImages.push(image);
    })
    setNrLivesImage(getGroupImage(nrLivesImages, 100, 100));
    let nrLivesImage = getNrLivesImage();
    nrLivesImage.x(window.innerWidth - window.innerWidth * 0.2)
    nrLivesImage.y(20);
    setNrLivesImage(nrLivesImage);
}

export function createLeftArrow(imagePath, percentage, stage) {
    let imgObj = new Image();
    imgObj.src = imagePath;
    const initialSizeImg = calculateAspectRatioFit(
        80,
        80,
        window.innerWidth * percentage,
        window.innerHeight * percentage
    );

    return new Konva.Image({
        image: imgObj,
        x: stage.width() / 2 - stage.width() / 3 - initialSizeImg.width,
        y: stage.height() - initialSizeImg.height,
        width: initialSizeImg.width,
        height: initialSizeImg.height
    });
}


export function createRightArrow(imagePath, percentage, stage) {
    let imgObj = new Image();
    imgObj.src = imagePath

    const initialSizeImg = calculateAspectRatioFit(
        80,
        80,
        window.innerWidth * percentage,
        window.innerHeight * percentage
    );

    return new Konva.Image({
        image: imgObj,
        x: stage.width() / 2 + stage.width() / 3,
        y: stage.height() - initialSizeImg.height,
        width: initialSizeImg.width,
        height: initialSizeImg.height
    });
}

function createHeartImage(imagePath, percentage) {
    let imgObj = new Image();
    imgObj.src = imagePath

    const initialSizeImg = calculateAspectRatioFit(
        80,
        80,
        window.innerWidth * percentage,
        window.innerHeight * percentage
    );

    return new Konva.Image({
        image: imgObj,
        width: initialSizeImg.width,
        height: initialSizeImg.height
    });
}