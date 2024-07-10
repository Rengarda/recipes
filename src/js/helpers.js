import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

//Функция для установки таймаута выполнения запроса
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPromis = fetch(url);
    const res = await Promise.race([fetchPromis, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    alert(err);
  }
};