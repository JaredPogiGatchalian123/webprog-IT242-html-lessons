let player;
const videoId = 'r-3NvDp28U4'; // Maybe Softly

// YouTube API Setup
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: { 
            'autoplay': 0, 
            'controls': 0, 
            'loop': 1, 
            'playlist': videoId 
        }
    });
}

const heartZone = document.getElementById('heart-zone');
const scoreDisplay = document.getElementById('score');
const mainText = document.getElementById('main-text');
const valentineCard = document.getElementById('valentine-card');
const successScreen = document.getElementById('success-screen');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

let score = 0;

function createHeart() {
    if (score >= 5) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = (Math.random() > 0.5) ? '💖' : '🌸';
    heart.style.left = Math.random() * (window.innerWidth - 80) + 'px';
    heart.style.top = Math.random() * (window.innerHeight - 80) + 'px';

    heart.addEventListener('click', () => {
        score++;
        scoreDisplay.innerText = `Hearts: ${score}`;
        heart.remove();
        
        // Music starts on first heart click
        if (score === 1 && player) player.playVideo();

        if (score < 5) createHeart();
        else showFinalCard();
    });
    heartZone.appendChild(heart);
}

function showFinalCard() {
    mainText.classList.add('hidden');
    scoreDisplay.classList.add('hidden');
    valentineCard.classList.remove('hidden');
}

// "No" button trap logic
noBtn.addEventListener('mouseover', () => {
    if (!noBtn.classList.contains('transformed-yes')) {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 150);
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
});

noBtn.addEventListener('click', () => {
    noBtn.innerHTML = "YES! ❤️";
    noBtn.classList.add('transformed-yes');
    setTimeout(handleYes, 600);
});

yesBtn.addEventListener('click', handleYes);

function handleYes() {
    valentineCard.classList.add('hidden');
    successScreen.classList.remove('hidden');
    triggerPetals();
}

// Falling petal animation
function triggerPetals() {
    for (let i = 0; i < 40; i++) {
        const petal = document.createElement('div');
        petal.innerHTML = '🌸';
        petal.style.position = 'fixed';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = '-5vh';
        petal.style.fontSize = Math.random() * 20 + 15 + 'px';
        petal.style.zIndex = '1000';
        petal.style.transition = `top ${Math.random() * 3 + 2}s linear, transform ${Math.random() * 3 + 2}s linear`;
        
        document.body.appendChild(petal);
        
        setTimeout(() => {
            petal.style.top = '105vh';
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 100);
    }
}

// Start game
createHeart();