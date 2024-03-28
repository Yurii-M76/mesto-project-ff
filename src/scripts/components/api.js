export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '16f0e5f5-827d-4c0b-b4a9-5f08e8999d36',
    'Content-Type': 'application/json'
  }
}

export const request = (url, options) => {
  return fetch(`${config.baseUrl}${url}`, options).then(checkResponse);
}

export const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const requestError = (err) => {
  console.error(`Ошибка: ${err}`);
}

export const updateUserProfile = (name, about) => {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    }),
    headers: config.headers
  })
}

export const updateUserAvatar = (src) => {
  return request(`/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: src
    }),
    headers: config.headers
  })
}

export const addNewCard = (name, src) => {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: src
    }),
    headers: config.headers
  })
}

export const handleLikeButton = (id, button, isLike) => {
  if(!button.classList.contains(isLike)) {
    return request(`/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    })
  } else {
    return request(`/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
  }
}

export const deleteCard = (id) => {
  return request(`/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const userData = request('/users/me', { headers: config.headers });
export const cardsData = request('/cards', { headers: config.headers });