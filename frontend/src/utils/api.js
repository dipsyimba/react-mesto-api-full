class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }

  setUserInfo(name, occupation) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: occupation,
      }),
    }).then((res) => this._getResponse(res));
  }

  setNewCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponse(res));
  }

  setAvatar(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponse(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
    }).then((response) => this._getResponse(response));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => this._getResponse(response));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
    }).then((response) => this._getResponse(response));
  }

  signOut() {
    return fetch(`${this._baseUrl}signout`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => this._getResponse(response));
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.world.nomoredomains.monster/',
});

export default api;
