let player;
const videoId = 'r-3NvDp28U4';

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': videoId },
        events: {
            'onReady': () => console.log("Music API Ready")
        }
    });
}

let score = 0;
const heartZone = document.getElementById('heart-zone');
const scoreDisplay = document.getElementById('score');

function spawnHeart() {
    if (score >= 5) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 80 + 'vw';
    heart.style.top = Math.random() * 80 + 'vh';

    heart.onclick = function() {
        score++;
        scoreDisplay.innerText = score;
        heart.remove();
        
        // Start music on first catch
        if (score === 1 && player) {
            player.playVideo();
        }

        if (score < 5) {
            spawnHeart();
        } else {
            revealCard();
        }
    };
    heartZone.appendChild(heart);
}

function revealCard() {
    console.log("Card Revealed!");
    document.getElementById('ui-layer').classList.add('hidden');
    document.getElementById('valentine-card').classList.remove('hidden');
}

// Button Hover Logic
const noBtn = document.getElementById('no-btn');
noBtn.onmouseenter = () => {
    noBtn.innerHTML = "YES";
    noBtn.style.color = "#ff4d6d";
};

// Final Success
function showSuccess() {
    document.getElementById('valentine-card').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
}

document.getElementById('yes-btn').onclick = showSuccess;
noBtn.onclick = showSuccess;

// Start game
spawnHeart();