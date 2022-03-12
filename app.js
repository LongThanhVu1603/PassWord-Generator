// DOM Event
const resultPW = document.getElementById('result');
const clipboardPW = document.getElementById('clipboard');
const lengthPW = document.getElementById('length');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const numBers = document.getElementById('numbers');
const symBols = document.getElementById('symbols');
const geneRate = document.getElementById('generate');


const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Get characters
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

//When click on button Generate Password
geneRate.addEventListener('click', () => {
	const length = +lengthPW.value;
	const hasLower = lowerCase.checked;
	const hasUpper = upperCase.checked;
	const hasNumber = numBers.checked;
	const hasSymbol = symBols.checked;
	
	resultPW.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});

function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	//Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	//create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

//Copy PassWord into temporary memory when generate done
clipboardPW.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultPW.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});