import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChange(e) {
    e.target.name === 'name'
      ? setName(e.target.value)
      : setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onClickSubmit={handleSubmit}
      children={
        <>
          <label className="popup__field">
            <input
              value={name || ''}
              onChange={handleChange}
              type="text"
              className="popup__input popup__input_profile_name"
              id="name-input"
              name="name"
              placeholder="Имя"
              minLength={2}
              maxLength={40}
              required
            />
            <span className="popup__input-error" id="name-input-error" />
          </label>
          <label className="popup__field">
            <input
              value={description || ''}
              onChange={handleChange}
              type="text"
              className="popup__input popup__input_profile_occupation"
              id="occupation-input"
              name="occupation"
              placeholder="Вид деятельности"
              minLength={2}
              maxLength={200}
              required
            />
            <span className="popup__input-error" id="occupation-input-error" />
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
