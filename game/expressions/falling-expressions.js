import * as componentsCreator from '../../ui/graphic-components-creator.js';
import * as events from '../../events/event-handlers.js';
import * as expressionsGenerator from '../../generators/arithmetical-expressions-generator.js';
import * as utils from '../../helpers/utils.js';
import * as layoutResize from '../../layouts/layout-resize.js';
import {
    getArithmeticalExpressions,
    getIsMoving,
    getMoveLeft, getMoveRight, getNrLives, getNrLivesImage, getScore,
    setArithmeticalExpressions,
    setNrLives, setScore
} from "../global-variables.js";

let expressions = [];
let currentExpression;
let currentNumberImage;
let scoreImage;
let lives = 3;
let backgroundColor = "#4ca8d0";
let difficulty = 0.002;
let gameControlOption = 1;

document.addEventListener('DOMContentLoaded', function () {
    if (utils.getQueryParam('backgroundColor')) {
        document.body.style.backgroundColor = utils.getQueryParam('backgroundColor');
    }
});

function setGameOptions() {
    if (utils.getQueryParam('lives')) {
        setNrLives(utils.getQueryParam('lives'));
        lives = utils.getQueryParam('lives');
    }
    if (utils.getQueryParam('difficulty')) {
        difficulty = utils.getQueryParam('difficulty') / 1000;
    }
    if (utils.getQueryParam('game-mode')) {
        gameControlOption = parseInt(utils.getQueryParam('game-mode'));
    }
    if (utils.getQueryParam('backgroundColor')) {
        backgroundColor = utils.getQueryParam('backgroundColor');
    }
}

function buildExpressionsList() {
    let x = window.innerWidth * 0.01;
    for (let i = 0; i < getArithmeticalExpressions().length; i++) {
        let images = utils.getImagesFromArithmeticalExpression(getArithmeticalExpressions()[i][0]);
        let expressionImage = utils.getGroupImage(images, x, 20);
        x += expressionImage.width() + window.innerWidth * 0.2;
        expressions.push(expressionImage);
    }
}

function main() {
    setGameOptions();
    let multiplicativeDecompositionsMap = expressionsGenerator.buildMultiplicativeDecompositionsMap();
    setArithmeticalExpressions(expressionsGenerator.generateArithmeticalExpressions(multiplicativeDecompositionsMap));
    currentExpression = getArithmeticalExpressions()[0];
    setArithmeticalExpressions(expressionsGenerator.shuffle(getArithmeticalExpressions()));
    buildExpressionsList();

    let objects = []
    let stage = componentsCreator.createStage();
    let layer = new Konva.Layer();
    let box = componentsCreator.createBox('../../assets/box.png', 0.2, stage);

    if (gameControlOption === 1) {
        box.draggable(true);
        box.dragBoundFunc(function (pos) {
            return {
                x: pos.x,
                y: this.absolutePosition().y
            };
        });
    } else if (gameControlOption === 2) {
        let leftArrow = componentsCreator.createLeftArrow('../../assets/left-arrow.png', 0.2, stage);
        let rightArrow = componentsCreator.createRightArrow('../../assets/right-arrow.png', 0.2, stage);
        leftArrow.opacity(0.5);
        rightArrow.opacity(0.5);
        events.addStageEvents(stage, box, leftArrow, rightArrow);
        layer.add(leftArrow);
        layer.add(rightArrow);
        objects.push(leftArrow);
        objects.push(rightArrow);
    }

    let currentNumberImages = utils.getImagesFromArithmeticalExpression(currentExpression[1].toString(), window.innerWidth * 0.03, 0.04);
    currentNumberImage = utils.getGroupImage(currentNumberImages, 20, 20);
    let width = currentNumberImages[0].attrs.x + currentNumberImages[currentNumberImages.length - 1].attrs.x + currentNumberImages[currentNumberImages.length - 1].attrs.width;
    currentNumberImage.x(window.innerWidth / 2 - width / 2)
    currentNumberImage.y(20);

    let scoreImages = utils.getImagesFromArithmeticalExpression(getScore().toString(), window.innerWidth * 0.03, 0.05);
    scoreImage = utils.getGroupImage(scoreImages, 20, 20);
    scoreImage.x(window.innerWidth * 0.05);

    componentsCreator.createNrLivesImage();
    layer.add(getNrLivesImage());

    objects.push(box);
    box.opacity(0.6);
    layer.add(box);
    layer.add(currentNumberImage);
    layer.add(scoreImage);
    expressions.forEach(function (expression) {
        layer.add(expression);
    });
    events.addWindowEvents(stage, layer, box, objects, expressions);
    stage.add(layer);

    let movingBox = new Konva.Animation(function () {
        if (getIsMoving()) {
            if (getMoveLeft()) {
                if (box.x() - window.innerWidth * 0.02 >= 0) {
                    box.x(box.x() - innerWidth * 0.02);
                }
            } else if (getMoveRight()) {
                if (box.x() + box.width() + window.innerWidth * 0.02 <= window.innerWidth) {
                    box.x(box.x() + innerWidth * 0.02);
                }
            }
        }

        for (let i = 0; i < expressions.length; i++) {
            if (utils.haveIntersection(box.getClientRect(), expressions[i].getClientRect())) {
                if (getArithmeticalExpressions()[i][1] === currentExpression[1]) {
                    setScore(getScore() + 1);
                    let scoreImages = utils.getImagesFromArithmeticalExpression(getScore().toString(), window.innerWidth * 0.03, 0.05);
                    scoreImage.remove();
                    scoreImage = utils.getGroupImage(scoreImages, 20, 20);
                    scoreImage.x(window.innerWidth * 0.05);
                    layer.add(scoreImage);
                } else {
                    setNrLives(getNrLives() - 1);
                    if (getNrLives() === 0) {
                        utils.redirectToGameOverPage(lives, difficulty, backgroundColor, gameControlOption);
                        break;
                    }
                    getNrLivesImage().remove();
                    componentsCreator.createNrLivesImage();
                    layer.add(getNrLivesImage());
                }

                for (let i = 0; i < getArithmeticalExpressions().length; i++) {
                    expressions[i].remove();
                }
                expressions = [];
                setArithmeticalExpressions(expressionsGenerator.generateArithmeticalExpressions(multiplicativeDecompositionsMap));
                currentExpression = getArithmeticalExpressions()[0];
                currentNumberImage.remove();
                let currentNumberImages = utils.getImagesFromArithmeticalExpression(currentExpression[1].toString(), window.innerWidth * 0.03, 0.04);
                currentNumberImage = utils.getGroupImage(currentNumberImages, 20, 20);
                let width = currentNumberImages[0].attrs.x + currentNumberImages[currentNumberImages.length - 1].attrs.x + currentNumberImages[currentNumberImages.length - 1].attrs.width;
                currentNumberImage.x(window.innerWidth / 2 - width / 2)
                currentNumberImage.y(20);
                layer.add(currentNumberImage);
                setArithmeticalExpressions(expressionsGenerator.shuffle(getArithmeticalExpressions()));
                layoutResize.resizeExpressions(layer, expressions);
            }
        }
    }, layer);

    let movingExpressions = new Konva.Animation(function () {
        expressions.forEach(function (expression) {
            expression.y(expression.y() + innerHeight * difficulty)
        })

        if (expressions[0].attrs.y >= window.innerHeight) {
            for (let i = 0; i < getArithmeticalExpressions().length; i++) {
                expressions[i].remove();
            }
            expressions = [];
            setArithmeticalExpressions(expressionsGenerator.generateArithmeticalExpressions(multiplicativeDecompositionsMap));
            layoutResize.resizeExpressions(layer, expressions);
        }
    }, layer);
    movingExpressions.start();
    movingBox.start();
}

main();