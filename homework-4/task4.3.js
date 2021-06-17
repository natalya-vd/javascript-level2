//Решение задачи 3

const nameUser = /^[A-zА-яЁё]+$/;
const tel = /\+7\(\d{3}\)\d{3}-\d{4}$/;
const email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const MESSAGE_MISTAKE_TEXT = 'Имя содержит только буквы';
const MESSAGE_MISTAKE_TEL = 'Телефон имеет вид +7(000)000-0000';
const MESSAGE_MISTAKE_EMAIL = 'E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'


function control() {
    checkInput(nameUser, 'text', MESSAGE_MISTAKE_TEXT, 'mistake-text');
    checkInput(tel, 'tel', MESSAGE_MISTAKE_TEL, 'mistake-tel');
    checkInput(email, 'email', MESSAGE_MISTAKE_EMAIL, 'mistake-email');
}

function checkInput(regName, className, message, classMistake) {
    if(!checkData(regName, className)) {
        getItem(className).classList.add('mistake');
        getItem(classMistake).innerHTML = `<p>${message}</p>`;
    }
    else {
        getItem(className).classList.remove('mistake');
        getItem(classMistake).innerHTML = '';
    }
};

function checkData(regName, className) {
    const data = document.querySelector(`.${className}`).value;
    return regName.test(data);
};

function getItem(className) {
    return document.querySelector(`.${className}`);
};

window.onload = () => {
    const button = document.querySelector('.button');
    button.addEventListener('click', control)
}