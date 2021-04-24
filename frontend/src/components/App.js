import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import '../index.css';
import { useState } from 'react';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup.js';
import React, { useEffect } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
    isOpen: false,
  });
  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    auth.getContent()
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(res.email);
        history.push('/');
      })
      .catch(err => console.log(err));
  }, [history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({
      isOpen: false,
    });
  }

  function handleCardClick(card) {
    const { name, link } = card;
    setSelectedCard({
      name: name,
      link: link,
      isOpen: true,
    });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((updatedData) => {
        setCurrentUser(updatedData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data.avatar)
      .then((updatedAvatar) => {
        setCurrentUser(updatedAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push('/');
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, initialCards]) => {
          setCurrentUser(user);
          setCards(initialCards);
        }).catch((err) => {
              console.log(err);
          })
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegistered(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRegistered(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogout() {
    api.signOut()
      .then((res) => {
        setIsLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={email} onSignOut={handleLogout} />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
            />
          </Switch>
          <Footer />
          {/* Попап обновления аватара */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* Попап редактирования профиля */}
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          {/* Попап добавления карточки */}
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />
          {/* Попап подтвержения удаления карточки */}
          {/* <PopupWithForm
            title="Вы уверены?"
            name="delete"
            isOpen={false}
            onClose={closeAllPopups}
            children={}
          /> */}
          {/* Попап с картинкой */}
          <ImagePopup
            name={selectedCard.name}
            link={selectedCard.link}
            onClose={closeAllPopups}
            isOpen={selectedCard.isOpen}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
