export const RegEx = {
	CHECKING_NUMBER: /(?=.*[0-9])/,
	CHECKING_SPECIAL_CHARACTER: /(?=.*[!@#\$%\^&\*])/,
	CHECKING_EMAIL:
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};
//                                                FIXME:For the email 
// 1.The email address must begin with one or more characters that can be any combination of letters, numbers, and certain special characters (e.g., .!#$%&'*+/=?^_`{|}~-).
// 2.The email address must contain an @ symbol.
// 3.After the @ symbol, there must be one or more characters that can be any combination of letters, numbers, and certain special characters (e.g., -).
// 4.After the first part of the email address, there can be any number of periods (.) followed by more characters that can be any combination of letters, numbers, and certain special characters (e.g., -)