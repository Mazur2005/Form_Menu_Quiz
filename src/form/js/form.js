import { incorrectInputText } from "./incorrect_input_text.js";
import { RegEx } from "./RegEx.js";
import { APIweather } from "./fetch_API_Weather.js";
import { APIerrors } from "./API_Errors.js";

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
	return (location.href = "../../menu/menu.html");
};

const createSyntax = (syntax, id, error, iconCheck, iconX) => {
	syntax.valueInput = document.querySelector(id);
	syntax.errorName = document.querySelector(error);
	syntax.iconCheck = document.querySelector(iconCheck);
	syntax.iconX = document.querySelector(iconX);
	syntax.InputIsCorrect = false;
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

const correctInput = syntax => {
	syntax.valueInput.classList.remove("underline");
	syntax.errorName.style.visibility = "hidden";
	syntax.errorName.textContent = "";
	syntax.iconCheck.style.visibility = "visible";
	syntax.iconX.style.visibility = "hidden";
	syntax.InputIsCorrect = true;
	correctAllInputs();
};

const inCorrectInput = (syntax, error) => {
	syntax.valueInput.classList.add("underline");
	syntax.errorName.style.visibility = "visible";
	syntax.errorName.textContent = error;
	syntax.iconCheck.style.visibility = "hidden";
	syntax.iconX.style.visibility = "visible";
	syntax.InputIsCorrect = false;
};

const callCorrectInput = whatKindOfInput => {
	switch (whatKindOfInput) {
		case inputName:
			correctInput(nameSyntax);
			break;

		case inputPassword:
			correctInput(passwordSyntax);
			break;

		case inputComparingPassword:
			correctInput(comparingPasswordSyntax);
			break;

		case inputCity:
			correctInput(citySyntax);
			break;

		case inputEmail:
			correctInput(emailSyntax);
			break;
	}
};

const callIncorrectInput = (whatKindOfInput, error) => {
	switch (whatKindOfInput) {
		case inputName:
			inCorrectInput(nameSyntax, error);
			break;

		case inputPassword:
			inCorrectInput(passwordSyntax, error);
			break;

		case inputComparingPassword:
			inCorrectInput(comparingPasswordSyntax, error);
			break;

		case inputCity:
			inCorrectInput(citySyntax, error);
			break;

		case inputEmail:
			inCorrectInput(emailSyntax, error);
			break;
	}
};

const checkUserName = () => {
	if (!RegEx.CHECKING_SPECIAL_CHARACTER.test(nameSyntax.valueInput.value)) {
		if (
			nameSyntax.valueInput.value.length >
			theMinimumNumberOfCharactersInTheNickname
		) {
			callCorrectInput(inputName);
		} else {
			callIncorrectInput(
				inputName,
				incorrectInputText.THE_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS
			);
		}
	} else {
		callIncorrectInput(inputName, incorrectInputText.FORBIDDEN_SPECIAL_CHARACTERS);
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
				callCorrectInput(inputPassword);
			} else {
				callIncorrectInput(inputPassword, incorrectInputText.ENTER_THE_NUMBER);
			}
		} else {
			callIncorrectInput(inputPassword, incorrectInputText.SPECIAL_CHARACTERS);
		}
	} else {
		callIncorrectInput(inputPassword, incorrectInputText.PASSWORD_IS_TOO_SHORT);
	}
};

const checkComparingPassword = () => {
	if (
		comparingPasswordSyntax.valueInput.value === password.value &&
		comparingPasswordSyntax.valueInput.value.length > 0
	) {
		callCorrectInput(inputComparingPassword);
	} else {
		callIncorrectInput(inputComparingPassword, incorrectInputText.PASSWORD_ARE_NOT_THE_SAME);
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
			callCorrectInput(inputCity);
			localStorage.setItem("problemWithCodeOrServer", false);
		})
		.catch(res => {
			if (
				res.response.status === APIerrors.BAD_REQUEST ||
				res.response.status === APIerrors.NOT_FOUND
			) {
				return callIncorrectInput(inputCity, incorrectInputText.INCORRECT_CITY_NAME);
			}
		})
		.catch(() => {
			localStorage.setItem("problemWithCodeOrServer", true);
			citySyntax.InputIsCorrect = true;
			correctAllInputs();
			problemWithServerOrCode.style.display = "none";
		});
};

const getUpperCaseFirstLetter = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const setNickName = () => {
	const nickName = getUpperCaseFirstLetter(nameSyntax.valueInput.value);
	sendNick(nickName);
};

const sendNick = nickName => {
	localStorage.setItem("nickName", `Hello ${nickName}`);
};

const setCity = city => {
	localStorage.setItem("city", city);
};

const checkEmail = () => {
	if (RegEx.CHECKING_EMAIL.test(emailSyntax.valueInput.value)) {
		callCorrectInput(inputEmail);
	} else {
		callIncorrectInput(inputEmail, incorrectInputText.INVALID_EMAIL);
	}
};

const correctAllInputs = () => {
	if (
		nameSyntax.InputIsCorrect &&
		passwordSyntax.InputIsCorrect &&
		comparingPasswordSyntax.InputIsCorrect &&
		citySyntax.InputIsCorrect &&
		emailSyntax.InputIsCorrect
	) {
		setNickName();
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

const checkInputs = e => {
	e.preventDefault();
	checkUserName();
	checkPassword();
	checkComparingPassword();
	checkCity();
	checkEmail();
};

clearFormBtn.addEventListener("click", clearError);

goNextBtn.addEventListener("click", e => {
	checkInputs(e);
});

styleInputInformation.forEach(input =>
	input.addEventListener("keypress", e => {
		if (e.key === "Enter") {
			checkInputs(e);
		}
	})
);

export * from "./form.js";
