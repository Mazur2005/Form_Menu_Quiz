import { everyErrorText } from "./every_error_text.js";
import { RegEx } from "./RegEx.js";
import { APIweather } from "./fetch_API_Weather.js";
import { APIerrors } from "./APIErrors.js";

const controlButton = document.querySelector(".control-button");
const form = document.querySelector("form");
const endForm = document.querySelector(".end-form");
const endFormText = document.querySelector(".end-form-text");
const styleInputInformation = document.querySelectorAll(
	".style-input-information"
);
const problemWithServerOrCode = document.querySelector(
	".problem-with-server-or-code"
);

const allGoodAnswerIcon = document.querySelectorAll(".fa-check");
const allWrongAnswerIcon = document.querySelectorAll(".fa-x");

const goNextBtn = document.querySelector(".go-next-btn");
const clearFormBtn = document.querySelector(".clear-form-btn");

const theMinimumNumberOfCharactersInTheNickname = 2;
const theMinimumNumberOfCharactersInThePassword = 8;

const nameSyntax = {
	valueInput: document.querySelector("#username"),
	errorName: document.querySelector(".error-name"),
	iconCheck: document.querySelector(".icon-user-name-correct"),
	iconX: document.querySelector(".icon-user-name-incorrect"),
	InputIsCorrect: false,
};
const passwordSyntax = {
	valueInput: document.querySelector("#password"),
	errorName: document.querySelector(".error-password"),
	iconCheck: document.querySelector(".icon-password-correct"),
	iconX: document.querySelector(".icon-password-incorrect"),
	InputIsCorrect: false,
};

const ComparingPasswordsSyntax = {
	valueInput: document.querySelector("#password2"),
	errorName: document.querySelector(".error-password2"),
	iconCheck: document.querySelector(".icon-password2-correct"),
	iconX: document.querySelector(".icon-password2-incorrect"),
	InputIsCorrect: false,
};

const citySyntax = {
	valueInput: document.querySelector("#city"),
	errorName: document.querySelector(".error-city"),
	iconCheck: document.querySelector(".icon-city-correct"),
	iconX: document.querySelector(".icon-city-incorrect"),
	InputIsCorrect: false,
};

const emailSyntax = {
	valueInput: document.querySelector("#email"),
	errorName: document.querySelector(".error-email"),
	iconCheck: document.querySelector(".icon-email-correct"),
	iconX: document.querySelector(".icon-email-incorrect"),
	InputIsCorrect: false,
};

const allError = [
	nameSyntax.errorName,
	passwordSyntax.errorName,
	ComparingPasswordsSyntax.errorName,
	citySyntax.errorName,
	emailSyntax.errorName,
];

const everyGoodPath = syntax => {
	syntax.valueInput.classList.remove("underline");
	syntax.errorName.style.visibility = "hidden";
	syntax.errorName.textContent = "";
	syntax.iconCheck.style.visibility = "visible";
	syntax.iconX.style.visibility = "hidden";
	syntax.InputIsCorrect = true;
	allInputIsCorrect();
};
const everyError = (syntax, error) => {
	syntax.valueInput.classList.add("underline");
	syntax.errorName.style.visibility = "visible";
	syntax.errorName.textContent = error;
	syntax.iconCheck.style.visibility = "hidden";
	syntax.iconX.style.visibility = "visible";
	syntax.InputIsCorrect = false;
};

const sendGoodPath = whatKindOfInput => {
	switch (whatKindOfInput) {
		case "name":
			everyGoodPath(nameSyntax);
			break;

		case "password":
			everyGoodPath(passwordSyntax);
			break;

		case "ComparingPasswords":
			everyGoodPath(ComparingPasswordsSyntax);
			break;

		case "city":
			everyGoodPath(citySyntax);
			break;

		case "email":
			everyGoodPath(emailSyntax);
			break;
	}
};

const sendError = (whatKindOfInput, error) => {
	switch (whatKindOfInput) {
		case "name":
			everyError(nameSyntax, error);
			break;

		case "password":
			everyError(passwordSyntax, error);
			break;

		case "ComparingPasswords":
			everyError(ComparingPasswordsSyntax, error);
			break;

		case "city":
			everyError(citySyntax, error);
			break;

		case "email":
			everyError(emailSyntax, error);
			break;
	}
};

const checkUserName = () => {
	if (!RegEx.CHECKING_SPECIAL_CHARACTER.test(nameSyntax.valueInput.value)) {
		if (
			nameSyntax.valueInput.value.length >
			theMinimumNumberOfCharactersInTheNickname
		) {
			sendGoodPath("name");
		} else {
			sendError(
				"name",
				everyErrorText.THE_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS
			);
		}
	} else {
		sendError("name", everyErrorText.FORBIDDEN_SPECIAL_CHARACTERS);
	}
};

const checkPassword = () => {
	if (
		passwordSyntax.valueInput.value.length >=
		theMinimumNumberOfCharactersInThePassword
	) {
		if (
			RegEx.CHECKING_SPECIAL_CHARACTER.test(passwordSyntax.valueInput.value)
		) {
			if (RegEx.CHECKING_NUMBER.test(passwordSyntax.valueInput.value)) {
				sendGoodPath("password");
			} else {
				sendError("password", everyErrorText.ENTER_THE_NUMBER);
			}
		} else {
			sendError("password", everyErrorText.SPECIAL_CHARACTERS);
		}
	} else {
		sendError("password", everyErrorText.PASSWORD_IS_TOO_SHORT);
	}
};

const checkComparingPasswords = () => {
	if (
		ComparingPasswordsSyntax.valueInput.value === password.value &&
		ComparingPasswordsSyntax.valueInput.value.length > 0
	) {
		sendGoodPath("ComparingPasswords");
	} else {
		sendError("ComparingPasswords", everyErrorText.PASSWORD_ARE_NOT_THE_SAME);
	}
};

const checkCity = () => {
	const URL =
		APIweather.API_LINK +
		citySyntax.valueInput.value +
		APIweather.API_KEY +
		APIweather.API_UNITS;
	axios
		.get(URL)
		.then(res => {
			setCity(res.data.name);
			sendGoodPath("city");
			localStorage.setItem("problemWithCodeOrServer", false);
		})
		.catch(res => {
			if (
				res.response.status === APIerrors.BAD_REQUEST ||
				res.response.status === APIerrors.NOT_FOUND
			) {
				return sendError("city", everyErrorText.INCORRECT_CITY_NAME);
			}
		})
		.catch(() => {
			localStorage.setItem("problemWithCodeOrServer", true);
			citySyntax.InputIsCorrect = true;
			allInputIsCorrect();
			problemWithServerOrCode.style.display = "none";
		});
};

const UpperCaseFirstLetter = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const setCity = city => {
	localStorage.setItem("city", city);
};

const setNickName = () => {
	const nickName = UpperCaseFirstLetter(nameSyntax.valueInput.value);
	localStorage.setItem("nickName", `Hello ${nickName}`);
	endFormText.innerHTML = `Hello <b>${nickName}</b>, thanks for short form`;
};

const checkEmail = () => {
	if (RegEx.CHECKING_EMAIL.test(emailSyntax.valueInput.value)) {
		sendGoodPath("email");
	} else {
		sendError("email", everyErrorText.INVALID_EMAIL);
	}
};

const allInputIsCorrect = () => {
	if (
		nameSyntax.InputIsCorrect &&
		passwordSyntax.InputIsCorrect &&
		ComparingPasswordsSyntax.InputIsCorrect &&
		citySyntax.InputIsCorrect &&
		emailSyntax.InputIsCorrect
	) {
		allGoodAnswerIcon.forEach(i => (i.style.opacity = -1));
		controlButton.style.opacity = -1;
		form.style.display = "none";
		endForm.style.visibility = "visible";
		setNickName();
	}
};

const clearError = () => {
	allGoodAnswerIcon.forEach(icon => (icon.style.visibility = "hidden"));
	allWrongAnswerIcon.forEach(icon => (icon.style.visibility = "hidden"));
	allError.forEach(el => (el.style.visibility = "hidden"));
	styleInputInformation.forEach(el => {
		el.value = "";
		el.classList.remove("underline");
	});
};

const animationGoNextBtn = () => {
	goNextBtn.classList.add("animationAfterClickEnter");
	setTimeout(() => {
		goNextBtn.classList.remove("animationAfterClickEnter");
	}, 500);
};

clearFormBtn.addEventListener("click", clearError);

goNextBtn.addEventListener("click", e => {
	e.preventDefault();
	checkUserName();
	checkPassword();
	checkComparingPasswords();
	checkCity();
	checkEmail();
});

styleInputInformation.forEach(input =>
	input.addEventListener("keypress", e => {
		if (e.key === "Enter") {
			e.preventDefault();
			animationGoNextBtn();
			checkUserName();
			checkPassword();
			checkComparingPasswords();
			checkCity();
			checkEmail();
		}
	})
);
