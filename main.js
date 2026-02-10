
document.addEventListener('DOMContentLoaded', () => {
    const generateBtnRegular = document.getElementById('generate-btn-regular');
    const generateBtnPension = document.getElementById('generate-btn-pension');
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

    // New elements for draw dates
    const regularLottoDrawDate = document.getElementById('regular-lotto-draw-date');
    const pensionLottoDrawDate = document.getElementById('pension-lotto-draw-date');

    // Helper function to get the next specific day of the week
    const getNextDrawDate = (dayOfWeek) => { // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const today = new Date();
        const currentDay = today.getDay();
        let daysUntilNextDraw = dayOfWeek - currentDay;
        if (daysUntilNextDraw <= 0) {
            daysUntilNextDraw += 7; // If it's today or past, get next week's day
        }
        const nextDrawDate = new Date(today);
        nextDrawDate.setDate(today.getDate() + daysUntilNextDraw);

        const year = nextDrawDate.getFullYear();
        const month = String(nextDrawDate.getMonth() + 1).padStart(2, '0');
        const day = String(nextDrawDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

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

    // Event listener for regular lotto generate button
    generateBtnRegular.addEventListener('click', () => {
        displayLottoSets();
    });

    // Event listener for pension lotto generate button
    generateBtnPension.addEventListener('click', () => {
        generatePensionLottoNumbers();
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
        if (pensionLottoRadio.checked) {
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

    // Display draw dates on initial load
    regularLottoDrawDate.textContent = `다음 추첨일: ${getNextDrawDate(6)} (토요일)`; // 6 for Saturday
    pensionLottoDrawDate.textContent = `다음 추첨일: ${getNextDrawDate(4)} (목요일)`; // 4 for Thursday
});
