export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '16f0e5f5-827d-4c0b-b4a9-5f08e8999d36',
    'Content-Type': 'application/json'
  }
}

export const getUserData = (data) => {
  request('/users/me', { headers: config.headers })
    .then(checkResponse)
    .then((user) => {
      data.name.textContent = user.name;
      data.job.textContent = user.about;
      data.image.style = `background-image: url(${user.avatar});`;
    })
    .catch(requestError);
}

export const sendUserData = (data) => {
  request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name.value,
      about: data.job.value
    }),
    headers: config.headers
  })
  .then(checkResponse)
  .then((user) => {
    data.name.textContent = user.name;
    data.name.textContent = user.about;
  })
  .catch(requestError);
}

export const initialCards = (funcCreateCard) => {
  request('/cards', { headers: config.headers })
    .then(checkResponse)
    .then((data) => {
      data.forEach(funcCreateCard);
    })
    .catch(requestError);
}

export const addNewCard = (data) => {
  request('/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name.value,
      link: data.link.value
    }),
    headers: config.headers
  })
  .then(checkResponse)
  .catch(requestError);
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