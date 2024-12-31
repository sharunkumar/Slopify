function playPrettyGoodVideo() {
    const videoContainer = document.createElement('div');
    videoContainer.style.width = '30%';
    videoContainer.style.position = 'fixed';
    videoContainer.style.right = '20px';
    videoContainer.style.bottom = '20px';
    videoContainer.style.zIndex = '999';
    videoContainer.style.borderRadius = '8px';
    videoContainer.style.overflow = 'hidden';
    videoContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    const video = document.createElement('video');
    video.src = 'static/video/pretty_good.mp4';
    video.style.width = '100%';
    video.style.display = 'block';

    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);

    // Play after a short delay
    setTimeout(() => {
        video.play();
    }, 100);

    video.onended = () => {
        videoContainer.remove();
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const security = new AnnoyingSecurity();
    const form = document.getElementById("registration-form");
    const captchaContainer = document.getElementById("captcha-container");
    const captchaPrompt = document.getElementById("captcha-prompt");
    const captchaContent = document.getElementById("captcha-content");
    const captchaInput = document.getElementById("captcha-input");
    const submitCaptchaButton = document.getElementById("submit-captcha");
    const skipSecurityButton = document.getElementById("skip-security"); // Add this line

    let currentCaptcha = security.generateMathCaptcha();
    captchaPrompt.textContent = currentCaptcha.question;
    captchaInput.style.display = "block";

    submitCaptchaButton.addEventListener("click", async () => {
        let isValid = false;

        switch (security.captchaCount) {
            case 0:
                isValid = Number(captchaInput.value) == currentCaptcha.answer;
                break;
            case 1:
                isValid =
                    currentCaptcha.correctAnswers.every((answer) =>
                        currentCaptcha.selectedShapes.has(answer)
                    ) &&
                    currentCaptcha.selectedShapes.size ===
                    currentCaptcha.correctAnswers.length;
                break;
            case 2:
                isValid = captchaInput.value.trim().length > 0;
                break;
        }

        if (isValid) {
            security.showNotification("CAPTCHA passed!", "info");
            security.captchaCount++;

            if (security.captchaCount >= 3) {
                captchaContainer.style.display = "none";
                form.style.display = "flex";
                security.revealNextRequirement();
            } else {
                switch (security.captchaCount) {
                    case 1:
                        currentCaptcha = security.generateImageCaptcha();
                        captchaPrompt.textContent = currentCaptcha.instructions;
                        captchaContent.innerHTML = currentCaptcha.svg;
                        captchaInput.style.display = "none";

                        const selectedShapes = new Set();
                        currentCaptcha.selectedShapes = selectedShapes;

                        document
                            .querySelectorAll(".captcha-shape")
                            .forEach((shape) => {
                                shape.onclick = (e) => {
                                    const index = Number(
                                        e.target.getAttribute("data-index")
                                    );
                                    if (selectedShapes.has(index)) {
                                        selectedShapes.delete(index);
                                        e.target.style.stroke = "";
                                        e.target.style.strokeWidth = "";
                                    } else {
                                        selectedShapes.add(index);
                                        e.target.style.stroke = "#fff";
                                        e.target.style.strokeWidth = "2";
                                    }
                                };
                            });
                        break;

                    case 2:
                        currentCaptcha = security.generatePhilosophicalCaptcha();
                        captchaPrompt.textContent = currentCaptcha.question;
                        captchaContent.innerHTML = "";
                        captchaInput.style.display = "block";
                        break;
                }
                captchaInput.value = "";
            }
        } else {
            security.showNotification("Wrong answer! Try again.", "error");
            if (security.captchaCount === 1) {
                currentCaptcha.selectedShapes.clear();
                document.querySelectorAll(".captcha-shape").forEach((shape) => {
                    shape.style.stroke = "";
                    shape.style.strokeWidth = "";
                });
            }
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const success = await security.register(username, password);
        if (success) {
            document.getElementById("security-overlay").style.display = "none";
        }
    });

    // Handle "Skip Security" button
    skipSecurityButton.addEventListener("click", () => {
        document.getElementById("security-overlay").style.display = "none";
        playPrettyGoodVideo();
    });
});