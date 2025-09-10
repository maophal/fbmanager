
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";
import { FaHome, FaThList, FaTags, FaUserPlus, FaUserCircle, FaCog, FaFacebook } from 'react-icons/fa';

const MenuBar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Facebook Tool</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/"><FaHome /> {t('home')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/posts"><FaThList /> {t('posts')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/price"><FaTags /> {t('price')}</Link>
          </li>
          {!isAuthenticated && (
            <li className="nav-item">
              <Link className="nav-link" to="/signup"><FaUserPlus /> {t('signup')}</Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownLang" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <ReactCountryFlag
                countryCode={i18n.language === 'en' ? 'US' : 'KH'}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '0.5em',
                }}
              />
              {i18n.language.toUpperCase()}
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownLang">
              <button className="dropdown-item" onClick={() => changeLanguage('en')}>
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '0.5em',
                  }}
                />
                English
              </button>
              <button className="dropdown-item" onClick={() => changeLanguage('kh')}>
                <ReactCountryFlag
                  countryCode="KH"
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '0.5em',
                  }}
                />
                ភាសាខ្មែរ
              </button>
            </div>
          </li>
          {isAuthenticated && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle" /> John Doe
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#"><FaUserCircle /> {t('my_account')}</a>
                <Link className="dropdown-item" to="/facebook-account"><FaFacebook /> {t('facebook_account')}</Link>
                <Link className="dropdown-item" to="/settings"><FaCog /> {t('settings')}</Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
