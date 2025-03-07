fetch(chrome.runtime.getURL('buttons.txt'))
  .then(response => response.text())
  .then(data => {
    const selectors = data.split('\n').map(line => line.trim()).filter(line => line);

    setTimeout(() => {
      let currentIndex = 0;

      const clickInterval = setInterval(() => {
        if (currentIndex >= selectors.length) {
          clearInterval(clickInterval);
          return;
        }

        const selector = selectors[currentIndex];
        const button = document.querySelector(selector);

        if (button) {
          button.click();
          console.log(`Clicked: ${selector}`);
        } else {
          console.warn(`Button not found: ${selector}`);
        }

        currentIndex++;
      }, 10000); // 10 seconds
    }, 30000); // 30 seconds
  })
  .catch(error => console.error('Error loading button selectors:', error));
