import { selectQuestion } from "../select_quiz.js";

window.onload = function () {
	const body = document.querySelector("body");
	const hiddenBeforeClickStart = document.querySelector(
		".hidden-before-click-start"
	);
	const panelBeforeQuiz = document.querySelector(".panel-before-quiz");

	const question = document.querySelector(".question p");
	const firstOption = document.querySelector(".first-option");
	const secondOption = document.querySelector(".second-option");
	const thirdOption = document.querySelector(".three-option");
	const fourthOption = document.querySelector(".fourth-option");

	const nextBtn = document.querySelector(".next-btn");
	const startBtn = document.querySelector(".start");

	const score = document.querySelector(".score");
	const finalScore = document.querySelector(".final-score");
	const finalScoreBody = document.querySelector(".final-score-body");

	const time = document.querySelector(".time");

	const objectQuestions = selectQuestion();

	let questionNumber = Math.floor(Math.random() * objectQuestions.length);
	let answerIndex = objectQuestions[questionNumber].answer;
	let index = [
		Math.floor(Math.random() * answerIndex.length),
		Math.floor(Math.random() * answerIndex.length),
		Math.floor(Math.random() * answerIndex.length),
		Math.floor(Math.random() * answerIndex.length),
	];

	let askIndexes = [];
	let count = 0;
	let fullTime = 30;
	let sec;

	const showQuestion = () => {
		question.textContent = objectQuestions[questionNumber].question;
	};

	const firstTimeOptions = () => {
		firstOption.textContent = answerIndex[index[0]].text;

		while (index[0] === index[1]) {
			index[1] = Math.floor(Math.random() * answerIndex.length);
		}
		secondOption.textContent = answerIndex[index[1]].text;

		while (index[0] === index[2] || index[1] === index[2]) {
			index[2] = Math.floor(Math.random() * answerIndex.length);
		}
		thirdOption.textContent = answerIndex[index[2]].text;

		while (
			index[0] === index[3] ||
			index[1] === index[3] ||
			index[2] === index[3]
		) {
			index[3] = Math.floor(Math.random() * answerIndex.length);
		}
		fourthOption.textContent = answerIndex[index[3]].text;
	};

	const optionsAfterClick = answer => {
		if (answer) {
			firstOption.textContent = answer[index[0]].text;

			while (index[0] === index[1]) {
				index[1] = Math.floor(Math.random() * answerIndex.length);
				if (
					index[0] !== index[1] ||
					askIndexes.length === objectQuestions.length
				)
					break;
			}

			secondOption.textContent = answer[index[1]].text;

			while (index[0] === index[2] || index[1] === index[2]) {
				index[2] = Math.floor(Math.random() * answerIndex.length);
				if (
					index[0] !== index[1] ||
					askIndexes.length === objectQuestions.length
				)
					break;
			}

			thirdOption.textContent = answer[index[2]].text;

			while (
				index[0] === index[3] ||
				index[1] === index[3] ||
				index[2] === index[3]
			) {
				index[3] = Math.floor(Math.random() * answerIndex.length);
				if (
					index[0] !== index[1] ||
					askIndexes.length === objectQuestions.length
				)
					break;
			}

			fourthOption.textContent = answer[index[3]].text;
		}

		firstTimeOptions();
	};

	const changeQuestion = () => {
		askIndexes.push(questionNumber);
		while (askIndexes.includes(questionNumber)) {
			questionNumber = Math.floor(Math.random() * objectQuestions.length);
			if (
				!askIndexes.includes(questionNumber) ||
				askIndexes.length === objectQuestions.length
			)
				break;
		}

		answerIndex = objectQuestions[questionNumber].answer;

		optionsAfterClick(answerIndex);
		showQuestion();
	};

	const result = () => {
		if (askIndexes.length === objectQuestions.length) {
			hiddenBeforeClickStart.style.display = "none";
			finalScoreBody.style.display = "flex";
			finalScore.textContent = score.textContent = `Score : ${count}/${
				objectQuestions.length
			}, it is ${convertPointToPercentage()}`;
		}
	};

	const countTime = () => {
		clearInterval(sec);
		fullTime = 30;
		sec = setInterval(() => {
			time.textContent = `Time:  ${fullTime}`;
			fullTime--;
			if (fullTime === 0) {
				clearInterval(sec);
				time.textContent = `Time:  0${fullTime}`;
				nextQuestion();
			} else if (fullTime < 10) {
				time.textContent = `Time:  0${fullTime}`;
			}
		}, 1000);
	};

	const nextQuestion = () => {
		if (askIndexes.length != objectQuestions.length) {
			changeQuestion();
			countTime();
			result();
		}
	};

	const countScore = () => {
		count++;
		score.textContent = `Score : ${count}`;
	};

	const wrongAnswer = () => {
		body.style.backgroundColor = "red";
	};

	const correctAnswer = () => {
		body.style.backgroundColor = "blue";
	};

	const returnColor = () => {
		setTimeout(() => {
			body.style.background =
				"linear-gradient(rgba(0, 0, 3, 0.4), rgb(255,192,203))";
		}, 200);
	};

	const afterClickOption = () => {
		setTimeout(function () {
			nextQuestion();
			returnColor();
			result();
		}, 200);
	};

	const allOptionAnswer = param => {
		if (answerIndex[index[param - 1]]?.correct) {
			correctAnswer();
			countScore();
			afterClickOption();
		} else {
			wrongAnswer();
			afterClickOption();
		}
	};

	const convertPointToPercentage = () => {
		const Percentage = (count * 100) / objectQuestions.length;
		return `${Math.floor(Percentage)}%`;
	};

	const start = () => {
		panelBeforeQuiz.style.display = "none";
		hiddenBeforeClickStart.style.display = "flex";
		hiddenBeforeClickStart.style.transition = "all 2s";
		showQuestion();
		optionsAfterClick();
		countTime();
	};

	startBtn.addEventListener("click", start);
	nextBtn.addEventListener("click", nextQuestion);

	firstOption.addEventListener("click", () => {
		allOptionAnswer(1);
	});
	secondOption.addEventListener("click", () => {
		allOptionAnswer(2);
	});
	thirdOption.addEventListener("click", () => {
		allOptionAnswer(3);
	});
	fourthOption.addEventListener("click", () => {
		allOptionAnswer(4);
	});
};
