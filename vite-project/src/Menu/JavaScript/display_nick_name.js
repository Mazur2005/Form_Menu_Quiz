const nickName = document.querySelector(".container-welcome-text h1");
const displayNickName = () => {
	nickName.textContent = localStorage.getItem("nickName");
};

displayNickName();

export * from './display_nick_name.js';