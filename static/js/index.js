const frog = document.getElementById('frog');
const moreVibeAudio = document.getElementById('moreVibeAudio');
const vibeAudio = document.getElementById('vibeAudio');

function vibe() {
    moreVibeAudio.pause(); moreVibeAudio.currentTime = 0;
    vibeAudio.pause(); vibeAudio.currentTime = 0;
    const asd = Math.round(Math.random() * 690);
    console.log(asd)
    if (String(asd).includes("69") || String(asd).includes("42")) {
        frog.src = 'static/images/rick.gif';
        moreVibeAudio.play();
    } else {
        vibeAudio.play();
    }

    frog.id = 'dancing-frog';
}

// no more dancing and no more rick
vibeAudio.addEventListener('ended', () => frog.id = 'frog');
moreVibeAudio.addEventListener('ended', function() {
    frog.id = 'frog';
    frog.src = 'static/images/frog.webp';
});
moreVibeAudio.addEventListener('ended', () => frog.src = 'static/images/frog.webp');
moreVibeAudio.addEventListener('pause', () => frog.src = 'static/images/frog.webp');

// TODO: Refactor random number generation
document.body.style.background = 'hsl('+Math.floor(Math.random() * 255)+', 40%, 50%)';
document.getElementsByTagName('header')[0].style.background = 'hsl('+Math.floor(Math.random() * 255)+', 50%, 40%)';
document.getElementsByTagName('footer')[0].style.background = 'hsl('+Math.floor(Math.random() * 255)+', 50%, 40%)';
document.getElementById('vibeButton').addEventListener('click', vibe);