import { selectQuestion } from "../../menu/js/select_quiz";

const body = document.querySelector("body");
const hiddenAfterEndQuiz = document.querySelectorAll(".hidden-after-end-quiz");

const showQuestion = document.querySelector(".question p");
const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
const thirdOption = document.querySelector(".three-option");
const fourthOption = document.querySelector(".fourth-option");

const nextBtn = document.querySelector(".next-btn");

const score = document.querySelector(".score");
const finalScore = document.querySelector(".final-score");
const finalScoreBox = document.querySelector(".final-score-box");

const time = document.querySelector(".time");

const objectQuestions = selectQuestion();

const INDEX_FIRST_ANSWER = 0;
const INDEX_SECUND_ANSWER = 1;
const INDEX_THIRD_ANSWER = 2;
const INDEX_FOURTH_ANSWER = 3;

let question = Math.floor(Math.random() * objectQuestions.length);
let objectAnswer = objectQuestions[question].answer;

let answersIndexes = [
	Math.floor(Math.random() * objectAnswer.length),
	Math.floor(Math.random() * objectAnswer.length),
	Math.floor(Math.random() * objectAnswer.length),
	Math.floor(Math.random() * objectAnswer.length),
];

const getSecundIndexIsEqualToFirstIndex = () => {
	return (
		answersIndexes[INDEX_FIRST_ANSWER] === answersIndexes[INDEX_SECUND_ANSWER]
	);
};
const getThirdIndexIsEqualToFirstAndSecundIndex = () => {
	return (
		answersIndexes[INDEX_FIRST_ANSWER] === answersIndexes[INDEX_THIRD_ANSWER] ||
		answersIndexes[INDEX_SECUND_ANSWER] === answersIndexes[INDEX_THIRD_ANSWER]
	);
};
const getFourthIndexIsEqualToFirstAndSecundAndThirdIndex = () => {
	return (
		answersIndexes[INDEX_FIRST_ANSWER] === answersIndexes[INDEX_FOURTH_ANSWER] ||
		answersIndexes[INDEX_SECUND_ANSWER] === answersIndexes[INDEX_FOURTH_ANSWER] ||
		answersIndexes[INDEX_THIRD_ANSWER] === answersIndexes[INDEX_FOURTH_ANSWER]
	);
};

let count = 0;
let askedQuestions = [];
let sec;

const getDoneAllQuiz = () => {
	return askedQuestions.length === objectQuestions.length;
};

const getQuestion = () => {
	return (showQuestion.textContent = objectQuestions[question].question);
};

const getIndexFirstAnswer = objectAnswer => {
	return (firstOption.textContent =
		objectAnswer[answersIndexes[INDEX_FIRST_ANSWER]].text);
};

const getIndexSecundAnswer = objectAnswer => {
	while (getSecundIndexIsEqualToFirstIndex()) {
		answersIndexes[INDEX_SECUND_ANSWER] = Math.floor(
			Math.random() * objectAnswer.length
		);
	}
	return (secondOption.textContent =
		objectAnswer[answersIndexes[INDEX_SECUND_ANSWER]].text);
};

const getIndexThirdAnswer = objectAnswer => {
	while (getThirdIndexIsEqualToFirstAndSecundIndex()) {
		answersIndexes[INDEX_THIRD_ANSWER] = Math.floor(
			Math.random() * objectAnswer.length
		);
	}
	return (thirdOption.textContent =
		objectAnswer[answersIndexes[INDEX_THIRD_ANSWER]].text);
};

const getIndexFourthAnswer = objectAnswer => {
	while (getFourthIndexIsEqualToFirstAndSecundAndThirdIndex()) {
		answersIndexes[INDEX_FOURTH_ANSWER] = Math.floor(
			Math.random() * objectAnswer.length
		);
	}
	return (fourthOption.textContent =
		objectAnswer[answersIndexes[INDEX_FOURTH_ANSWER]].text);
};

const randomAnswers = objectAnswer => {
	getIndexFirstAnswer(objectAnswer);
	getIndexSecundAnswer(objectAnswer);
	getIndexThirdAnswer(objectAnswer);
	getIndexFourthAnswer(objectAnswer);
};

const getNewObjectAnswer = question => {
	objectAnswer = objectQuestions[question].answer;
	return randomAnswers(objectAnswer);
};

const pushedAskedQuestion = () => {
	askedQuestions.push(question);
};

const changeQuestion = () => {
	while (askedQuestions.includes(question)) {
		question = Math.floor(Math.random() * objectQuestions.length);
		console.log(question);
		if (!askedQuestions.includes(question)) break;
	}
	getNewObjectAnswer(question);
	getQuestion();
};

const nextQuestion = () => {
	returnColor();
	changeQuestion();
	countTime();
};

const countTime = () => {
	clearInterval(sec);
	let fullTime = 30;
	sec = setInterval(() => {
		time.textContent = `Time:  ${fullTime}`;
		fullTime--;
		if (fullTime === 0) {
			clearInterval(sec);
			time.textContent = `Time:  0${fullTime}`;
			allOptionsAnswers();
		} else if (fullTime < 10) {
			time.textContent = `Time:  0${fullTime}`;
		}
	}, 1000);
};

const countScore = () => {
	count++;
	score.textContent = `Score : ${count}`;
};

const getWrongAnswerColor = () => {
	return (body.style.backgroundColor = "red");
};

const getCorrectAnswerColor = () => {
	return (body.style.backgroundColor = "blue");
};

const returnColor = () => {
	setTimeout(() => {
		body.style.background =
			"radial-gradient(circle,rgba(238, 174, 202, 0.5830707282913166) 0%,rgba(148, 187, 233, 1) 100%";
	}, 200);
};

const getConvertPointToPercentage = () => {
	const Percentage = (count * 100) / objectQuestions.length;
	return `${Math.floor(Percentage)}%`;
};

const result = () => {
	returnColor();
	hiddenAfterEndQuiz.forEach(el => (el.style.visibility = "hidden"));
	finalScoreBox.style.visibility = "visible";
	finalScore.textContent = score.textContent = `Score : ${count}/${
		objectQuestions.length
	}, it is ${getConvertPointToPercentage()}`;
};

const delayAfterClickAnswer = () => {
	setTimeout(function () {
		nextQuestion();
	}, 200);
};

const continueOrEndQuiz = () => {
	getDoneAllQuiz() ? result() : delayAfterClickAnswer();
};

const allOptionsAnswers = numberOfIndex => {
	pushedAskedQuestion();

	if (objectAnswer[answersIndexes[numberOfIndex]]?.correct) {
		countScore();
		getCorrectAnswerColor();
		continueOrEndQuiz();
	} else {
		getWrongAnswerColor();
		continueOrEndQuiz();
	}
};

getQuestion();
randomAnswers(objectAnswer);
countTime();

nextBtn.addEventListener("click", allOptionsAnswers);

firstOption.addEventListener("click", () => {
	allOptionsAnswers(INDEX_FIRST_ANSWER);
});
secondOption.addEventListener("click", () => {
	allOptionsAnswers(INDEX_SECUND_ANSWER);
});
thirdOption.addEventListener("click", () => {
	allOptionsAnswers(INDEX_THIRD_ANSWER);
});
fourthOption.addEventListener("click", () => {
	allOptionsAnswers(INDEX_FOURTH_ANSWER);
});

export * from "./script_quiz.js";
