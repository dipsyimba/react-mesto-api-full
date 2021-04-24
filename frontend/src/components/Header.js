import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <div className="header__control">
            <p className="header__email">{props.email}</p>
            <button className="header__button" onClick={props.onSignOut}>
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Вход
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
