function vibe() {
    document.getElementById('vibeAudio').play();

    document.getElementById('frog').id = 'dancing-frog';
}

document.getElementById('vibeButton').addEventListener('click', vibe);