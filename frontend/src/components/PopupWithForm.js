function PopupWithForm(props) {
  const {
    name,
    isOpen,
    title,
    children,
    buttonText,
    onClose,
    onClickSubmit,
  } = props;
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup__form popup__form_type_${name}`}
          name="edit-profile"
        >
          {children}
          <button
            onClick={onClickSubmit}
            type="submit"
            className="popup__button popup__btn-save"
            name="submit"
            value="Сохранить"
          >
            {buttonText}
          </button>
          <button type="reset" className="popup__btn-close" onClick={onClose} />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
