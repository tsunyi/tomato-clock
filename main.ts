controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.start.onEvent(ControllerButtonEvent.Pressed, function () {
    if (grid.spriteCol(arrow) == 1 && grid.spriteRow(arrow) == 6) {
        if (isStarted == 0) {
            ChangeTimeMode()
        }
    }
    if (grid.spriteCol(arrow) == 8 && grid.spriteRow(arrow) == 6) {
        if (isStarted == 0) {
            isStarted = 1
        } else {
            isStarted = 0
        }
    }
})
function ChangeTimeMode () {
    if (timeMode == 0) {
        timeMode = 1
        totalSec = 600
        workBtn.setImage(assets.image`myImage3`)
        breakBtn.setImage(assets.image`myImage2`)
    } else {
        timeMode = 0
        totalSec = 3000
        workBtn.setImage(assets.image`myImage1`)
        breakBtn.setImage(assets.image`myImage4`)
    }
}
controller.C.onEvent(ControllerButtonEvent.Pressed, function () {
    if (grid.spriteCol(arrow) == 9) {
        arrowMoveStep = -1
    } else if (grid.spriteCol(arrow) == 0) {
        arrowMoveStep = 1
    }
    grid.move(arrow, arrowMoveStep, 0)
})
let tomatoNum = 0
let arrowMoveStep = 0
let isStarted = 0
let timeMode = 0
let totalSec = 0
let breakBtn: Sprite = null
let workBtn: Sprite = null
let arrow: Sprite = null
let tomatoIcon = sprites.create(assets.image`myImage`, SpriteKind.Player)
tomatoIcon.setPosition(16, 20)
let minLabel = textsprite.create("25")
minLabel.setMaxFontHeight(35)
minLabel.setOutline(1, 6)
minLabel.setPosition(120, 30)
let secLabel = textsprite.create("00")
secLabel.setMaxFontHeight(25)
secLabel.setOutline(1, 6)
secLabel.setPosition(120, 75)
let tomatoNumLabel = textsprite.create("00")
tomatoNumLabel.setMaxFontHeight(12)
tomatoNumLabel.setOutline(1, 6)
tomatoNumLabel.setPosition(40, 20)
arrow = sprites.create(img`
    9 9 9 9 9 9 . . . . 9 9 9 9 9 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 . . . . . . . . . . . . . . 9 
    9 9 9 9 9 9 9 . . . 9 9 9 9 9 9 
    `, SpriteKind.Player)
tiles.setTilemap(tilemap`level1`)
grid.place(arrow, tiles.getTileLocation(1, 6))
grid.moveWithButtons(arrow)
let tomatoBtn = sprites.create(assets.image`myImage0`, SpriteKind.Player)
grid.place(tomatoBtn, tiles.getTileLocation(1, 6))
let flowerBtn = sprites.create(assets.image`forestFlowers0`, SpriteKind.Player)
grid.place(flowerBtn, tiles.getTileLocation(8, 6))
workBtn = sprites.create(assets.image`myImage1`, SpriteKind.Player)
grid.place(workBtn, tiles.getTileLocation(4, 6))
breakBtn = sprites.create(assets.image`myImage4`, SpriteKind.Player)
grid.place(breakBtn, tiles.getTileLocation(5, 6))
let min = 0
let sec = 0
totalSec = 1500
timeMode = 0
isStarted = 0
arrowMoveStep = 1
game.onUpdate(function () {
    min = Math.floor(totalSec / 60)
    sec = totalSec % 60
    if (convertToText(min).length < 2) {
        minLabel.setText("0" + convertToText(min))
    } else {
        minLabel.setText(convertToText(min))
    }
    if (convertToText(sec).length < 2) {
        secLabel.setText("0" + convertToText(sec))
    } else {
        secLabel.setText(convertToText(sec))
    }
    tomatoNumLabel.setText(convertToText(tomatoNum))
})
game.onUpdateInterval(1000, function () {
    if (isStarted == 1) {
        if (totalSec == 0) {
            if (timeMode == 0) {
                tomatoNum += 1
            }
            ChangeTimeMode()
            for (let index = 0; index < 4; index++) {
                music.buzzer.play()
                controller.vibrate(500)
                pause(1000)
            }
            isStarted = 0
        } else {
            totalSec += -1
        }
    }
})
