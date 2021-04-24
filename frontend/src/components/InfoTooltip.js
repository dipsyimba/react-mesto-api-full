import React from 'react';
import successImage from '../images/success.svg';
import failedImage from '../images/failed.svg';

function InfoTooltip(props) {
  const { isOpen, onClose, isRegistered } = props;
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_info">
        <img
          className="popup__status-image"
          src={isRegistered ? successImage : failedImage}
          alt=""
        />
        <h3 className="popup__info-text">
          {isRegistered
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
        <button type="reset" className="popup__btn-close" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
