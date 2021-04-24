function ImagePopup(props) {
  return (
    <div
      className={
        props.isOpen ? 'popup popup_img popup_opened' : 'popup popup_img'
      }
    >
      <div className="popup__img-container">
        <button
          type="button"
          id="close-img"
          className="popup__btn-close"
          onClick={props.onClose}
        />
        <img src={props.link} className="popup__image" alt="Фото" />
        <p className="popup__img-title">{props.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
