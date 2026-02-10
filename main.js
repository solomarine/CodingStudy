
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const lottoSetsContainer = document.getElementById('lotto-sets-container');

    const generateLottoSet = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const displayLottoSets = () => {
        lottoSetsContainer.innerHTML = ''; // 이전 번호 삭제
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

    generateBtn.addEventListener('click', displayLottoSets);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // 아이콘 변경 로직 추가 가능
    });

    // 초기 로딩 시 번호 생성
    displayLottoSets();
});
