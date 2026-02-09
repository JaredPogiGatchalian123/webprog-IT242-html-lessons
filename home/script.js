/* --- Base Styles --- */
body {
    background: linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%);
    font-family: 'Poppins', sans-serif;
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: #d63384;
    text-align: center;
}

.script-font {
    font-family: 'Pacifico', cursive;
    color: white;
    font-size: 1.8rem;
    margin-bottom: 0;
}

/* --- UI / Game Elements --- */
#ui-layer {
    position: absolute;
    top: 20px;
    z-index: 100;
    pointer-events: none; /* Allows clicks to pass through to hearts */
}

#score-pill {
    background: white;
    color: #ff4d6d;
    padding: 10px 30px;
    border-radius: 50px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    display: inline-block;
}

.heart {
    position: absolute;
    font-size: 3rem;
    cursor: pointer;
    z-index: 50;
    user-select: none;
    transition: transform 0.1s;
}

.heart:active {
    transform: scale(1.5);
}

/* --- Valentine Card (Dark Neon Theme) --- */
#valentine-card {
    background: #2c3e50; /* Matches the dark reference */
    border: 5px solid #ff4d6d;
    border-radius: 25px;
    padding: 40px;
    width: 320px;
    position: relative;
    box-shadow: 0 0 40px rgba(255, 77, 109, 0.6);
    z-index: 200;
}

/* Tilted Photos */
.photo {
    position: absolute;
    width: 110px;
    height: 140px;
    border: 5px solid white;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.photo-left {
    top: -40px;
    left: -50px;
    transform: rotate(-12deg);
}

.photo-right {
    bottom: -30px;
    right: -50px;
    transform: rotate(12deg);
}

.neon-text {
    font-size: 2.8rem;
    color: white;
    text-shadow: 0 0 10px #ff4d6d, 0 0 20px #ff4d6d, 0 0 30px #ff4d6d;
    margin: 5px 0 20px 0;
    letter-spacing: 2px;
}

/* Glowing Heart Frame */
.neon-heart-frame {
    margin: 15px auto;
    width: 130px;
    height: 130px;
    border: 4px solid #ff4d6d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px #ff4d6d, inset 0 0 15px #ff4d6d;
}

.inner-heart {
    font-size: 4.5rem;
    animation: heartbeat 1.2s infinite;
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
}

/* Buttons with Checkbox Style */
.button-zone {
    margin-top: 25px;
}

.select-text {
    color: #bdc3c7;
    font-size: 0.8rem;
    margin-bottom: 15px;
}

.btn-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 15px 0 15px 40px;
}

.checkbox {
    width: 25px;
    height: 25px;
    border: 3px solid white;
    margin-right: 20px;
}

button {
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    transition: 0.2s;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

button:hover {
    color: #ff4d6d;
    text-shadow: 0 0 10px #ff4d6d;
}

/* --- Success Screen --- */
#success-screen {
    z-index: 300;
}

.bounce {
    animation: bounce 0.8s infinite alternate;
    color: #ff4d6d;
    text-shadow: 0 0 10px white;
}

@keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-15px); }
}

.final-img {
    width: 300px;
    border: 8px solid white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* --- Utility --- */
.hidden {
    display: none !important;
}