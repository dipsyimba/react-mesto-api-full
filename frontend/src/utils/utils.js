//Попап добавления карточки
export const formAdd = document.querySelector('.popup__form_type_create');
export const createCardPopup = document.querySelector('.popup_add');
export const addCardName = document.querySelector('.popup__input_add_name');
export const addCardLink = document.querySelector('.popup__input_add_link');

//Попап редактирования профиля
export const btnEditProfile = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.popup__input_profile_name');
export const jobInput = document.querySelector(
  '.popup__input_profile_occupation'
);
export const avatar = document.querySelector('.profile__avatar');
export const profilePopup = document.querySelector('.popup_profile');
export const btnAddCard = document.querySelector('.profile__add-button');
export const name = document.querySelector('.profile__name');
export const occupation = document.querySelector('.profile__occupation');
export const formProfile = document.querySelector('.popup__form_type_profile');
export const userId = 'b59a6ec5aff25fa0294bfaf3';

//Попап с картинкой
export const imagePopupSelector = '.popup_img';
export const imagePopup = document.querySelector('.popup_img');
export const imageLink = document.querySelector('.popup__image');
export const imageName = document.querySelector('.popup__img-title');

//Попап удаления карточки
export const popupConfirmSelector = '.popup_delete';
export const confirmPopup = document.querySelector('.popup_delete');

//Попап аватара
export const popupAvatarSelector = '.popup_avatar';
export const avatarPopup = document.querySelector('.popup_avatar');
export const inputAvatarLink = document.querySelector(
  '.popup__input_avatar_link'
);
export const formAvatar = document.querySelector('.popup__form_type_avatar');
export const popupEditAvatarButton = document.querySelector(
  '.profile__edit-image'
);

export const closeButtons = document.querySelectorAll('.popup__btn-close');
export const container = '.grid-items';
export const templateCardSelector = '#card';

export const profileSelectors = {
  nameSelector: '.profile__name',
  infoSelector: '.profile__occupation',
  avatarSelector: '.profile__avatar',
};

export const initialCards = [
  {
    title: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    title: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    title: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    title: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    title: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    title: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
};
export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
    this._inputsList = Array.from(
      form.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _setButtonState(isActive) {
    if (isActive) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState(this._form.checkValidity());
      });
    });
  }

  cleanInputErrors() {
    this._inputsList.forEach((input) => {
      this._hideError(input);
    });

    this._setButtonState(this._form.checkValidity());
  }

  enableValidation() {
    this._setEventListeners(this._form);
    this._inputsList.forEach((input) => {
      this._hideError(input);
    });
    this._setButtonState(this._form.checkValidity());
  }
}

const profileForm = new FormValidator(validationConfig, formProfile);
const addForm = new FormValidator(validationConfig, formAdd);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
profileForm.enableValidation();
addForm.enableValidation();
avatarFormValidator.enableValidation();
