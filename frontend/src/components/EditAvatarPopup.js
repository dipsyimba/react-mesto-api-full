import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    inputRef.current.value = '';
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onClickSubmit={handleSubmit}
      children={
        <>
          <label className="popup__field">
            <input
              ref={inputRef}
              type="url"
              className="popup__input popup__input_avatar_link"
              id="link-avatar"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span
              className="popup__input-error popup__input-error_visible"
              id="link-avatar-error"
            />
          </label>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
