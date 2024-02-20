import {resizeExpressions, updateImagePosition} from "../layouts/layout-resize.js";
import {getArithmeticalExpressions, setIsMoving, setMoveLeft, setMoveRight} from "../game/global-variables.js";

export function addWindowEvents(stage, layer, box, objects, expressions) {
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            if (box.x() - window.innerWidth * 0.02 >= 0) {
                box.x(box.x() - innerWidth * 0.02);
                layer.draw();
            }
        } else if (e.key === 'ArrowRight') {
            if (box.x() + box.width() + window.innerWidth * 0.02 <= window.innerWidth) {
                box.x(box.x() + innerWidth * 0.02);
                layer.draw();
            }
        }
    });
    window.addEventListener('resize', function () {
        objects.forEach(function (o) {
            updateImagePosition(o, stage.width(), stage.height());
        });

        for (let i = 0; i < getArithmeticalExpressions().length; i++) {
            expressions[i].remove();
        }
        expressions = [];
        resizeExpressions(layer, expressions);
        layer.draw();
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);
        window.location.reload();
    });
}

export function addStageEvents(stage, box, leftArrow, rightArrow) {
    let hammerStage = new Hammer(stage.content);

    hammerStage.on('tap', function (e) {
        let touchX = e.center.x;
        let touchY = e.center.y;
        if (leftArrow.x() <= touchX && touchX <= leftArrow.x() + leftArrow.width() &&
            leftArrow.y() <= touchY && touchY <= leftArrow.y() + leftArrow.height()) {
            if (box.x() - window.innerWidth * 0.02 >= 0) {
                box.x(box.x() - window.innerWidth * 0.02);
            }
        } else if (rightArrow.x() <= touchX && touchX <= rightArrow.x() + rightArrow.width() &&
            rightArrow.y() <= touchY && touchY <= rightArrow.y() + rightArrow.height()) {
            if (box.x() + box.width() + window.innerWidth * 0.02 <= window.innerWidth) {
                box.x(box.x() + window.innerWidth * 0.02);
            }
        }
    });

    hammerStage.on('press', function (e) {
        let touchX = e.center.x;
        let touchY = e.center.y;
        if (leftArrow.x() <= touchX && touchX <= leftArrow.x() + leftArrow.width() &&
            leftArrow.y() <= touchY && touchY <= leftArrow.y() + leftArrow.height()) {
            setIsMoving(true);
            setMoveLeft(true);
        } else if (rightArrow.x() <= touchX && touchX <= rightArrow.x() + rightArrow.width() &&
            rightArrow.y() <= touchY && touchY <= rightArrow.y() + rightArrow.height()) {
            setIsMoving(true);
            setMoveRight(true);
        }
    });

    hammerStage.on('pressup', function (e) {
        let touchX = e.center.x;
        let touchY = e.center.y;
        if (leftArrow.x() <= touchX && touchX <= leftArrow.x() + leftArrow.width() &&
            leftArrow.y() <= touchY && touchY <= leftArrow.y() + leftArrow.height()) {
            setIsMoving(false);
            setMoveRight(false);
            setMoveLeft(false);
        } else if (rightArrow.x() <= touchX && touchX <= rightArrow.x() + rightArrow.width() &&
            rightArrow.y() <= touchY && touchY <= rightArrow.y() + rightArrow.height()) {
            setIsMoving(false);
            setMoveRight(false);
            setMoveLeft(false);
        }
    });
}