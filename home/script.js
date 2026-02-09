let player;
const videoId = 'r-3NvDp28U4';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: videoId,
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': videoId }
    });
}

const heartZone = document.getElementById('heart-zone');
const scoreSpan = document.getElementById('score');
const valentineCard = document.getElementById('valentine-card');
const noBtn = document.getElementById('no-btn');
let score = 0;

function createHeart() {
    if (score >= 5) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 80 + 'vw';
    heart.style.top = Math.random() * 80 + 'vh';

    heart.addEventListener('click', () => {
        score++;
        scoreSpan.innerText = score;
        heart.remove();
        if (score === 1 && player) player.playVideo();
        if (score < 5) createHeart();
        else {
            document.getElementById('ui-layer').classList.add('hidden');
            valentineCard.classList.remove('hidden');
        }
    });
    heartZone.appendChild(heart);
}

// Hover swap logic
noBtn.addEventListener('mouseenter', () => {
    noBtn.innerHTML = "YES";
    noBtn.style.background = "#ff4d6d";
    noBtn.style.color = "white";
});

function handleYes() {
    valentineCard.classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
}

document.getElementById('yes-btn').addEventListener('click', handleYes);
noBtn.addEventListener('click', handleYes);

createHeart();