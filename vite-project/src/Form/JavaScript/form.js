import { everyErrorText } from "./every_error_text.js";
import { RegEx } from "./RegEx.js";
import { APIweather } from "./fetch_API_Weather.js";
import { APIerrors } from "./APIErrors.js";

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

const inputName = "name";
const inputPassword = "password";
const inputComparingPassword = "comparingPassword";
const inputCity = "city";
const inputEmail = "email";

const nameSyntax = {};
const passwordSyntax = {};
const comparingPasswordSyntax = {};
const citySyntax = {};
const emailSyntax = {};

const sendToAnotherPage = () => {
	return (location.href = "../../Menu/menu.html");
};

const createSyntax = (whatSyntax, id, error, iconCheck, iconX) => {
	whatSyntax.valueInput = document.querySelector(id);
	whatSyntax.errorName = document.querySelector(error);
	whatSyntax.iconCheck = document.querySelector(iconCheck);
	whatSyntax.iconX = document.querySelector(iconX);
	whatSyntax.InputIsCorrect = false;
};

createSyntax(
	nameSyntax,
	"#username",
	".error-name",
	".icon-user-name-correct",
	".icon-user-name-incorrect"
);

createSyntax(
	passwordSyntax,
	"#password",
	".error-password",
	".icon-password-correct",
	".icon-password-incorrect"
);

createSyntax(
	comparingPasswordSyntax,
	"#password2",
	".error-password2",
	".icon-password2-correct",
	".icon-password2-incorrect"
);

createSyntax(
	citySyntax,
	"#city",
	".error-city",
	".icon-city-correct",
	".icon-city-incorrect"
);

createSyntax(
	emailSyntax,
	"#email",
	".error-email",
	".icon-email-correct",
	".icon-email-incorrect"
);

const allError = [
	nameSyntax.errorName,
	passwordSyntax.errorName,
	comparingPasswordSyntax.errorName,
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
		case inputName:
			everyGoodPath(nameSyntax);
			break;

		case inputPassword:
			everyGoodPath(passwordSyntax);
			break;

		case inputComparingPassword:
			everyGoodPath(comparingPasswordSyntax);
			break;

		case inputCity:
			everyGoodPath(citySyntax);
			break;

		case inputEmail:
			everyGoodPath(emailSyntax);
			break;
	}
};

const sendError = (whatKindOfInput, error) => {
	switch (whatKindOfInput) {
		case inputName:
			everyError(nameSyntax, error);
			break;

		case inputPassword:
			everyError(passwordSyntax, error);
			break;

		case inputComparingPassword:
			everyError(comparingPasswordSyntax, error);
			break;

		case inputCity:
			everyError(citySyntax, error);
			break;

		case inputEmail:
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
			sendGoodPath(inputName);
		} else {
			sendError(
				inputName,
				everyErrorText.THE_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS
			);
		}
	} else {
		sendError(inputName, everyErrorText.FORBIDDEN_SPECIAL_CHARACTERS);
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
				sendGoodPath(inputPassword);
			} else {
				sendError(inputPassword, everyErrorText.ENTER_THE_NUMBER);
			}
		} else {
			sendError(inputPassword, everyErrorText.SPECIAL_CHARACTERS);
		}
	} else {
		sendError(inputPassword, everyErrorText.PASSWORD_IS_TOO_SHORT);
	}
};

const checkComparingPassword = () => {
	if (
		comparingPasswordSyntax.valueInput.value === password.value &&
		comparingPasswordSyntax.valueInput.value.length > 0
	) {
		sendGoodPath(inputComparingPassword);
	} else {
		sendError(inputComparingPassword, everyErrorText.PASSWORD_ARE_NOT_THE_SAME);
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
			sendGoodPath(inputCity);
			localStorage.setItem("problemWithCodeOrServer", false);
		})
		.catch(res => {
			if (
				res.response.status === APIerrors.BAD_REQUEST ||
				res.response.status === APIerrors.NOT_FOUND
			) {
				return sendError(inputCity, everyErrorText.INCORRECT_CITY_NAME);
			}
		})
		.catch(() => {
			localStorage.setItem("problemWithCodeOrServer", true);
			citySyntax.InputIsCorrect = true;
			allInputIsCorrect();
			problemWithServerOrCode.style.display = "none";
		});
};

const upperCaseFirstLetter = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const sendNickName = () => {
	const nickName = upperCaseFirstLetter(nameSyntax.valueInput.value);
	setNick(nickName);
};

const setNick = nickName => {
	localStorage.setItem("nickName", `Hello ${nickName}`);
};

const setCity = city => {
	localStorage.setItem("city", city);
};

const checkEmail = () => {
	if (RegEx.CHECKING_EMAIL.test(emailSyntax.valueInput.value)) {
		sendGoodPath(inputEmail);
	} else {
		sendError(inputEmail, everyErrorText.INVALID_EMAIL);
	}
};

const allInputIsCorrect = () => {
	if (
		nameSyntax.InputIsCorrect &&
		passwordSyntax.InputIsCorrect &&
		comparingPasswordSyntax.InputIsCorrect &&
		citySyntax.InputIsCorrect &&
		emailSyntax.InputIsCorrect
	) {
		sendNickName();
		sendToAnotherPage();
	}
};

const clearError = e => {
	e.preventDefault();
	allGoodAnswerIcon.forEach(icon => (icon.style.visibility = "hidden"));
	allWrongAnswerIcon.forEach(icon => (icon.style.visibility = "hidden"));
	allError.forEach(el => (el.style.visibility = "hidden"));
	styleInputInformation.forEach(el => {
		el.value = "";
		el.classList.remove("underline");
	});
};

const checkFunctions = e => {
	e.preventDefault();
	checkUserName();
	checkPassword();
	checkComparingPassword();
	checkCity();
	checkEmail();
};

clearFormBtn.addEventListener("click", clearError);

goNextBtn.addEventListener("click", e => {
	checkFunctions(e);
});

styleInputInformation.forEach(input =>
	input.addEventListener("keypress", e => {
		if (e.key === "Enter") {
			checkFunctions(e);
		}
	})
);

export * from "./form.js";
