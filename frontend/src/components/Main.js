import React from 'react';
import Card from './Card';
import editAvatarButton from '../images/editAvatar.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
  } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-avatar">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <img
              src={editAvatarButton}
              alt="Изменить аватар"
              className="profile__edit-image"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__occupation">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="grid-items">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
