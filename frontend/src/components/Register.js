import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email, password });
  }

  return (
    <section className="page__content">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Регистрация</h1>
        <input
          onChange={handleChangeEmail}
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
        />
        <input
          onChange={handleChangePassword}
          className="form__input"
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
        />
        <button className="form__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="form__link" type="button">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
