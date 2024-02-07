//Функция для проверки, является ли строка палиндромом

const checkIfPalyndrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0 ; i--) {
    newString += string[i];
  }
  return newString === string;
};
checkIfPalyndrome('Лёша на полке клопа нашёл ');

//Функция, которая принимает строку,
//извлекает содержащиеся в ней цифры от 0 до 9
//и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN.

const returnNumber = (string) => string.replace(/[^\d]/g, '').parseInt(string,10);
returnNumber('1 кефир, 0.5 батона');

//Функция, которая принимает три параметра: исходную строку,
//минимальную длину и строку с добавочными символами —
//и возвращает исходную строку, дополненную указанными символами до заданной длины.

const trimString = (string, minlength, addsymbols) => {
  if (string.length >= minlength) {
    return string;
  }
  if (string.length && addsymbols.length < minlength) {
    let message = '';
    for (let i = 0; i < minlength - string.length; i++) {
      message += addsymbols;
    }
    if (message.length > minlength) {
      return addsymbols.slice(0, minlength - string.length - addsymbols.length) + addsymbols + string;
    }
    return message + string;
  }
  if (addsymbols.length > minlength) {
    return addsymbols.slice(0, minlength - string.length) + string;
  }
};
trimString('q', 4, 'we');


//Функция для проверки длины строки
const checkLength = (string, limit) => string.length <= limit;
checkLength('проверяемая строка', 10);

