
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const lottoSetsContainer = document.getElementById('lotto-sets-container');

    // New elements for lotto type selection
    const regularLottoRadio = document.getElementById('regular-lotto');
    const pensionLottoRadio = document.getElementById('pension-lotto');
    const regularLottoDisplay = document.getElementById('regular-lotto-display');
    const pensionLottoDisplay = document.getElementById('pension-lotto-display');

    // New elements for pension lotto display
    const pensionGroupSpan = document.getElementById('pension-group');
    const pensionNumberDigits = document.querySelectorAll('.pension-number-digit');

    // Function to generate regular lotto numbers
    const generateLottoSet = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const displayLottoSets = () => {
        lottoSetsContainer.innerHTML = ''; // Clear previous numbers
        for (let i = 0; i < 5; i++) {
            const lottoSet = generateLottoSet();
            const setElement = document.createElement('div');
            setElement.classList.add('lotto-set');

            const numbersElement = document.createElement('div');
            numbersElement.classList.add('lotto-numbers');

            lottoSet.forEach(number => {
                const numberElement = document.createElement('span');
                numberElement.classList.add('lotto-number');
                numberElement.textContent = number;
                numbersElement.appendChild(numberElement);
            });

            setElement.appendChild(numbersElement);
            lottoSetsContainer.appendChild(setElement);
        }
    };

    // Function to generate pension lotto numbers
    const generatePensionLottoNumbers = () => {
        const group = Math.floor(Math.random() * 5) + 1; // 1 to 5 조
        const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // 000000 to 999999

        pensionGroupSpan.textContent = `${group}조`;
        pensionNumberDigits.forEach((span, index) => {
            span.textContent = number[index];
        });
    };

    // Event listener for generate button
    generateBtn.addEventListener('click', () => {
        if (regularLottoRadio.checked) {
            displayLottoSets();
        } else if (pensionLottoRadio.checked) {
            generatePensionLottoNumbers();
        }
    });

    // Event listeners for lotto type selection
    regularLottoRadio.addEventListener('change', () => {
        if (regularLottoRadio.checked) {
            regularLottoDisplay.style.display = 'block';
            pensionLottoDisplay.style.display = 'none';
            displayLottoSets(); // Generate numbers for regular lotto when selected
        }
    });

    pensionLottoRadio.addEventListener('change', () => {
        if (pensionLottoRadio.checked) { // Corrected variable name from pottoLottoRadio to pensionLottoRadio
            regularLottoDisplay.style.display = 'none';
            pensionLottoDisplay.style.display = 'block';
            generatePensionLottoNumbers(); // Generate numbers for pension lotto when selected
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Add icon change logic if needed
    });

    // Initial load: display regular lotto numbers
    // And ensure correct display based on initial checked state
    if (regularLottoRadio.checked) {
        displayLottoSets();
        pensionLottoDisplay.style.display = 'none';
    } else {
        generatePensionLottoNumbers();
        regularLottoDisplay.style.display = 'none';
    }
});
