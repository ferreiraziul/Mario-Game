
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')
const restartButton = document.querySelector('.restart')

const audioStart = new Audio('./sound/audio_theme.mp3')
const audioGameOver = new Audio('./sound/audio_gameover.mp3')

let loop;

const startGame = () => {
    pipe.classList.add('pipe-animation')
    start.style.display = 'none'

    audioStart.play()


    loop = setInterval(gameLoop, 10)
}

const restartGame = () => {

    gameOver.style.display = 'none'
    pipe.style.left = ''
    pipe.style.right = '0'
    mario.src = './img/mario.gif'
    mario.style.width = '150px'
    mario.style.bottom = '0'

    start.style.display = 'none'

    audioGameOver.pause()
    audioGameOver.currentTime = 0
    audioStart.play()
    audioStart.currentTime = 0

    pipe.classList.add('pipe-animation')

    loop = setInterval(gameLoop, 10)
}

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 800)
}

const gameLoop = () => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace('px', '')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.classList.remove('pipe-animation')
        pipe.style.left = `${pipePosition}px`


        mario.classList.remove('jump')
        mario.style.bottom = `${marioPosition}px`


        mario.src = './img/game-over.png'
        mario.style.width = '80px'
        mario.style.marginLeft = '50px'


        audioStart.pause()
        audioStart.currentTime = 0

        audioGameOver.play()


        gameOver.style.display = 'flex'


        clearInterval(loop)
    }
}

document.addEventListener('keypress', e => {
    if (e.key === ' ') {
        jump()
    }
})

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump()
    }
})

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        startGame()
    }
})


restartButton.addEventListener('click', restartGame)
