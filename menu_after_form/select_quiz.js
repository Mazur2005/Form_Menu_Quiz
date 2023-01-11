const quizHtml = document.querySelector(".quiz-HTML a");
const quizCss = document.querySelector(".quiz-CSS a");
const quizJs = document.querySelector(".quiz-JS a");

let value = localStorage.getItem("value");

import { objectQuestionsHtml } from "./question_quiz/question_HTML.js";
import { objectQuestionsCss } from "./question_quiz/questions_CSS.js";
import { objectQuestionsJs } from "./question_quiz/question_JS.js";

export const selectQuestion = () => {
	if (value === "HTML") {
		return objectQuestionsHtml;
	} else if (value === "CSS") {
		return objectQuestionsCss;
	} else if (value === "JS") {
		return objectQuestionsJs;
	}
};

const selectQuiz = (quizName, whatKindOfQuiz) => {
	localStorage.setItem("value", quizName);
	whatKindOfQuiz.setAttribute("href", "/menu_after_form/quiz/quiz.html");
	selectQuestion();
};

quizHtml?.addEventListener("click", () => {
	selectQuiz("HTML", quizHtml);
});

quizCss?.addEventListener("click", () => {
	selectQuiz("CSS", quizCss);
});

quizJs?.addEventListener("click", () => {
	selectQuiz("JS", quizJs);
});
