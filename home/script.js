let player;
let score = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: 'r-3NvDp28U4',
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': 'r-3NvDp28U4' }
    });
}

function createHeart() {
    if (score >= 5) return;
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `position:absolute; left:${Math.random()*80}vw; top:${Math.random()*80}vh; font-size:3rem; cursor:pointer;`;

    heart.onclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        heart.remove();
        if (score === 1 && player) player.playVideo();
        if (score < 5) createHeart();
        else {
            document.getElementById('ui-layer').classList.add('hidden');
            document.getElementById('valentine-card').classList.remove('hidden');
        }
    };
    document.getElementById('heart-zone').appendChild(heart);
}

// Hover transformation: No button becomes "YES"
const noBtn = document.getElementById('no-btn');
noBtn.onmouseenter = () => {
    noBtn.innerHTML = "YES";
    noBtn.style.color = "#ff4d6d";
};

const handleFinal = () => {
    document.getElementById('valentine-card').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
};

document.getElementById('yes-btn').onclick = handleFinal;
noBtn.onclick = handleFinal;

createHeart();