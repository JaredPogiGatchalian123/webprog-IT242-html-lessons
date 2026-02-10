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
    heart.style.cssText = `position:absolute; left:${Math.random()*80}vw; top:${Math.random()*80}vh; font-size:3rem; cursor:pointer; z-index:100; transition: transform 0.2s;`;
    
    heart.onmouseover = () => heart.style.transform = 'scale(1.2)';
    heart.onmouseout = () => heart.style.transform = 'scale(1)';

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

// Confetti Effect
function launchConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#ff4d6d', '#ffafbd', '#ffc3a0', '#ffffff'][Math.floor(Math.random() * 4)];
        confetti.style.top = '-10px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { top: '-10px', opacity: 1 },
            { top: '100vh', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });

        animation.onfinish = () => confetti.remove();
    }
}

// Hover transformation: No button becomes "YES"
const noBtn = document.getElementById('no-btn');
noBtn.onmouseenter = () => {
    noBtn.innerHTML = "YES";
    noBtn.style.color = "#ff4d6d";
    noBtn.style.textShadow = "0 0 10px white";
};

const handleFinal = () => {
    document.getElementById('valentine-card').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
    launchConfetti(); // ADDED EFFECT
};

document.getElementById('yes-btn').onclick = handleFinal;
noBtn.onclick = handleFinal;

createHeart();