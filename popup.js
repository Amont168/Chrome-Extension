document.addEventListener("DOMContentLoaded", () => {
    let countdown;
    let clickInterval;
    let timerRunning = false;

    function startCountdown(seconds, callback) {
        const timerDisplay = document.getElementById('timer');
        timerDisplay.textContent = `Time remaining: ${seconds} seconds`;

        countdown = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(countdown);
                callback();
            } else {
                timerDisplay.textContent = `Time remaining: ${seconds} seconds`;
            }
        }, 1000);
    }

    function handleFirstCountdown() {
        const startButton = document.getElementById('start-stop');
        startButton.textContent = 'Stop Timer';

        const initialCountdownDuration = 30;
        startCountdown(initialCountdownDuration, handleSecondCountdown);
    }

    function handleSecondCountdown() {
        const secondCountdownDuration = 10;
        const timerDisplay = document.getElementById('timer');

        startCountdown(secondCountdownDuration, () => {
            timerDisplay.textContent = 'Finished!';
            resetTimerText();
        });

        clickInterval = setInterval(() => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['content.js']
                });
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(clickInterval);
            resetTimerText();
        }, secondCountdownDuration * 1000);
    }

    function resetTimerText() {
        const startButton = document.getElementById('start-stop');
        startButton.textContent = 'Start Timer';
        timerRunning = false;
    }

    function stopCountdown() {
        clearInterval(countdown);
        clearInterval(clickInterval);
        const timerDisplay = document.getElementById('timer');
        timerDisplay.textContent = 'Stopped.';
        resetTimerText();
    }

    document.getElementById('start-stop').addEventListener('click', () => {
        if (timerRunning) {
            stopCountdown();
        } else {
            timerRunning = true;
            handleFirstCountdown();
        }
    });
});
