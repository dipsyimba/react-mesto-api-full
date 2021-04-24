import trash from '../images/remove.svg';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { card, onCardClick, onCardLike, onCardDelete } = props;

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? 'grid-item__trash' : 'grid-item__trash grid-item__trash_hidden'
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `grid-item__like ${
    isLiked ? 'grid-item__like_active' : ''
  }`;

  function handleClick() { // клик по картинке
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handkeDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="grid-item">
      <img
        src={card.link}
        alt={card.name}
        className="grid-item__image"
        onClick={handleClick}
      />
      <div className="grid-item__info">
        <h3 className="grid-item__name">{card.name}</h3>
        <div className="grid-item__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="grid-item__count">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handkeDeleteClick}
      >
        <img src={trash} alt="Корзина" />
      </button>
    </li>
  );
}

export default Card;
