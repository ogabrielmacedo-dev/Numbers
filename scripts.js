// Variáveis globais
const drawContent = document.getElementById("draw-content");
const form = document.querySelector("form");
const resultContent = document.getElementById("section-result");

form.onsubmit = (e) => {
	e.preventDefault();

	const numbersAmount = document.getElementById("qnt").valueAsNumber;
	const minValue = document.getElementById("min").valueAsNumber;
	const maxValue = document.getElementById("max").valueAsNumber;
	const btnNoRepeat = document.getElementById("noRepeat").checked;

	range = maxValue - (minValue - 1);

	// Verificando se o valor mínimo é maior ou igual ao valor máximo.
	if (minValue > maxValue) {
		alert("O valor máximo precisa ser maior que o valor mínimo.");
		return;
	}

	// Verificando o switch de repetição
	if (!btnNoRepeat) {
		let chosenNumbers = drawNumbers(numbersAmount, minValue, maxValue);
		console.log(chosenNumbers);
		showResult(chosenNumbers);
	} else {
		// Verificando a quantidade de números com a quantidade no intervalo
		if (range < numbersAmount) {
			alert(
				"Quantidade de números no intervalo inferior à quantidade desejada para o sorteio. Por favor, insira um intervalo válido."
			);
			return;
		}

		let chosenNumbers = drawNumbersNoRepeat(numbersAmount, minValue, maxValue);
		console.log(chosenNumbers);
		showResult(chosenNumbers);
	}
};

// Função para sortear os números, incluindo números repetidos.
function drawNumbers(numbersAmount, minValue, maxValue) {
	const arrayNumbers = [];
	let index = 0;

	do {
		let number =
			Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

		arrayNumbers.push(number);
		index++;
	} while (index < numbersAmount);

	arrayNumbers.sort((a, b) => a - b);

	return arrayNumbers;
}

// Função para sortear os números, com exceção dos repetidos
function drawNumbersNoRepeat(numbersAmount, minValue, maxValue) {
	const arrayNumbers = [];
	let index = 0;

	do {
		let number =
			Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

		if (!arrayNumbers.includes(number)) {
			arrayNumbers.push(number);
			index++;
		}
	} while (index < numbersAmount);

	arrayNumbers.sort((a, b) => a - b);

	return arrayNumbers;
}

function showResult(chosenNumbers) {
	const resultContainer = document.querySelector(".result");
	resultContainer.innerHTML = "";

	drawContent.classList.toggle("hidden");
	resultContent.classList.toggle("hidden");

	chosenNumbers.forEach((num, index) => {
		setTimeout(() => {
			// cria o "container result"
			const itemResult = document.createElement("label");
			itemResult.classList.add("item-result");

			// cria o quadrado animado
			const square = document.createElement("div");
			square.classList.add("square");
			itemResult.appendChild(square);

			// cria o texto do número
			const numberText = document.createElement("span");
			numberText.textContent = num;
			numberText.classList.add("number-text");
			itemResult.appendChild(numberText);

			resultContainer.appendChild(itemResult);

			// aparece o texto
			setTimeout(() => {
				numberText.classList.add("show-text");
			}, 400);

			// remove o square
			setTimeout(() => {
				square.remove();
			}, 2500);
		}, index * 3000);
	});
}
