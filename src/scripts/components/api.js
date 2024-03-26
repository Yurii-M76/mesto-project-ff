export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '16f0e5f5-827d-4c0b-b4a9-5f08e8999d36',
    'Content-Type': 'application/json'
  }
}

export const request = (url, options) => {
  return fetch(`${config.baseUrl}${url}`, options);
}

export const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const requestError = (err) => {
  console.log(err);
}

export const userData = new Promise((resolve) => {
  return request('/users/me', { headers: config.headers })
  .then(checkResponse)
  .then(resolve)
  .catch(requestError)
});

export const cardsData = new Promise((resolve) => {
  return request('/cards', { headers: config.headers })
  .then(checkResponse)
  .then(resolve)
  .catch(requestError);
});