import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  function handleChange(e) {
    e.target.name === 'title'
      ? setPlace(e.target.value)
      : setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: place,
      link: link,
    });

    setPlace('');
    setLink('');
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onClickSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={place}
          onChange={handleChange}
          type="text"
          className="popup__input popup__input_add_name"
          id="title-input"
          name="title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
        />
        <span className="popup__input-error" id="title-input-error" />
      </label>
      <label className="popup__field">
        <input
          value={link}
          onChange={handleChange}
          type="url"
          className="popup__input popup__input_add_link"
          id="link-input"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="popup__input-error popup__input-error_visible"
          id="link-input-error"
        />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
