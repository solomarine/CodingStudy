document.getElementById('generate-btn').addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    const numberElements = document.querySelectorAll('.lotto-number');
    numberElements.forEach((element, index) => {
        element.textContent = sortedNumbers[index];
    });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
