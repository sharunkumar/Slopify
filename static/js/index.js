function vibe() {
    document.getElementById('moreVibeAudio').pause(); document.getElementById('moreVibeAudio').currentTime = 0; 
    document.getElementById('vibeAudio').pause(); document.getElementById('vibeAudio').currentTime = 0;
    const asd = Math.round(Math.random() * 690);
    console.log(asd)
    if (String(asd).includes("69") || String(asd).includes("42"))
        document.getElementById('moreVibeAudio').play(); 
    else 
    document.getElementById('vibeAudio').play();
}

document.getElementById('vibeButton').addEventListener('click', vibe);

